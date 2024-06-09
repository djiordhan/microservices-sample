import { Request, Response } from 'express';
import { Secured } from '../decorators/auth';
import { Controller, Post } from '../decorators/route';
import { getQuotes } from '../services/quote.service';
import { BaseController } from './base.controller';

@Controller('/quotes')
export class QuotesController extends BaseController {

    @Post('/')
    @Secured()
    public async retrieveQuote(req: Request, res: Response) {
        try {
            const { quote } = req.body;
            const response = await getQuotes(quote);
            res.send({ response });
        } catch (error: any) {
            this.handleError(res, error);
        }
    }

}