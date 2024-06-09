
import { Express } from 'express';
import request from 'supertest';
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { OrdersController } from '../src/controllers/orders.controller';
import { setupApp } from './utils/appSetup.ts';
import { createTestOrder } from './utils/test-util.ts';

describe('Order Tracking API', () => {
    let app: Express;
    let noAuthApp: Express;
    let tracking_number = 'PPuqD0J0uLslM';

    beforeAll(() => {
        app = setupApp(true, OrdersController);
        noAuthApp = setupApp(false, OrdersController);
    });

    beforeEach(async () => {
        await createTestOrder(tracking_number);
    });

    afterEach(async () => {
    });

    it('should delete order and update state to cancelled', async () => {
        const response = await request(app)
            .delete(`/orders/${tracking_number}`)
            .send();

        expect(response.status).toBe(200);
        expect(response.body.response.tracking_number).toBe('PPuqD0J0uLslM');
        expect(response.body.response.state).toBe('cancelled');
        expect(response.body.response.processing_state).toBe('processing_cancelled');
        expect(response.body.response.parcel_attributes[0].qty).toBe(1);
        expect(response.body.response.parcel_attributes[0].length).toBeTruthy();
        expect(response.body.response.parcel_attributes[0].width).toBeTruthy();
        expect(response.body.response.parcel_attributes[0].depth).toBeTruthy();
        expect(response.body.response.parcel_attributes[0].weight).toBeTruthy();
    });

    it('should return 400 for invalid tracking number', async () => {
        const response = await request(app)
            .delete('/orders/INVALIDTRACK123')
            .send();

        expect(response.status).toBe(400);
        expect(response.body.error_description).toBe('The data given to this server does not meet our criteria.');
    });

    it('should return 403 for unauthenticated requests', async () => {
        const response = await request(noAuthApp)
            .delete(`/orders/${tracking_number}`)
            .send();

        expect(response.status).toBe(403);
        expect(response.body.error).toBe('invalid_merchant_account');
        expect(response.body.error_description).toBe('User is not authenticated');
    });
});
