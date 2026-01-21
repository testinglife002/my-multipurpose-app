// 📄 src/sales/components/SalesTabs.jsx
import { NavLink } from "react-router-dom";
import "./SalesTabs.css";

export default function SalesTabs() {
  return (
    <div className="sales-tabs">
      <NavLink to="/sales/sales-dashboard">Dashboard</NavLink>
      <NavLink to="/sales/ml-analytics">ML Analytics</NavLink>
    </div>
  );
}
