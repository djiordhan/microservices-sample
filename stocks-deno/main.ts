import express from "npm:express@4.18.2";
import { stocks } from "./data/stocks.ts";

const app = express();
const PORT = 8000;

// Define the /stocks route
app.get("/stocks", (req: any, res: any) => {
    res.json(stocks);
});

// Define the /stocks/:id route
app.get("/stocks/:id", (req: any, res: any) => {
    const id = parseInt(req.params.id);
    const stock = stocks.find((stock: any) => stock.productId === id);
    if (stock) {
        res.json(stock);
    } else {
        res.status(404).json({ message: "Stock not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});