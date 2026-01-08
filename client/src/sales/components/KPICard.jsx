// 📄 src/sales/components/KPICard.jsx

export default function KPICard({ title, value }) {
  return (
    <div style={{
      padding: 16,
      borderRadius: 8,
      background: "#fff",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}>
      <h4>{title}</h4>
      <strong style={{ fontSize: 24 }}>{value}</strong>
    </div>
  );
}
