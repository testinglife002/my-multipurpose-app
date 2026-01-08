// src/sales/components/charts/RevenueChart.jsx

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function RevenueChart({ data }) {
  return (
    <div style={{ height: 300 }}>
      <h4>Revenue Trend</h4>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#4f46e5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
