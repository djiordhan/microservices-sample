import { Request, Response } from 'express';
import { Secured } from '../decorators/auth.ts';
import { Controller, Get, Post } from '../decorators/route.ts';
import { cancelOrder, createOrder, trackOrder } from '../services/order.service.ts';
import { BaseController } from './base.controller.ts';

@Controller('/orders')
export class OrdersController extends BaseController {

    @Post('/')
    @Secured()
    public async createOder(req: Request, res: Response) {
        try {
            const { order } = req.body;
            const response = await createOrder(order);
            res.send(response);
        } catch (error: any) {
            this.handleError(res, error);
        }
    }

    @Post('/:tracking_number')
    @Secured()
    public async deleteOrder(req: Request, res: Response) {
        try {
            const tracking_number = req.params?.tracking_number;
            const response = await cancelOrder(tracking_number);
            res.send(response);
        } catch (error: any) {
            this.handleError(res, error);
        }
    }

    @Get('/:tracking_number/tracking')
    @Secured()
    public async trackOrder(req: Request, res: Response) {
        try {
            const tracking_number = req.params?.tracking_number;
            const response = await trackOrder(tracking_number);
            res.send(response);
        } catch (error: any) {
            this.handleError(res, error);
        }
    }

}