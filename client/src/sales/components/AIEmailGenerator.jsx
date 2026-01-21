// 📄 AIEmailGenerator.jsx
import { useState } from "react";
import newRequest from "../../api/newRequest";

export default function AIEmailGenerator() {
  const [context, setContext] = useState("");
  const [email, setEmail] = useState("");

  const generateEmail = async () => {
    const res = await newRequest.post("/ai/generate-email", { context });
    setEmail(res.data.email);
  };

  return (
    <div>
      <h3>AI Email Generator</h3>

      <textarea
        placeholder="Describe situation..."
        value={context}
        onChange={(e) => setContext(e.target.value)}
      />

      <button onClick={generateEmail}>Generate Email</button>

      {email && (
        <textarea value={email} rows={8} readOnly />
      )}
    </div>
  );
}
