// 📄 src/sales/ml/ConfidenceIndicator.jsx

export default function ConfidenceIndicator({ confidence }) {
  const pct = Math.round(confidence * 100);

  return (
    <div style={{ marginTop: 16 }}>
      <strong>Prediction Confidence</strong>
      <div style={{
        height: 10,
        background: "#e5e7eb",
        borderRadius: 5,
        overflow: "hidden",
        marginTop: 4,
      }}>
        <div
          style={{
            width: `${pct}%`,
            background: pct > 70 ? "#22c55e" : "#f59e0b",
            height: "100%",
          }}
        />
      </div>
      <small>{pct}% confidence</small>
    </div>
  );
}