// src/sales/components/charts/ConversionChart.jsx

import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

export default function ConversionChart({ data }) {
  return (
    <div style={{ height: 300 }}>
      <h4>Invoice Conversion</h4>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            fill="#22c55e"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
