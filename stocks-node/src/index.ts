import bodyParser from 'body-parser';
import express from 'express';
import { registerWithEureka } from './discovery/eureka';
import stockRoutes from './routes/stockRoutes';

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/stocks', stockRoutes);

app.listen(port, () => {
  registerWithEureka(+port);
  console.log(`Server is running at http://localhost:${port}`);
});