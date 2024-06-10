import { Express } from 'express';
import request from 'supertest';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { BookController } from '../src/controllers/book.controller';
import { setupApp } from './utils/appSetup';
import { createTestOrder } from './utils/test-util';

describe('Book API', () => {
    let app: Express;
    let noAuthApp: Express;

    beforeAll(() => {
        app = setupApp(true, BookController);
        noAuthApp = setupApp(false, BookController);
    });

    beforeEach(async () => {
        await createTestOrder('test_tracking_num');
    });

    it('should retrieve book', async () => {
        const response = await request(app)
            .post('/book')
            .send({
                "orders": [
                    "test_tracking_num"
                ]
            });

        expect(response.status).toBe(200);
        expect(response.body.response).toBeDefined();
        expect(response.body.response.length).toBeGreaterThan(0);
    });

    it('should return 400 for invalid request body', async () => {
        const response = await request(app)
            .post('/book')
            .send(undefined);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('bad_request');
        expect(response.body.error_description).toBe('The data given to this server does not meet our criteria.');
    });

    it('should return 403 for unauthenticated requests', async () => {
        const response = await request(noAuthApp)
            .post('/book')
            .send({ someKey: 'someValue' });
        expect(response.status).toBe(403);
        expect(response.body.error).toBe('invalid_merchant_account');
        expect(response.body.error_description).toBe('User is not authenticated');
    });
});
