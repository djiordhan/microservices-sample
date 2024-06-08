import { Request, Response } from 'express';
import { Controller, Get } from '../decorators/route';

@Controller('/product')
export class ProductController {

    @Get('/:id')
    getProduct(req: Request, res: Response) {
        const productId = req.params.id;
        // Fetch product by id logic
        res.send(`Product ID: ${productId}`);
    }

}