import { Express } from 'express';
import request from 'supertest';
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { OrdersController } from '../src/controllers/orders.controller';
import { setupApp } from './utils/appSetup.ts';
import { createTestOrder } from './utils/test-util.ts';

describe('Order Tracking API', () => {
    let app: Express;
    let noAuthApp: Express;

    beforeAll(() => {
        app = setupApp(true, OrdersController);
        noAuthApp = setupApp(false, OrdersController);
    });

    beforeEach(async () => {
        await createTestOrder('TESTTRACK123');
    });

    afterEach(async () => { });

    it('should retrieve order tracking information', async () => {
        const response = await request(app)
            .get('/orders/TESTTRACK123/tracking')
            .send();

        expect(response.status).toBe(200);
        expect(response.body.tracking_number).toBe('TESTTRACK123');
        expect(response.body.success).toBe(true);
        expect(response.body.track).toHaveLength(1);
        expect(response.body.track[0].status).toBe('Completed');
    });

    it('should return 400 for invalid tracking number', async () => {
        const response = await request(app)
            .get('/orders/INVALIDTRACK123/tracking')
            .send();

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('bad_request');
        expect(response.body.error_description).toBe('The data given to this server does not meet our criteria.');
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
