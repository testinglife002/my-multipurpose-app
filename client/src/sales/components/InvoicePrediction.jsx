// 📄 src/sales/components/InvoicePrediction.jsx

import { useState } from "react";
import newRequest from "../../api/newRequest";


export default function InvoicePrediction() {
  const [invoiceId, setInvoiceId] = useState("");
  const [result, setResult] = useState(null);

  const predict = async () => {
    try {
      const res = await newRequest.get(`/sales/predict/${invoiceId}`);
      setResult(res.data);
    } catch (err) {
      alert("Prediction failed");
    }
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h3>Invoice Sales Prediction</h3>

      <input
        placeholder="Invoice ID"
        value={invoiceId}
        onChange={(e) => setInvoiceId(e.target.value)}
        style={{ padding: 8, width: 300 }}
      />

      <button onClick={predict} style={{ marginLeft: 10 }}>
        Predict
      </button>

      {result && (
        <div style={{ marginTop: 16 }}>
          <p>Probability: {result.probability}%</p>
          <p>Expected Revenue: ৳ {result.expectedRevenue}</p>
        </div>
      )}
    </div>
  );
}
