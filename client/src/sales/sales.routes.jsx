// 📄 src/sales/sales.routes.jsx

import { Routes, Route } from "react-router-dom";
import SalesDashboard from "./pages/SalesDashboard";
import SalesMLAnalytics from "./pages/SalesMLAnalytics";

export default function SalesRoutes() {
  return (
    <Routes>
      <Route path="/sales-dashboard" element={<SalesDashboard />} />
      
      <Route path="/ml-analytics" element={<SalesMLAnalytics />} />

    </Routes>
  );
}
