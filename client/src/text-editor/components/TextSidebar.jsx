// 📄 src/components/text-editor/TextToolbar.jsx
// 🧩 src/components/text-editor/TextSidebar.jsx
import React, { useMemo, useState } from "react";
import { FiChevronRight } from "react-icons/fi";

import EffectPreview from "./EffectPreview";
import PalettePicker from "./PalettePicker";
import "./TextSidebar.css";
import PRESETS from "./PRESETS.js";

export default function TextSidebar({
  templates = [],
  onSelect,
  onPresetSelect,
  onPresetHover,
  layers = [],
  selectedLayer,
  selectedLayerId,
  onDeleteTemplate,
}) {
  const [openTemplates, setOpenTemplates] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const firstLine = useMemo(() => {
    if (!selectedLayer || typeof selectedLayer.text !== "string") return "";
    return selectedLayer.text.split("\n")[0] || "";
  }, [selectedLayer]);

  const handleTemplateClick = (t) => {
    onSelect?.(t);
    // close the expanded list so user sees the canvas update
    setOpenTemplates(false);
    setModalOpen(false);
  };

  return (
    <aside className="text-sidebar">
      <div className="text-sidebar-scroll">
      <div className="sidebar-top">
        <h3 className="sidebar-title">Text Effects</h3>
        <div className="live-preview">
          <div className="live-preview-label">Selected (live)</div>
          <div
            className="live-preview-box"
            style={{
              fontFamily: selectedLayer?.fontFamily || "inherit",
              fontWeight: selectedLayer?.fontWeight || 400,
              fontSize: Math.min(selectedLayer?.fontSize || 36, 28),
            }}
            title={firstLine}
          >
            {firstLine || <em className="muted">No text on selected layer</em>}
          </div>
        </div>
      </div>

      <div className="preset-list">
        {PRESETS.map((preset) => (
          <EffectPreview
            key={preset.id}
            preset={preset}
            onApply={() => onPresetSelect && onPresetSelect(preset.id, preset.palette)}
            onHover={() => onPresetHover && onPresetHover(preset.id)}
            onLeave={() => onPresetHover && onPresetHover(null)}
          />
        ))}
      </div>

      <hr className="sidebar-divider" />

      <div className="text-sidebar-saved">
        <div className="saved-header">
          <h4>Saved Templates</h4>
          <button className="btn small" onClick={() => setOpenTemplates((v) => !v)}>
            <FiChevronRight className={openTemplates ? "rotated" : ""} />
          </button>
          <button className="btn small" onClick={() => setModalOpen(true)}>
            Manage Templates
          </button>
        </div>

        {openTemplates && (
          <div className="templates-list">
            {templates.length === 0 && <div className="muted">No templates</div>}
            {templates.map((t) => (
              <div key={t._id} className="template-item">
                <div className="template-title" onClick={() => handleTemplateClick(t)}>
                  {t.name}
                </div>
                <div className="template-meta">{t.layers?.length ?? ""} layers</div>
                <button
                  className="btn small delete"
                  onClick={() => {
                    onDeleteTemplate?.(t._id);
                    // keep UI state consistent
                    if (openTemplates && templates.length <= 1) setOpenTemplates(false);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {modalOpen && (
          <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Templates</h3>
              {templates.length === 0 && <div className="muted">No templates</div>}
              {templates.map((t) => (
                <div key={t._id} className="template-item">
                  <span
                    onClick={() => handleTemplateClick(t)}
                    style={{ cursor: "pointer" }}
                  >
                    {t.name}
                  </span>
                  <button className="btn tiny" onClick={() => onDeleteTemplate?.(t._id)}>
                    Delete
                  </button>
                </div>
              ))}
              <button className="btn" onClick={() => setModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <PalettePicker
        palette={selectedLayer?.palette || [selectedLayer?.color || "#fff"]}
        onChange={(newPalette) => {
          if (selectedLayer) {
            onPresetSelect?.(selectedLayer.effect, newPalette);
          }
        }}
      />
      </div>
    </aside>
  );
}




