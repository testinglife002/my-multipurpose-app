// src/sales/components/charts/CustomerChurnChart.jsx

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function CustomerChurnChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="churnProbability" />
      </BarChart>
    </ResponsiveContainer>
  );
}
