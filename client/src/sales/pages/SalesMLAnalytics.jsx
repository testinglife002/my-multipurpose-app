// 📄 src/sales/pages/SalesMLAnalytics.jsx

import useSalesPredictionHistory from "../hooks/useSalesPredictionHistory";
import PredictionTrendChart from "../ml/PredictionTrendChart";
import ConfidenceIndicator from "../ml/ConfidenceIndicator";

export default function SalesMLAnalytics() {
  const { history, loading } = useSalesPredictionHistory();

  if (loading) return <p>Loading ML analytics...</p>;

  // compute average confidence safely
  const avgConfidence =
    history.reduce((s, h) => s + (h.confidence || 0), 0) /
    (history.length || 1);

  return (
    <div style={{ padding: 24 }}>
      <h2>Sales ML Analytics</h2>

      <PredictionTrendChart data={history} />

      <ConfidenceIndicator confidence={avgConfidence || 0.65} />

      <p style={{ marginTop: 12, color: "#6b7280" }}>
        Predictions are currently rule-based and will improve as more data
        becomes available.
      </p>
    </div>
  );
}