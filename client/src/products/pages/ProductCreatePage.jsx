// 📄 src/products/pages/ProductCreatePage.jsx
import { useState } from "react";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

export default function ProductCreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    unit: "pcs"
  });

  const submit = async () => {
    await newRequest.post("/products", form);
    navigate("/products");
  };

  return (
    <div>
      <h2>Create Product</h2>

      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Description" onChange={e=>setForm({...form,description:e.target.value})}/>
      <input type="number" placeholder="Price" onChange={e=>setForm({...form,price:e.target.value})}/>
      <input placeholder="Unit" value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})}/>

      <button onClick={submit}>Save</button>
    </div>
  );
}
