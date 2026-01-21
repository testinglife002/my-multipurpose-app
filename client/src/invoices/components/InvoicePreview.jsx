//📄 InvoicePreview.jsx
import { PDFViewer } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";

export default function InvoicePreview({ invoice }) {
  return (
    <PDFViewer width="100%" height="600">
      <InvoicePDF invoice={invoice} />
    </PDFViewer>
  );
}
