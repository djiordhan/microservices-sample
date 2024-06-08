import { Request, Response } from 'express';
import { Secured } from '../decorators/auth';
import { Controller, Get, Post } from '../decorators/route';
import { BaseController } from './base.controller';
import { BadRequestError } from './errors/http.errors';

@Controller('/quotes')
export class QuotesController extends BaseController {

    @Post('/')
    @Secured()
    public async retrieveQuote(req: Request, res: Response) {
        try {
            const body = req.body;

            if (!body) {
                throw new BadRequestError('Dutiable amount must be greater than 0 for international orders');
            }

            const response = {};

            res.send(response);
        } catch (error: any) {
            this.handleError(res, error);
        }

    }

    @Get('/pricing')
    @Secured()
    public async retrievePricing(req: Request, res: Response) {
        try {
            const response = {};
            res.send(response);
        } catch (error: any) {
            this.handleError(res, error);
        }
    }

}