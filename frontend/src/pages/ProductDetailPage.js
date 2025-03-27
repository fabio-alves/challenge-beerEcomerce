import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts, fetchStockPrice } from "../api";
import styles from "./ProductDetailPage.module.css";

export default function ProductDetailPage() {
  //todo: improve css
  const { id } = useParams();
  //todo: use product with contextapi
  const [product, setProduct] = useState(null);
  const [selectedSku, setSelectedSku] = useState(null);
  const [stockPrice, setStockPrice] = useState(null);

  useEffect(() => {
    fetchProducts().then((data) => {
      const prod = data.find((p) => p.id === Number(id.split("-")[0]));
      setProduct(prod);
      setSelectedSku(prod?.skus[0]?.code);
    });
  }, [id]);

  useEffect(() => {
    if (!selectedSku) return;
    const fetchData = () => {
      fetchStockPrice(selectedSku)
        .then(setStockPrice)
        .catch(() => alert("Stock info unavailable"));
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [selectedSku]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className={styles.detail}>
      <img src={require(`../img${product.image}`)} alt={product.brand} />
      <h1>
        {product.brand}{" "}
        <span>${stockPrice ? (stockPrice.price / 100).toFixed(2) : "..."}</span>
      </h1>
      <p>
        <strong>Origin:</strong> {product.origin} | <strong>Stock:</strong>{" "}
        {stockPrice?.stock ?? "..."}
      </p>
      <h4>Description</h4>
      <p>
        {product.information.slice(0, 180)}... <a href="#">Read more</a>
      </p>

      <h4>Size</h4>
      <div className={styles.sizeBtns}>
        {product.skus.map((sku) => (
          <button
            key={sku.code}
            className={sku.code === selectedSku ? styles.active : ""}
            onClick={() => setSelectedSku(sku.code)}
          >
            {sku.name}
          </button>
        ))}
      </div>

      <button
        className={styles.cartBtn}
        onClick={() => alert(`Added to cart: SKU ${selectedSku}`)}
      >
        Add to cart
      </button>
    </div>
  );
}
