import { Express } from 'express';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';
import { QuotesController } from '../src/controllers/quotes.controller';
import { setupApp } from './utils/appSetup';

describe('Quotes API', () => {
    let app: Express;
    let noAuthApp: Express;

    beforeAll(() => {
        app = setupApp(true, QuotesController); // App with authentication
        noAuthApp = setupApp(false, QuotesController); // App without authentication
    });

    it('should retrieve a quote', async () => {
        const response = await request(app)
            .post('/quotes')
            .send({
                "quote": {
                    "dropoff_postcode": "2000",
                    "dropoff_state": "NSW",
                    "dropoff_suburb": "Sydney",
                    "parcel_attributes": [
                        {
                            "qty": 1,
                            "weight": 1
                        }
                    ]
                }
            });
        expect(response.status).toBe(200);
        expect(response.body.response).toBeDefined();
        expect(response.body.response.length).toBeGreaterThan(0);
    });

    it('should return 400 for invalid request body', async () => {
        const response = await request(app)
            .post('/quotes')
            .send(undefined);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('bad_request');
        expect(response.body.error_description).toBe('Dutiable amount must be greater than 0 for international orders');
    });

    it('should return 403 for unauthenticated requests', async () => {
        const response = await request(noAuthApp)
            .post('/quotes')
            .send({ someKey: 'someValue' });
        expect(response.status).toBe(403);
        expect(response.body.error).toBe('invalid_merchant_account');
        expect(response.body.error_description).toBe('User is not authenticated');
    });
});
