import { Request, Response } from 'express';
import { Controller, Post } from '../decorators/route';
import { BaseController } from './base.controller';
import { BadRequestError } from './errors/http.errors';

@Controller('/book')
export class OrdersController extends BaseController {

    @Post('/')
    public async bookOrder(req: Request, res: Response) {
        try {
            const body = req.body;

            if (!body) {
                throw new BadRequestError('The data given to this server does not meet our criteria.');
            }

            res.send({});
        } catch (error) {
            this.handleError(res, error);
        }

    }

}