// src/invoices/hooks/useCustomers.js
import { useEffect, useState } from "react";
import newRequest from "../../api/newRequest";


export default function useCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    newRequest.get("/customers").then((res) => {
      setCustomers(res.data);
    });
  }, []);

  return customers;
}
