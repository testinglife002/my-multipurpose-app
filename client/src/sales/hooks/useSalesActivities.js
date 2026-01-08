// src/sales/hooks/useSalesActivities.js

import { useEffect, useState } from "react";
import newRequest from "../../api/newRequest";


export default function useSalesActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await newRequest.get("/sales/activities");
        setActivities(res.data);
      } catch (err) {
        console.error("Failed to load sales activities", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return { activities, loading };
}
