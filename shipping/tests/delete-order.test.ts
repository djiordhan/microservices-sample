import { faker } from '@faker-js/faker';
import { Express } from 'express';
import request from 'supertest';
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import prisma from '../prisma/prismaClient.ts';
import { OrdersController } from '../src/controllers/orders.controller';
import { setupApp } from './appSetup';

describe('Order Tracking API', () => {
    let app: Express;
    let noAuthApp: Express;

    beforeAll(() => {
        app = setupApp(true, OrdersController);
        noAuthApp = setupApp(false, OrdersController);
    });

    beforeEach(async () => {
        await prisma.order.create({
            data: {
                courier_delivery_instructions: faker.lorem.sentence(),
                courier_job_id: 'TEST1234',
                delivery_address: '1 Union Street',
                delivery_postcode: '2009',
                delivery_state: 'NSW',
                delivery_suburb: 'Pyrmont',
                invoice_number: 'SO42637',
                price: 100.0,
                receiver_contact_number: '0404342342',
                receiver_language_code: 'EN',
                receiver_name: 'Francois',
                slug: 'ppuqd0j0ulslm',
                state: 'completed',
                tracking_number: 'PPuqD0J0uLslM',
                tracking_url: faker.internet.url(),
                tracking: {
                    create: {
                        tracking_number: 'PPuqD0J0uLslM',
                        tracking_url: faker.internet.url(),
                        success: true,
                        track: {
                            create: [
                                {
                                    status: 'Completed',
                                    date: new Date(),
                                    timestamp: faker.datatype.number({ min: 10000, max: 99999 }),
                                    status_owner: faker.company.name()
                                }
                            ]
                        }
                    }
                },
                user: {
                    create: {
                        email: 'test@shippit.com',
                        first_name: 'John',
                        last_name: 'Smith',
                    }
                },
                customs_documents_require_printing: false,
                documents: {},
                merchant: {
                    create: {
                        store_name: faker.company.name(),
                        company_name: faker.company.name(),
                        contact_name: faker.person.firstName(),
                        contact_phone: faker.phone.number(),
                        website_url: faker.internet.url(),
                        preparation_time: 5,
                        address_1: faker.address.streetAddress(),
                        suburb: faker.address.city(),
                        state: faker.address.stateAbbr(),
                        postcode: faker.address.zipCode(),
                        country_code: faker.address.countryCode()
                    }
                },
                courier: {
                    create: {
                        courier_type: faker.helpers.arrayElement([
                            'CouriersPlease',
                            'eParcelExpress',
                            'Priority',
                            'DoorDashOndemand'
                        ]),
                        quotes: {},
                        service_level: faker.helpers.arrayElement([
                            'standard',
                            'express',
                            'priority',
                            'on_demand'
                        ]),
                        success: faker.datatype.boolean()
                    }
                },
                parcels: {
                    create: [
                        {
                            depth: 0.03,
                            length: 0.325,
                            name: 'Parcel 1',
                            weight: 0.5,
                            width: 0.205,
                            label_number: 'LABEL12345',
                            courier_data: {},
                        }
                    ]
                }
            }
        });
    });

    afterEach(async () => {
    });

    it('should delete order and update state to cancelled', async () => {
        const response = await request(app)
            .post('/orders/PPuqD0J0uLslM')
            .send();

        expect(response.status).toBe(200);
        expect(response.body.response.tracking_number).toBe('PPuqD0J0uLslM');
        expect(response.body.response.state).toBe('cancelled');
        expect(response.body.response.processing_state).toBe('processing_cancelled');
        expect(response.body.response.delivery_address).toBe('1 Union Street');
        expect(response.body.response.delivery_suburb).toBe('Pyrmont');
        expect(response.body.response.delivery_postcode).toBe('2009');
        expect(response.body.response.receiver_name).toBe('Francois');
        expect(response.body.response.receiver_contact_number).toBe('0404342342');
        expect(response.body.response.courier_name).toBeTruthy(); // Assuming you have a relation with courier
        expect(response.body.response.slug).toBe('ppuqd0j0ulslm');
        expect(response.body.response.price).toBe('0.0');
        expect(response.body.response.retailer_invoice).toBe('SO42637');
        expect(response.body.response.courier_job_id).toBeTruthy();
        expect(response.body.response.user_attributes.email).toBe('test@shippit.com');
        expect(response.body.response.user_attributes.first_name).toBe('John');
        expect(response.body.response.user_attributes.last_name).toBe('Smith');
        expect(response.body.response.parcel_attributes).toHaveLength(1);
        expect(response.body.response.parcel_attributes[0].qty).toBe(1);
        expect(response.body.response.parcel_attributes[0].length).toBeTruthy();
        expect(response.body.response.parcel_attributes[0].width).toBeTruthy();
        expect(response.body.response.parcel_attributes[0].depth).toBeTruthy();
        expect(response.body.response.parcel_attributes[0].weight).toBeTruthy();
    });

    it('should return 400 for invalid tracking number', async () => {
        const response = await request(app)
            .post('/orders/INVALIDTRACK123')
            .send();

        expect(response.status).toBe(400);
        expect(response.body.error_description).toBe('The data given to this server does not meet our criteria.');
    });

    it('should return 403 for unauthenticated requests', async () => {
        const response = await request(noAuthApp)
            .post('/orders/PPuqD0J0uLslM')
            .send();

        expect(response.status).toBe(403);
        expect(response.body.error).toBe('invalid_merchant_account');
        expect(response.body.error_description).toBe('User is not authenticated');
    });
});
