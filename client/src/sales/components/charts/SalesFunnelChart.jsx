// src/sales/components/charts/SalesFunnelChart.jsx

import {
  FunnelChart, Funnel, Tooltip, ResponsiveContainer
} from "recharts";

export default function SalesFunnelChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <FunnelChart>
        <Tooltip />
        <Funnel dataKey="value" data={data} />
      </FunnelChart>
    </ResponsiveContainer>
  );
}
