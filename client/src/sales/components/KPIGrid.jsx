// 📄 src/sales/components/KPIGrid.jsx

import KPICard from "./KPICard";

export default function KPIGrid({ dashboard }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: 16
    }}>
      <KPICard title="Revenue" value={`৳ ${dashboard.totalRevenue}`} />
      <KPICard title="Invoices Sent" value={dashboard.invoicesSent} />
      <KPICard title="Invoices Paid" value={dashboard.invoicesPaid} />
      <KPICard title="Conversion %" value={`${dashboard.conversionRate}%`} />
      <KPICard title="Target %" value={`${dashboard.targetAchieved || 0}%`} />
    </div>
  );
}
