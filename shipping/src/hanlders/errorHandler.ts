import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../controllers/errors/http.errors';

export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) {
        res.status(err.status).send({ error: err.message });
    } else {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
