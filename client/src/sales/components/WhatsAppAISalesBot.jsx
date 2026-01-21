// 📄 WhatsAppAISalesBot.jsx
import { useState } from "react";
import newRequest from "../../api/newRequest";
// import newRequest from "../../api/newRequest";

export default function WhatsAppAISalesBot() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const generateReply = async () => {
    const res = await newRequest.post("/ai/whatsapp-reply", { message });
    setReply(res.data.reply);
  };

  return (
    <div>
      <h3>WhatsApp AI Sales Bot</h3>

      <textarea
        placeholder="Paste customer message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={generateReply}>Generate Reply</button>

      {reply && (
        <div>
          <h4>AI Suggested Reply</h4>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}
