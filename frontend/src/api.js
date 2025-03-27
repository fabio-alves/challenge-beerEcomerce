const API_BASE = "http://localhost:5002/api";

export const fetchProducts = async () => {
  const res = await fetch(`${API_BASE}/products`);
  return res.json();
};

export const fetchStockPrice = async (sku) => {
  const res = await fetch(`${API_BASE}/stock-price/${sku}`);
  if (!res.ok) throw new Error("SKU not found");
  return res.json();
};
