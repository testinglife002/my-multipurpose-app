// src/pages/textapp/components/BgControls.jsx
// src/pages/textapp/components/BgControls.jsx
// 📄 src/components/text-editor/BgControls.jsx
// 📄 src/components/text-editor/BgControls.jsx
import React from "react";
import "./BgControls.css";

export default function BgControls({
  bg,
  selectedLayer,
  onUploadBg,
  onUpdateBg,
  onUpdateLayer,
  showOverlay,
  setShowOverlay,
  overlayScale,
  setOverlayScale,
}) {
  return (
    <div className="bg-controls">
      <h4>Canvas Background</h4>

      {/* BACKGROUND IMAGE */}
      <label>
        Upload Image
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUploadBg(file);
          }}
        />
      </label>

      {bg && (
        <>
          <label>
            Opacity
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={bg.opacity ?? 1}
              onChange={(e) =>
                onUpdateBg({ opacity: Number(e.target.value) })
              }
            />
          </label>

          <label>
            Blur
            <input
              type="range"
              min="0"
              max="30"
              value={bg.blur ?? 0}
              onChange={(e) =>
                onUpdateBg({ blur: Number(e.target.value) })
              }
            />
          </label>
        </>
      )}

      <hr />

      {/* OVERLAY */}
      <label className="checkbox">
        <input
          type="checkbox"
          checked={showOverlay}
          onChange={() => setShowOverlay(v => !v)}
        />
        Show Overlay
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

      <hr />

      {/* TEXT BACKGROUND (TEXT LAYER ONLY) */}
      {selectedLayer?.type === "text" && (
        <>
          <h4>Text Background</h4>

          <label className="checkbox">
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
        </>
      )}
    </div>
  );
}






/*
import React, { useState, useEffect } from "react";
// import "./BgControls.css";

// import "./BgControls.css";

export default function BgControls({
  bg,
  onUpload,
  onChange,
  showOverlay,
  setShowOverlay,
  overlayScale,
  setOverlayScale,
  textBgScale,
  setTextBgScale,
  showTextBg,
  setShowTextBg,
}) {
  return (
    <div className="bg-controls">
      <h3>Background</h3>

      <label>
        Upload Image
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(file);
          }}
        />
      </label>

      <label>
        Blur
        <input
          type="range"
          min={0}
          max={30}
          value={bg.blur}
          onChange={(e) =>
            onChange({ blur: Number(e.target.value) })
          }
        />
      </label>

      <label>
        Opacity
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={bg.opacity}
          onChange={(e) =>
            onChange({ opacity: Number(e.target.value) })
          }
        />
      </label>

      <label>
        <input
          type="checkbox"
          checked={showOverlay}
          onChange={() => setShowOverlay((p) => !p)}
        />
        Show Overlay
      </label>
    </div>
  );
}
*/

