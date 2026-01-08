// src/invoices/components/InvoiceItemRow.jsx
export default function InvoiceItemRow({ item, products, onChange, onRemove }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
      <select
        value={item.productId || ""}
        onChange={(e) =>
          onChange({ ...item, productId: e.target.value, name: "" })
        }
      >
        <option value="">Custom</option>
        {products.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      {!item.productId && (
        <input
          placeholder="Item name"
          value={item.name}
          onChange={(e) => onChange({ ...item, name: e.target.value })}
        />
      )}

      <input
        type="number"
        placeholder="Qty"
        value={item.quantity}
        onChange={(e) =>
          onChange({ ...item, quantity: Number(e.target.value) })
        }
      />

      <input
        type="number"
        placeholder="Price"
        value={item.price}
        onChange={(e) =>
          onChange({ ...item, price: Number(e.target.value) })
        }
      />

      <button onClick={onRemove}>✕</button>
    </div>
  );
}
