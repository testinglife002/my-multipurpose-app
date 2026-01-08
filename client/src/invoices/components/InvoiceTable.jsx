// src/invoices/components/InvoiceTable.jsx
export default function InvoiceTable({ invoices }) {
  return (
    <table border="1" width="100%" cellPadding="8">
      <thead>
        <tr>
          <th>Invoice #</th>
          <th>Customer</th>
          <th>Total</th>
          <th>Status</th>
          <th>PDF</th>
        </tr>
      </thead>

      <tbody>
        {invoices.map((inv) => (
          <tr key={inv._id}>
            <td>{inv.invoiceNumber}</td>
            <td>{inv.customer?.name}</td>
            <td>৳ {inv.total}</td>
            <td>{inv.status}</td>
            <td>
              {inv.pdfUrl && (
                <a href={inv.pdfUrl} target="_blank">View</a>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

