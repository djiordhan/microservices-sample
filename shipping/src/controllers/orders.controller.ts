import { Request, Response } from 'express';
import { Secured } from '../decorators/auth';
import { Controller, Post } from '../decorators/route';
import { BadRequestError } from '../errors/http.errors';
import { BaseController } from './base.controller';

@Controller('/orders')
export class OrdersController extends BaseController {

    @Post('/')
    @Secured()
    public async createOder(req: Request, res: Response) {
        try {
            const body = req.body;

            if (!body) {
                throw new BadRequestError('The data given to this server does not meet our criteria.');
            }

            const response = {};

            res.send(response);
        } catch (error: any) {
            this.handleError(res, error);
        }
    }

    @Post('/:tracking_number')
    @Secured()
    public async deleteOrder(req: any, res: Response) {
        try {
            const tracking_number = req.param?.tracking_number;

            if (!tracking_number) {
                throw new BadRequestError('The data given to this server does not meet our criteria.');
            }

            const response = {};

            res.send(response);
        } catch (error: any) {
            this.handleError(res, error);
        }
    }

}