import bodyParser from 'body-parser';
import express, { Application } from 'express';
import { ProductController } from './controllers/orders.controller';
import { applyRoutes } from './decorators/route';

const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

const router = express.Router();
applyRoutes(router, ProductController);

app.use('/', router);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});