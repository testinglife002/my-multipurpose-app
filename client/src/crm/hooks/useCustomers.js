// src/crm/hooks/useCustomers.js
import { useEffect, useState } from "react";
import newRequest from "../../api/newRequest";


export default function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await newRequest.get("/customers");
        setCustomers(res.data);
      } catch (err) {
        console.error("Fetch customers failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return { customers, loading };
}
