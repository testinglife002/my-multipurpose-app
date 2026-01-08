// 📄 src/sales/hooks/useSalesDashboard.js

import { useEffect, useState } from "react";
import newRequest from "../../api/newRequest";

export default function useSalesDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await newRequest.get("/sales/dashboard");
        setData(res.data);
      } catch (err) {
        console.error("Sales dashboard error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { data, loading };
}
