// 📄 src/sales/ml/PredictionTrendChart.jsx

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PredictionTrendChart({ data }) {
  if (!data.length) {
    return <p>No historical prediction data available.</p>;
  }

  return (
    <div style={{ height: 350 }}>
      <h4>Revenue Prediction vs Actual</h4>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="actualRevenue"
            stroke="#22c55e"
            name="Actual"
          />
          <Line
            type="monotone"
            dataKey="predictedRevenue"
            stroke="#f59e0b"
            name="Predicted"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}