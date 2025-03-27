import express from "express";
import cors from "cors";
import products from "./products.js";
import stockPrice from "./stock-price.js";

const app = express();
const PORT = 5002;

app.use(cors());

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/stock-price/:sku", (req, res) => {
  const { sku } = req.params;
  const info = stockPrice[sku];
  if (!info) return res.status(404).json({ error: "SKU not found" });
  res.json(info);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
