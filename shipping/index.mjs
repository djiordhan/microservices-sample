import express from 'express';
import ordersRoute from './routes/orders.mjs';

const app = express();
const port = 3000;

app.use(express.json());
app.use(ordersRoute);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
