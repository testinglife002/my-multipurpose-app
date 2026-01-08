// 📄 src/crm/hooks/useLeads.js
import { useEffect, useState } from "react";
import newRequest from "../../api/newRequest";

export default function useLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await newRequest.get("/leads");
      setLeads(res.data);
    } catch (err) {
      console.error("Fetch leads failed", err);
    } finally {
      setLoading(false);
    }
  };

  const createLead = async (payload) => {
    await newRequest.post("/leads", payload);
    fetchLeads();
  };

  const convertLead = async (leadId) => {
    await newRequest.post(`/customers/convert/${leadId}`);
    fetchLeads();
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return { leads, loading, createLead, convertLead };
}

