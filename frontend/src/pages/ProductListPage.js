import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api";
import styles from "./ProductListPage.module.css";
import { Link } from "react-router-dom";

export default function ProductListPage() {
  //todo: improve css
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  //todo: getPrice

  return (
    <div className={styles.wrapper}>
      <h2>Our Products</h2>
      <div className={styles.grid}>
        {products.map((beer) => (
          <div key={beer.id} className={styles.card}>
            <div className={styles.titlecard}>{beer.brand}</div>
            <img src={require(`../img${beer.image}`)} alt={beer.brand} />
            <div className={styles.footerCard}>
              <div className={styles.priceCard}>$ </div>
              <Link
                to={`/product/${beer.id}-${beer.brand
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className={styles.btn}
              >
                +
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
