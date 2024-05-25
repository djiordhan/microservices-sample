import express from 'express';
import stockRoutes from './routes/stockRoutes';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/stocks', stockRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});