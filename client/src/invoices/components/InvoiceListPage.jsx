// src/invoices/pages/InvoiceListPage.jsx

import { useState } from "react";
import useInvoices from "../hooks/useInvoices";
import InvoicePdfModal from "../components/InvoicePdfModal";

export default function InvoiceListPage() {
  const { invoices, regeneratePdf } = useInvoices();
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <h2>Invoices</h2>

      {invoices.map(inv => (
        <div key={inv._id}>
          {inv.invoiceNumber} - {inv.total}
          <button onClick={() => setSelected(inv)}>Preview PDF</button>
        </div>
      ))}

      {selected && (
        <InvoicePdfModal
          invoice={selected}
          onClose={() => setSelected(null)}
          onRegenerate={regeneratePdf}
        />
      )}
    </div>
  );
}
