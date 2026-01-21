// src/sales/components

export default function AISalesRecommendations({ data }) {
  return (
    <div>
      <h3>AI Sales Recommendations</h3>

      <ul>
        {data.map((r, i) => (
          <li key={i}>
            <strong>{r.customer}</strong>: {r.recommendation}
          </li>
        ))}
      </ul>
    </div>
  );
}
