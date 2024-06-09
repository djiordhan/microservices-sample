
import { Express } from 'express';
import request from 'supertest';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { OrdersController } from '../src/controllers/orders.controller.ts';
import { setupApp } from './utils/appSetup.ts';
import { createTestOrder } from './utils/test-util.ts';

describe('Create Order API', () => {
    let app: Express;
    let noAuthApp: Express;
    let tracking_number = 'PPuqD0J0uLslM';

    const orderRequestData = {
        "order": {
            "user_attributes": {
                "email": "test@shippit.com",
                "first_name": "John",
                "last_name": "Smith"
            },
            "parcel_attributes": [
                {
                    "weight": 4.4
                },
                {
                    "weight": 8.8
                }
            ],
            "product_attributes": [
                {
                    "quantity": 10,
                    "title": "Super awesome red tshirt"
                },
                {
                    "quantity": 20,
                    "title": "Super awesome blue tshirt"
                }
            ],
            "authority_to_leave": "No",
            "courier_type": "standard",
            "delivery_address": "1 Union Street",
            "delivery_postcode": "2009",
            "delivery_state": "NSW",
            "delivery_suburb": "Pyrmont"
        }
    };

    beforeAll(() => {
        app = setupApp(true, OrdersController);
        noAuthApp = setupApp(false, OrdersController);
    });

    beforeEach(async () => {
        await createTestOrder(tracking_number);
    });

    it('should create order', async () => {
        const response = await request(app)
            .post(`/orders`)
            .send(orderRequestData);
        expect(response.status).toBe(200);
        expect(response.body.response.tracking_number).toBeDefined();
    });

    it('should return 400 for no user attributes', async () => {
        const response = await request(app)
            .post('/orders')
            .send({ order: { ...orderRequestData.order, user_attributes: null } });

        expect(response.status).toBe(400);
        expect(response.body.error_description).toBe('The data given to this server does not meet our criteria.');
    });

    it('should return 403 for unauthenticated requests', async () => {
        const response = await request(noAuthApp)
            .post(`/orders`)
            .send({});

        expect(response.status).toBe(403);
        expect(response.body.error).toBe('invalid_merchant_account');
        expect(response.body.error_description).toBe('User is not authenticated');
    });
});
