// 📄 src/sales/components/charts/SalesTargetChart.jsx

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function SalesTargetChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="actual" />
        <Bar dataKey="target" />
      </BarChart>
    </ResponsiveContainer>
  );
}
