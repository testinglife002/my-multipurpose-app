// src/crm/crm.routes.jsx
import { Routes, Route } from "react-router-dom";
import LeadsPage from "./pages/LeadsPage";
import CustomersPage from "./pages/CustomersPage";

export default function CRMRoutes() {
  return (
    <Routes>
      <Route path="/leads" element={<LeadsPage />} />
      <Route path="/customers" element={<CustomersPage />} />
    </Routes>
  );
}
