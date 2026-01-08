// 📄 src/sales/hooks/useSalesPredictionHistory.js

import { useEffect, useState } from "react";
import newRequest from "../../api/newRequest";

export default function useSalesPredictionHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await newRequest.get("/sales/predictions/history");
        setHistory(res.data.history || []);
      } catch (err) {
        // graceful fallback
        console.warn("Prediction history not available, fallback mode");
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return { history, loading };
}