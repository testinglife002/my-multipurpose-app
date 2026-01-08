// src/crm/components/LeadForm.jsx
import { useState } from "react";

export default function LeadForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    source: "manual",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", email: "", phone: "", source: "manual" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Add Lead</h3>

      <input
        placeholder="Name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <select
        value={form.source}
        onChange={(e) => setForm({ ...form, source: e.target.value })}
      >
        <option value="manual">Manual</option>
        <option value="whatsapp">WhatsApp</option>
        <option value="facebook">Facebook</option>
      </select>

      <button type="submit">Create Lead</button>
    </form>
  );
}
