import { Response } from 'express';
import { BadRequestError, ForbiddenError, InternalServerError } from './errors/http.errors';

export abstract class BaseController {
    protected sendError(res: Response, error: Error) {
        if (error instanceof BadRequestError) {
            res.status(400).send({ error: error.message });
        } else if (error instanceof ForbiddenError) {
            res.status(403).send({ error: error.message });
        } else if (error instanceof InternalServerError) {
            res.status(500).send({ error: error.message });
        } else {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    protected handleError(res: Response, error: Error) {
        this.sendError(res, error);
    }
}
