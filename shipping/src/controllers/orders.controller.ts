import { Request, Response } from 'express';
import { Secured } from '../decorators/auth.ts';
import { Controller, Delete, Get, Post } from '../decorators/route.ts';
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

    @Delete('/:tracking_number')
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

    @Get('/:tracking_number/label')
    @Secured()
    public async labelOrder(req: Request, res: Response) {
        try {
            const tracking_number = req.params?.tracking_number;
            const response =
            {
                "manifest": "SHP12345",
                "manifest_id": 123123,
                "courier": "eParcel",
                "manifest_pdf": "https://shippit.com/manifest20160721-96368-1tpowvr.pdf",
                "order_count": 1,
                "orders": [
                    tracking_number
                ],
                "success": true
            };
            res.send({ response });
        } catch (error: any) {
            this.handleError(res, error);
        }
    }

}