// 📄 src/invoices/hooks/useInvoices.js

import { useEffect, useState } from "react";
import newRequest from "../../api/newRequest";

export default function useInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    try {
      const res = await newRequest.get("/invoices");
      setInvoices(res.data);
    } catch (err) {
      console.error("Fetch invoices failed", err);
    } finally {
      setLoading(false);
    }
  };

  const createInvoice = async (payload) => {
    const res = await newRequest.post("/invoices", payload);
    await fetchInvoices();
    return res.data.invoice;
  };

  const regeneratePdf = async (invoiceId) => {
    try {
      await newRequest.post(`/invoices/${invoiceId}/generate-pdf`);
      await fetchInvoices();
    } catch (err) {
      console.error("PDF regeneration failed", err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return {
    invoices,
    loading,
    createInvoice,
    regeneratePdf,
    refresh: fetchInvoices,
  };
}
