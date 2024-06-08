import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { Secured } from '../decorators/auth.ts';
import { Controller, Get, Post } from '../decorators/route';
import { BadRequestError } from '../errors/http.errors';
import { BaseController } from './base.controller';
const prisma = new PrismaClient();

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

    @Get('/:tracking_number/tracking')
    @Secured()
    public async trackOrder(req: Request, res: Response) {
        try {
            const tracking_number = req.params?.tracking_number;

            if (!tracking_number) {
                throw new BadRequestError('The data given to this server does not meet our criteria.');
            }

            const order = await prisma.order.findFirst({
                where: { tracking_number },
                include: {
                    tracking: {
                        include: {
                            track: true,
                        },
                    },
                },
            });

            if (!order) {
                throw new BadRequestError('The data given to this server does not meet our criteria.');
            }

            const response = {
                tracking_number: order.tracking_number,
                tracking_url: order.tracking_url,
                success: order.tracking[0]?.success,
                track: order.tracking[0]?.track,
            };

            res.send(response);
        } catch (error: any) {
            this.handleError(res, error);
        }
    }

}