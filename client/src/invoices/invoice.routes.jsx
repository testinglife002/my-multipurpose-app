// src/invoices/invoice.routes.jsx
import { Routes, Route } from "react-router-dom";
import InvoiceListPage from "./pages/InvoiceListPage";
import InvoiceCreatePage from "./pages/InvoiceCreatePage";

export default function InvoiceRoutes() {
  return (
    <Routes>
      <Route path="/" element={<InvoiceListPage />} />
      <Route path="/create" element={<InvoiceCreatePage />} />
    </Routes>
  );
}