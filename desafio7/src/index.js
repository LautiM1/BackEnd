import express from"express";

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));

app.get("/", (req, res) =>{
    res.send("hello ts");
});

import productsRouter from "./routes/products.js";
app.use("/api/products", productsRouter);

import cartRouter from "./routes/cart.js";
app.use("/api/cart", cartRouter);