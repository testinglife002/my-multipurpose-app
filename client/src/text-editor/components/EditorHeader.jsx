// 📄 src/text-editor/components/EditorHeader.jsx
import React from "react";
import "./EditorHeader.css";

export default function EditorHeader({
  activeTab,
  setActiveTab,
  onAddText,
  onAddImage,
}) {
  return (
    <header className="editor-header">
      <div className="editor-header-left">
        <button className="eh-btn primary" onClick={onAddText}>
          + Text
        </button>

        <label className="eh-btn">
          + Image
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => {
              if (!e.target.files) return;
              Array.from(e.target.files).forEach(onAddImage);
            }}
          />
        </label>
      </div>

      <div className="editor-header-center">
        <button
          className={`eh-tab ${activeTab === "layers" ? "active" : ""}`}
          onClick={() => setActiveTab("layers")}
        >
          Layers
        </button>

        <button
          className={`eh-tab ${activeTab === "bg" ? "active" : ""}`}
          onClick={() => setActiveTab("bg")}
        >
          Background
        </button>
      </div>
    </header>
  );
}
