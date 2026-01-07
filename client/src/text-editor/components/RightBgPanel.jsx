// 📄 src/text-editor/components/RightBgPanel.jsx
import React from "react";
import "./RightBgPanel.css";

export default function RightBgPanel({
  backgroundLayer,
  selectedLayer,
  onUploadBackground,
  onUpdateBackground,
  onUpdateLayer,
  showOverlay,
  setShowOverlay,
  overlayScale,
  setOverlayScale,
}) {
  return (
    <div className="right-bg-panel">
      {/* ================= CANVAS BACKGROUND ================= */}
      <section className="panel-section">
        <h3>Canvas Background</h3>

        <label>
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onUploadBackground(file);
            }}
          />
        </label>

        <label>
          Opacity
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={backgroundLayer?.opacity ?? 1}
            onChange={(e) =>
              onUpdateBackground({ opacity: Number(e.target.value) })
            }
          />
        </label>

        <label>
          Blur
          <input
            type="range"
            min="0"
            max="30"
            value={backgroundLayer?.blur ?? 0}
            onChange={(e) =>
              onUpdateBackground({ blur: Number(e.target.value) })
            }
          />
        </label>

        <button
          className="reset-btn"
          onClick={() =>
            onUpdateBackground({ url: "", blur: 0, opacity: 1 })
          }
        >
          Reset Background
        </button>
      </section>

      {/* ================= OVERLAY ================= */}
      <section className="panel-section">
        <h3>Overlay</h3>

        <label className="row">
          <input
            type="checkbox"
            checked={showOverlay}
            onChange={() => setShowOverlay((v) => !v)}
          />
          Enable Overlay
        </label>

        {showOverlay && (
          <label>
            Overlay Strength
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.05"
              value={overlayScale}
              onChange={(e) =>
                setOverlayScale(Number(e.target.value))
              }
            />
          </label>
        )}
      </section>

      {/* ================= TEXT BACKGROUND ================= */}
      {selectedLayer?.type === "text" && (
        <section className="panel-section">
          <h3>Text Background</h3>

          <label className="row">
            <input
              type="checkbox"
              checked={selectedLayer.showTextBg ?? false}
              onChange={(e) =>
                onUpdateLayer(selectedLayer.id, {
                  showTextBg: e.target.checked,
                })
              }
            />
            Enable Text Background
          </label>

          {selectedLayer.showTextBg && (
            <>
              <label>
                Background Color
                <input
                  type="color"
                  value={selectedLayer.textBgColor || "#000000"}
                  onChange={(e) =>
                    onUpdateLayer(selectedLayer.id, {
                      textBgColor: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Background Scale
                <input
                  type="range"
                  min="0.8"
                  max="2"
                  step="0.05"
                  value={selectedLayer.textBgScale ?? 1}
                  onChange={(e) =>
                    onUpdateLayer(selectedLayer.id, {
                      textBgScale: Number(e.target.value),
                    })
                  }
                />
              </label>
            </>
          )}
        </section>
      )}
    </div>
  );
}
