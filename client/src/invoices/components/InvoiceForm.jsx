// src/invoices/components/InvoiceForm.jsx
import { useState } from "react";
import InvoiceItemRow from "./InvoiceItemRow";

export default function InvoiceForm({ customers, products, onSubmit }) {
  const [customerId, setCustomerId] = useState("");
  const [items, setItems] = useState([]);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);

  const addItem = () =>
    setItems([...items, { quantity: 1, price: 0 }]);

  const updateItem = (i, newItem) => {
    const updated = [...items];
    updated[i] = newItem;
    setItems(updated);
  };

  const removeItem = (i) =>
    setItems(items.filter((_, idx) => idx !== i));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ customerId, items, tax, discount });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Invoice</h3>

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

      <input
        type="number"
        placeholder="Tax"
        value={tax}
        onChange={(e) => setTax(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Discount"
        value={discount}
        onChange={(e) => setDiscount(Number(e.target.value))}
      />

      <button type="submit">Create Invoice</button>
    </form>
  );
}
