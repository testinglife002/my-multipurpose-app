// 📄 src/sales/pages/SalesDashboard.jsx

import useSalesDashboard from "../hooks/useSalesDashboard";
import KPIGrid from "../components/KPIGrid";
import InvoicePrediction from "../components/InvoicePrediction";
import ActivityTimeline from "../components/activity/ActivityTimeline";
import RevenueChart from "../components/charts/RevenueChart";
import ConversionChart from "../components/charts/ConversionChart";
import PredictionChart from "../components/charts/PredictionChart";
import ProductRevenueChart from "../components/ProductRevenueChart";
import SalesTargetChart from "../components/charts/SalesTargetChart";
import InvoiceAgingChart from "../components/charts/InvoiceAgingChart";
import CustomerLTVChart from "../components/charts/CustomerLTVChart";
import SalesRepLeaderboard from "../components/SalesRepLeaderboard";
import ProductProfitChart from "../components/charts/ProductProfitChart";
import SalesFunnelChart from "../components/charts/SalesFunnelChart";
import CustomerChurnChart from "../components/charts/CustomerChurnChart";
import AISalesRecommendations from "../components/AISalesRecommendations";
import AutomatedFollowUps from "../components/AutomatedFollowUps";
import SalesTabs from "../components/SalesTabs";
import LeadScoringChart from "../../crm/components/LeadScoringChart";
import WhatsAppAISalesBot from "../components/WhatsAppAISalesBot";
import AIEmailGenerator from "../components/AIEmailGenerator";

export default function SalesDashboard() {
  const { data, loading } = useSalesDashboard();

  // 🔐 Guards
  if (loading) return <p>Loading sales dashboard...</p>;
  if (!data) return <p>No sales data available</p>;

  // 📊 Chart mappings
  const revenueData = [
    { label: "Total Revenue", revenue: data.totalRevenue },
  ];

  const conversionData = [
    { label: "Paid", value: data.invoicesPaid },
    { label: "Pending", value: data.invoicesSent - data.invoicesPaid },
  ];

  const predictionData = [
    { label: "Actual", amount: data.totalRevenue },
    { label: "Target", amount: data.targetAmount },
  ];

  return (
    <div style={{ padding: 24 }}>

      <h2>Sales Dashboard</h2>
      <SalesTabs />

      {/* KPI SUMMARY */}
      <KPIGrid dashboard={data} />

      {/* ML Prediction Card */}
      <InvoicePrediction />

      {/* Timeline */}
      <ActivityTimeline />

      {/* Charts */}
      <RevenueChart data={revenueData} />

      <ConversionChart data={conversionData} />

      <PredictionChart data={predictionData} />

      {/* Product Revenue */}
      {data.productRevenue && (
        <>
          <h3>Product Revenue</h3>
          <ProductRevenueChart data={data.productRevenue} />
        </>
      )}

      {/* Sales Target */}
      <SalesTargetChart
        data={[
          {
            label: "This Month",
            actual: data.totalRevenue,
            target: data.targetAmount,
          },
        ]}
      />

      {/* Invoice Aging */}
      <InvoiceAgingChart data={data.invoiceAging} />

      {/* Customer Lifetime Value */}
      <CustomerLTVChart data={data.customerLifetimeValue} />

      {/* Sales Rep Leaderboard */}
      <SalesRepLeaderboard data={data.salesReps} />

      {/* Profit per Product */}
      <ProductProfitChart data={data.productProfit} />

      {/* Sales Funnel */}
      <SalesFunnelChart data={data.salesFunnel} />

      <CustomerChurnChart data={data.customerChurn} />

      <AISalesRecommendations data={data.aiRecommendations} />

      <AutomatedFollowUps data={data.followUps} />

      <LeadScoringChart data={data.leadScores} />
      <WhatsAppAISalesBot />
      <AIEmailGenerator />


    </div>
  );
}

