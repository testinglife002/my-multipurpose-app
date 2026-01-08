// src/invoices/pages/InvoiceListPage.jsx
import useInvoices from "../hooks/useInvoices";
import InvoiceTable from "../components/InvoiceTable";

export default function InvoiceListPage() {
  const { invoices, loading } = useInvoices();

  if (loading) return <p>Loading invoices...</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Invoices</h2>
      <InvoiceTable invoices={invoices} />
    </div>
  );
}
