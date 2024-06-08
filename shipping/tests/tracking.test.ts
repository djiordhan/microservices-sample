import { PrismaClient } from '@prisma/client';
import { Express } from 'express';
import request from 'supertest';
import { setupApp } from './appSetup';

const prisma = new PrismaClient();

describe('Order Tracking API', () => {
    let app: Express;
    let noAuthApp: Express;

    beforeAll(() => {
        app = setupApp(true); // App with authentication
        noAuthApp = setupApp(false); // App without authentication
    });

    beforeEach(async () => {
        // Seed the database with a test order and tracking data
        await prisma.order.create({
            data: {
                courier_delivery_instructions: 'Leave at front door',
                courier_job_id: 'TEST1234',
                delivery_address: '123 Test St',
                delivery_postcode: '12345',
                delivery_state: 'Test State',
                delivery_suburb: 'Test Suburb',
                invoice_number: 'INV1234',
                price: 100.0,
                receiver_contact_number: '1234567890',
                receiver_language_code: 'EN',
                receiver_name: 'John Doe',
                slug: 'test-order',
                state: 'completed',
                tracking_number: 'TESTTRACK123',
                tracking_url: 'http://example.com/track/TESTTRACK123',
                tracking: {
                    create: {
                        tracking_number: 'TESTTRACK123',
                        tracking_url: 'http://example.com/track/TESTTRACK123',
                        success: true,
                        track: {
                            create: [
                                {
                                    status: 'Completed',
                                    date: new Date(),
                                    timestamp: 1234567890,
                                    status_owner: 'Test Courier'
                                }
                            ]
                        }
                    }
                },
                user: {},
                customs_documents_require_printing: false,
                documents: {},
                merchant: {
                    create: {
                        store_name: 'Test Store',
                        company_name: 'Test Company',
                        contact_name: 'Jane Doe',
                        contact_phone: '0987654321',
                        website_url: 'http://teststore.com',
                        preparation_time: 5,
                        address_1: '456 Test Ave',
                        suburb: 'Test City',
                        state: 'TS',
                        postcode: '54321',
                        country_code: 'US'
                    }
                },
                courier: {
                    create: {
                        courier_type: 'TestCourier',
                        quotes: {},
                        service_level: 'standard',
                        success: true
                    }
                }
            }
        });
    });

    afterEach(async () => {
        // Clean up the database after each test
        await prisma.order.deleteMany();
        await prisma.tracking.deleteMany();
        await prisma.track.deleteMany();
        await prisma.merchant.deleteMany();
        await prisma.courier.deleteMany();
    });

    it('should retrieve order tracking information', async () => {
        const response = await request(app)
            .get('/orders/TESTTRACK123/tracking')
            .send();

        expect(response.status).toBe(200);
        expect(response.body.tracking_number).toBe('TESTTRACK123');
        expect(response.body.tracking_url).toBe('http://example.com/track/TESTTRACK123');
        expect(response.body.success).toBe(true);
        expect(response.body.track).toHaveLength(1);
        expect(response.body.track[0].status).toBe('Completed');
    });

    it('should return 400 for invalid tracking number', async () => {
        const response = await request(app)
            .get('/orders/INVALIDTRACK123/tracking')
            .send();

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('The data given to this server does not meet our criteria.');
    });

    it('should return 403 for unauthenticated requests', async () => {
        const response = await request(noAuthApp)
            .get('/orders/TESTTRACK123/tracking')
            .send();

        expect(response.status).toBe(403);
        expect(response.body.error).toBe('invalid_merchant_account');
        expect(response.body.error_description).toBe('User is not authenticated');
    });
});
