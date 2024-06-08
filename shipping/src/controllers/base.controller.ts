import { Response } from 'express';
import { BadRequestError, ForbiddenError, InternalServerError } from './errors/http.errors';

export abstract class BaseController {
    protected sendError(res: Response, error: Error) {
        if (error instanceof BadRequestError) {
            res.status(400).send({
                error: 'bad_request',
                error_description: error.message,
                success: false
            });
        } else if (error instanceof ForbiddenError) {
            res.status(403).send({
                error: 'invalid_merchant_account',
                error_description: 'An unknown error has occurred.'
            });
        } else if (error instanceof InternalServerError) {
            res.status(500).send({
                error: 'system',
                error_description: error.message
            });
        } else {
            res.status(500).send({
                error: 'system',
                error_description: 'An unknown error has occurred.'
            });
        }
    }

    protected handleError(res: Response, error: Error) {
        this.sendError(res, error);
    }
}
