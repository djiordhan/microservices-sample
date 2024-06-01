import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { stocks } from "./data/stocks.ts";

const router = new Router();

router.get("/stocks", (context: any) => {
    context.response.body = stocks;
});

router.get("/stocks/:id", (context: any) => {
    const id = context.params.id;
    const stock = stocks.find((stock: any) => stock.id === parseInt(id!));
    context.response.body = stock;
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is running on http://localhost:8000");

await app.listen({ port: 8000 });