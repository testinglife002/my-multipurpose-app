// src/invoices/pages/InvoiceCreatePage.jsx
import useInvoices from "../hooks/useInvoices";
import useCustomers from "../hooks/useCustomers";
import useProducts from "../hooks/useProducts";
import InvoiceForm from "../components/InvoiceForm";

export default function InvoiceCreatePage() {
  const { createInvoice } = useInvoices();
  const customers = useCustomers();
  const products = useProducts();

  const handleCreate = async (payload) => {
    await createInvoice(payload);
    alert("Invoice created");
  };

  return (
    <div style={{ padding: 24 }}>
      <InvoiceForm
        customers={customers}
        products={products}
        onSubmit={handleCreate}
      />
    </div>
  );
}
