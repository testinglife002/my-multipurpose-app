// 📄 src/invoices/components/InvoiceForm.jsx
import { useMemo, useState } from "react";
import InvoiceItemRow from "./InvoiceItemRow";

export default function InvoiceForm({
  customers,
  products,
  onSubmit,
  submitting = false,
}) {
  const [customerId, setCustomerId] = useState("");
  const [items, setItems] = useState([]);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);

  // ➕ Add empty row
  const addItem = () => {
    setItems([...items, { productId: "", quantity: 1 }]);
  };

  const updateItem = (index, newItem) => {
    const updated = [...items];
    updated[index] = newItem;
    setItems(updated);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // 📊 Auto subtotal calculation (preview only)
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const product = products.find(p => p._id === item.productId);
      if (!product) return sum;
      return sum + product.price * (item.quantity || 0);
    }, 0);
  }, [items, products]);

  const total = subtotal + Number(tax || 0) - Number(discount || 0);

  // ✅ Validation + submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerId) {
      return alert("Please select customer");
    }

    if (!items.length) {
      return alert("Add at least one item");
    }

    for (const item of items) {
      if (!item.productId || !item.quantity) {
        return alert("Each item must have product and quantity");
      }
    }

    onSubmit({
      customerId,
      items,
      tax: Number(tax),
      discount: Number(discount),
    });
  };

  return (
    <form onSubmit={handleSubmit}>

      <h3>Create Invoice</h3>

      {/* Customer */}
      <select
        required
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      >
        <option value="">Select customer</option>
        {customers.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <hr />

      {/* Items */}
      {items.map((item, i) => (
        <InvoiceItemRow
          key={i}
          item={item}
          products={products}
          onChange={(val) => updateItem(i, val)}
          onRemove={() => removeItem(i)}
        />
      ))}

      <button type="button" onClick={addItem}>
        + Add Item
      </button>

      <hr />

      {/* Tax / Discount */}
      <input
        type="number"
        placeholder="Tax"
        value={tax}
        onChange={(e) => setTax(e.target.value)}
      />

      <input
        type="number"
        placeholder="Discount"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
      />

      {/* Preview */}
      <div style={{ marginTop: 10 }}>
        <p>Subtotal: {subtotal}</p>
        <p>Total: {total}</p>
      </div>

      <button disabled={submitting} type="submit">
        {submitting ? "Saving..." : "Create Invoice"}
      </button>
    </form>
  );
}
