import { Request, Response } from 'express';
import { Secured } from '../decorators/auth.ts';
import { Controller, Post } from '../decorators/route.ts';
import { fetchBookings } from '../services/book.service.ts';
import { BaseController } from './base.controller.ts';

@Controller('/book')
export class BookController extends BaseController {

    @Post('/')
    @Secured()
    public async bookOders(req: Request, res: Response) {
        try {
            const { orders } = req.body;
            const response = await fetchBookings(orders);
            res.send({ response, count: response.length });
        } catch (error: any) {
            this.handleError(res, error);
        }
    }

}