import { NextFunction, Request, Response } from 'express';
import { ForbiddenError, HttpError } from './http.errors';

export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ForbiddenError) {
        res.status(403).send({
            error: 'invalid_merchant_account',
            error_description: 'User is not authenticated'
        });
    } else if (err instanceof HttpError) {
        res.status(err.status).send({ error: err.message });
    } else {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
