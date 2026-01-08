// src/sales/components/charts/PredictionChart.jsx

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function PredictionChart({ data }) {
  return (
    <div style={{ height: 300 }}>
      <h4>Predicted vs Actual Revenue</h4>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
