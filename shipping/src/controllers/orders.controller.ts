import { Request, Response } from 'express';
import prisma from '../../prisma/prismaClient.ts';
import { Secured } from '../decorators/auth.ts';
import { Controller, Get, Post } from '../decorators/route.ts';
import { BadRequestError } from '../errors/http.errors.ts';
import { BaseController } from './base.controller.ts';

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
    public async deleteOrder(req: Request, res: Response) {
        try {
            const tracking_number = req.params?.tracking_number;

            if (!tracking_number) {
                throw new BadRequestError('The data given to this server does not meet our criteria.');
            }

            const order = await prisma.order.findFirst({
                where: { tracking_number },
                include: {
                    parcels: true,
                    courier: true,
                    user: true
                },
            });

            if (!order) {
                throw new BadRequestError('The data given to this server does not meet our criteria.');
            }

            const updatedOrder = await prisma.order.update({
                where: { id: order.id },
                data: {
                    state: 'cancelled',
                    processing_state: 'processing_cancelled', // assuming you have this field
                    price: 0.0,
                },
                include: {
                    parcels: true,
                    courier: true,
                    user: true
                },
            });

            // console.log(updatedOrder);

            const response = {
                response: {
                    id: updatedOrder.id,
                    tracking_number: updatedOrder.tracking_number,
                    state: updatedOrder.state,
                    processing_state: updatedOrder.processing_state,
                    delivery_address: updatedOrder.delivery_address,
                    delivery_suburb: updatedOrder.delivery_suburb,
                    delivery_postcode: updatedOrder.delivery_postcode,
                    receiver_name: updatedOrder.receiver_name,
                    receiver_contact_number: updatedOrder.receiver_contact_number,
                    courier_name: order.courier?.courier_type,
                    slug: updatedOrder.slug,
                    price: updatedOrder.price.toFixed(1),
                    retailer_invoice: updatedOrder.invoice_number,
                    courier_job_id: updatedOrder.courier_job_id,
                    user_attributes: {
                        email: order.user?.email,
                        first_name: order.user?.first_name,
                        last_name: order.user?.last_name,
                    },
                    parcel_attributes: updatedOrder.parcels.map((parcel: any) => ({
                        qty: 1,
                        length: parcel.length,
                        width: parcel.width,
                        depth: parcel.depth,
                        weight: parcel.weight,
                    })),
                },
            };

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