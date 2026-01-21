// 📄 src/products/pages/ProductEditPage.jsx
import { useEffect, useState } from "react";
import newRequest from "../../utils/newRequest";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  useEffect(() => {
    newRequest.get("/products").then(res=>{
      const p = res.data.find(x=>x._id===id);
      setForm(p);
    });
  }, []);

  const update = async () => {
    await newRequest.put(`/products/${id}`, form);
    navigate("/products");
  };

  return (
    <div>
      <h2>Edit Product</h2>

      <input value={form.name||""} onChange={e=>setForm({...form,name:e.target.value})}/>
      <input value={form.description||""} onChange={e=>setForm({...form,description:e.target.value})}/>
      <input value={form.price||""} onChange={e=>setForm({...form,price:e.target.value})}/>
      <input value={form.unit||""} onChange={e=>setForm({...form,unit:e.target.value})}/>

      <button onClick={update}>Update</button>
    </div>
  );
}
