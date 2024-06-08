import { Request, Response } from 'express';
import { Secured } from '../decorators/auth';
import { Controller, Post } from '../decorators/route';
import { BadRequestError } from '../errors/http.errors';
import { isEmptyObject } from '../utils/objectUtil';
import { BaseController } from './base.controller';

@Controller('/quotes')
export class QuotesController extends BaseController {

    @Post('/')
    @Secured()
    public async retrieveQuote(req: Request, res: Response) {
        try {
            const body = req.body;
            if (!body || isEmptyObject(body)) {
                throw new BadRequestError('Dutiable amount must be greater than 0 for international orders');
            }

            const response = {};
            res.send(response);
        } catch (error: any) {
            this.handleError(res, error);
        }
    }

}