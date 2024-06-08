import express, { Express } from 'express';
import { applyRoutes } from '../src/decorators/route';
import { errorHandler } from '../src/errors/errorHandler';

export const setupApp = (auth: boolean = true, controller: any): Express => {
    const app = express();
    app.use(express.json());

    if (auth) {
        app.use((req, res, next) => {
            req.user = { id: '123', name: 'John Doe' };
            next();
        });
    }

    const router = express.Router();
    applyRoutes(router, controller);
    app.use('/', router);
    app.use(errorHandler);

    return app;
};
