// 📄 src/invoices/pages/InvoiceCreatePage.jsx

import { useState } from "react";
import useInvoices from "../hooks/useInvoices";
import useCustomers from "../hooks/useCustomers";
import useProducts from "../hooks/useProducts";
import InvoiceForm from "../components/InvoiceForm";

export default function InvoiceCreatePage() {
  const { createInvoice, loading } = useInvoices();
  const { customers, loading: customersLoading } = useCustomers();
  const { products, loading: productsLoading } = useProducts();

  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (payload) => {
    try {
      setSubmitting(true);
      await createInvoice(payload);
      alert("Invoice created successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to create invoice");
    } finally {
      setSubmitting(false);
    }
  };

  if (customersLoading || productsLoading) {
    return <div style={{ padding: 24 }}>Loading data...</div>;
  }

  if (!customers.length) {
    return <div style={{ padding: 24 }}>No customers found. Please create a customer first.</div>;
  }

  if (!products.length) {
    return <div style={{ padding: 24 }}>No products found. Please create a product first.</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Create Invoice</h2>

      <InvoiceForm
        customers={customers}
        products={products}
        submitting={submitting || loading}
        onSubmit={handleCreate}
      />
    </div>
  );
}
