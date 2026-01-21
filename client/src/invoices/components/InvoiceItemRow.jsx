// 📄 src/invoices/components/InvoiceItemRow.jsx
export default function InvoiceItemRow({
  item,
  products,
  onChange,
  onRemove,
}) {
  const product = products.find(p => p._id === item.productId);

  const price = product?.price || 0;
  const total = price * (item.quantity || 0);

  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>

      <select
        value={item.productId}
        onChange={(e) =>
          onChange({ ...item, productId: e.target.value })
        }
      >
        <option value="">Select product</option>
        {products.map(p => (
          <option key={p._id} value={p._id}>
            {p.name} ({p.price})
          </option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        value={item.quantity}
        onChange={(e) =>
          onChange({ ...item, quantity: Number(e.target.value) })
        }
      />

      <span>{total}</span>

      <button type="button" onClick={onRemove}>
        ❌
      </button>
    </div>
  );
}
