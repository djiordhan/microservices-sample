import bodyParser from 'body-parser';
import express, { Application } from 'express';
import { OrdersController } from './controllers/orders.controller';
import { QuotesController } from './controllers/quotes.controller';
import { applyRoutes } from './decorators/route';

const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

const router = express.Router();
applyRoutes(router, OrdersController);
applyRoutes(router, QuotesController);

app.use('/', router);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});