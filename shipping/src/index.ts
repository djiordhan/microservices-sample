import express, { Application } from 'express';
import { ProductController } from './controllers/OrdersController'; // Assuming product.controller.ts is in the controllers folder
import { applyRoutes } from './utils/Route';

const app: Application = express();
const port = 3000;

const router = express.Router();
applyRoutes(router, ProductController);

app.use('/', router);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});