// src/invoices/hooks/useProducts.js
import { useEffect, useState } from "react";
import newRequest from "../../api/newRequest";

export default function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    newRequest.get("/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return products;
}
