import { Router, Request, Response } from 'express';

const router = Router();

const stocks = [
    {
        productId: 1,
        stocks: 110,
        sold: 500,
    },
    {
        productId: 2,
        stocks: 50,
        sold: 100,
    },
    {
        productId: 3,
        stocks: 20,
        sold: 500,
    },
    {
        productId: 4,
        stocks: 30,
        sold: 400,
    },
    {
        productId: 5,
        stocks: 50,
        sold: 300,
    },
    {
        productId: 6,
        stocks: 70,
        sold: 200,
    },
    {
        productId: 7,
        stocks: 80,
        sold: 300,
    },
    {
        productId: 8,
        stocks: 50,
        sold: 600,
    },
    {
        productId: 9,
        stocks: 20,
        sold: 200,
    }
];

router.get('/', (req: Request, res: Response) => {
    res.json(stocks);
});


router.get('/:productId', (req: Request, res: Response) => {
  const { productId } = req.params;
  res.json(stocks.find(stock => stock.productId === +productId));
});

export default router;