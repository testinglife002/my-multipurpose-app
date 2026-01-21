// src/invoices/components/InvoicePdfModal.jsx

export default function InvoicePdfModal({ invoice, onClose, onRegenerate }) {
  if (!invoice) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">

        <h3>Invoice PDF Preview</h3>

        {invoice.pdfUrl ? (
          <iframe
            src={invoice.pdfUrl}
            width="100%"
            height="500px"
            title="Invoice PDF"
          />
        ) : (
          <p>No PDF generated yet</p>
        )}

        <div style={{ marginTop: 10 }}>
          <button onClick={() => onRegenerate(invoice._id)}>
            Regenerate PDF
          </button>

          <button onClick={onClose}>Close</button>
        </div>

      </div>
    </div>
  );
}
