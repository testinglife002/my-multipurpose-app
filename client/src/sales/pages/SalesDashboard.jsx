// 📄 src/sales/pages/SalesDashboard.jsx

import useSalesDashboard from "../hooks/useSalesDashboard";
import KPIGrid from "../components/KPIGrid";
import InvoicePrediction from "../components/InvoicePrediction";
import ActivityTimeline from "../components/activity/ActivityTimeline";
import RevenueChart from "../components/charts/RevenueChart";
import ConversionChart from "../components/charts/ConversionChart";
import PredictionChart from "../components/charts/PredictionChart";

export default function SalesDashboard() {
  const { data, loading } = useSalesDashboard();

  const revenueData = [
    { date: "This Month", revenue: data.totalRevenue },
  ];

  const conversionData = [
    { label: "Paid", value: data.invoicesPaid },
    { label: "Unpaid", value: data.invoicesSent - data.invoicesPaid },
  ];

  const predictionData = [
    { label: "Actual", amount: data.totalRevenue },
    { label: "Target", amount: data.targetAmount },
  ];


  if (loading) return <p>Loading sales dashboard...</p>;
  if (!data) return <p>No sales data</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Sales Dashboard</h2>

      <KPIGrid dashboard={data} />

      <InvoicePrediction />

      <ActivityTimeline />

      
      <RevenueChart data={revenueData} />
      <ConversionChart data={conversionData} />
      <PredictionChart data={predictionData} />
    </div>
  );
}
