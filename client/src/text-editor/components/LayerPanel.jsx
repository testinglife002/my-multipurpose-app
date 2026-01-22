  // src/components/LayerPanel.jsx
// src/components/LayerPanel.jsx
// 📄 src/components/text-editor/LayerPanel.jsx
import React from "react";
import "./LayerPanel.css";
import { useEffect } from "react";

export default function LayerPanel({
  layers,
  selectedLayer,
  onSelectLayer,
  onUpdateLayer,
}) {
  const sorted = [...layers].sort((a, b) => b.zIndex - a.zIndex);
  const layer = layers.find((l) => l.id === selectedLayer);

  const deleteLayer = (id) => {
    const target = layers.find((l) => l.id === id);
    if (!target) return;
    if (target.type === "background") return; // protect bg
    onUpdateLayer(id, "__delete__", true);
  };

  useEffect(() => {
    const el = document.querySelector(".layer-item.selected");
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selectedLayer]);


  return (
    <div className="layer-panel" style={{marginTop:'-15%'}} >
      
      {/* SECTION 01 : LAYER LIST */}
      <div className="layer-section layer-list-section">
      
      <div className="section-header">
        <h4>Layers</h4>
      </div>

      {/* LIST */}
      <div className="layer-items">
        {sorted.map((l) => (
          <div
            key={l.id}
            className={`layer-item ${selectedLayer === l.id ? "selected" : ""}`}
            onClick={() => onSelectLayer(l.id)}
          >
            <span>{l.type === "text" ? l.text : l.type}</span>

            <div className="layer-actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateLayer(l.id, "visible", !l.visible);
                }}
              >
                {l.visible ? "👁" : "🚫"}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateLayer(l.id, "locked", !l.locked);
                }}
              >
                {l.locked ? "🔒" : "🔓"}
              </button>

              {l.type !== "background" && (
                <button
                  title="Delete"
                  className="danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteLayer(l.id);
                  }}
                >
                  🗑
                </button>
              )}

            </div>

            <div className="layer-left">
              <div className="layer-title">
                {l.type === "background" ? "Background" : l.text || "Image"}
              </div>
              <div className="layer-sub">{l.type}</div>
            </div>

          </div>
        ))}
      </div>
      </div>

      {!layer ? null : (
        <div className="layer-properties">
           {/*<h5>Layer Controls</h5> */}

          <div className="inline-fields">
            <button onClick={() => onUpdateLayer(layer.id, "zIndex", layer.zIndex + 1)}>
              ▲ Front
            </button>
            <button onClick={() => onUpdateLayer(layer.id, "zIndex", layer.zIndex - 1)}>
              ▼ Back
            </button>
          </div>

          {layer.type === "text" && (
            <>
              <label>
                Show Text Background
                <input
                  type="checkbox"
                  checked={layer.showTextBg ?? false}
                  onChange={(e) =>
                    onUpdateLayer(layer.id, "showTextBg", e.target.checked)
                  }
                />
              </label>
            </>
          )}
        </div>
      )}

      {/* DIVIDER 
      <div className="layer-divider"></div>
      */}

      {/* SECTION 02 : CONTROLS + PROPERTIES */}
    <div className="layer-section layer-controls-section">
       {/*<div className="section-header">
        <h4>Layer Controls</h4>
      </div>*/}
    
      {/* PROPERTIES */}
       <div className="layer-controls-scroll">
      {!layer ? (
        <div className="no-layer">No layer selected</div>
      ) : (
        <div className="layer-properties">
          

          

          {/* OPACITY */}
          {"opacity" in layer && (
            <label>
              Opacity
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={layer.opacity ?? 1}
                onChange={(e) =>
                  onUpdateLayer(layer.id, "opacity", Number(e.target.value))
                }
              />
            </label>
          )}

          {/* BLUR */}
          {"blur" in layer && (
            <label>
              Blur
              <input
                type="range"
                min="0"
                max="30"
                value={layer.blur ?? 0}
                onChange={(e) =>
                  onUpdateLayer(layer.id, "blur", Number(e.target.value))
                }
              />
            </label>
          )}

          {/* TEXT PROPS */}
          {layer.type === "text" && (
            <>
              <label>
                Text
                <textarea
                  value={layer.text}
                  onChange={(e) =>
                    onUpdateLayer(layer.id, "text", e.target.value)
                  }
                />
              </label>

              <label>
                Font Size
                <input
                  type="number"
                  value={layer.fontSize}
                  onChange={(e) =>
                    onUpdateLayer(
                      layer.id,
                      "fontSize",
                      Number(e.target.value)
                    )
                  }
                />
              </label>

              <label>
                Color
                <input
                  type="color"
                  value={layer.color || "#ffffff"}
                  onChange={(e) =>
                    onUpdateLayer(layer.id, "color", e.target.value)
                  }
                />
              </label>

              <label>
                Show Text Background
                <input
                  type="checkbox"
                  checked={layer.showTextBg ?? false}
                  onChange={(e) =>
                    onUpdateLayer(layer.id, "showTextBg", e.target.checked)
                  }
                />
              </label>

              {layer.showTextBg && (
                <label>
                  Background Color
                  <input
                    type="color"
                    value={layer.textBgColor || "#000000"}
                    onChange={(e) =>
                      onUpdateLayer(layer.id, "textBgColor", e.target.value)
                    }
                  />
                </label>
              )}
            </>
          )}
        </div>
      )}

      {/* BLEND MODE (IMAGE ONLY) */}
        {layer && layer.type === "image" && (

            <label>
              Blend Mode
              <select
                value={layer.blendMode || "source-over"}
                onChange={(e) =>
                  onUpdateLayer(layer.id, "blendMode", e.target.value)
                }
              >
                <option value="source-over">Normal</option>
                <option value="multiply">Multiply</option>
                <option value="screen">Screen</option>
                <option value="overlay">Overlay</option>
                <option value="darken">Darken</option>
                <option value="lighten">Lighten</option>
              </select>
            </label>
          )}
      </div>
      </div>
    </div>
  );
}











/*
import React, { useState } from "react";
import { ArrowUp, ArrowDown, Layers, SlidersHorizontal } from "lucide-react";
 import "./LayerPanel.css";

export default function LayerPanel({
  layers = [],
  selectedLayer,
  onSelectLayer,
  onReorderLayers,
  onUpdateLayer,
  onBgUpload,
  showOverlay,      // <-- overlay state
  onToggleOverlay,  // <-- toggle handler
  showBgControls,
  setShowBgControls
}) {  
  const [draggingId, setDraggingId] = useState(null);
  const [collapsed, setCollapsed] = useState(false);


  const sorted = [...layers].sort((a, b) => b.zIndex - a.zIndex);

  const handleDragStart = (e, id) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (!draggingId) return;
    const from = sorted.findIndex((l) => l.id === draggingId);
    const to = sorted.findIndex((l) => l.id === targetId);
    if (from === -1 || to === -1) return;
    const arr = [...sorted];
    const [moved] = arr.splice(from, 1);
    arr.splice(to, 0, moved);
    arr.forEach((l, i) => (l.zIndex = arr.length - i));
    arr.forEach((l) => onUpdateLayer(l.id, "zIndex", l.zIndex));
    setDraggingId(null);
  };

  return (
    <>
     
      <div>
        <button
        className="toggle-btn"
        style={{marginRight:'5%'}}
        onClick={() => setCollapsed((c) => !c)}
        title={collapsed ? "Show Layers" : "Hide Layers"}
      >
        <Layers size={20} />
        {!collapsed && <span className="toggle-text">Layers</span>}
      </button>

  
        <button
            className={`toggle-btn ${showBgControls ? "active" : ""}`}
            onClick={() => setShowBgControls((p) => !p)}
            title="Toggle BG Controls"
            >
            <SlidersHorizontal size={18} />
        </button>

      </div>

   
      <div className="layer-panel">
        <div className="layer-panel-content">
          <h4>Layers</h4>

          <div className="layer-items">
            {sorted.map((layer) => (
              <div
                key={layer.id}
                className={`layer-item ${
                  selectedLayer === layer.id ? "selected" : ""
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, layer.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, layer.id)}
                onClick={() => onSelectLayer(layer.id)}
              >
                <div className="layer-thumb">
                  {layer.type === "background" && layer.url ? (
                    <img src={layer.url} alt="bg" className="thumb-img" />
                  ) : (
                    <div className="thumb-text">
                      {layer.text?.substring(0, 1) || "T"}
                    </div>
                  )}
                </div>
                <div className="layer-info">
                  <div className="layer-title">
                    {layer.type === "background"
                      ? "Background"
                      : layer.text || "Text"}
                  </div>
                  <div className="layer-sub">{layer.type}</div>
                </div>

                {layer.type === "text" && (
                  <div className="layer-controls">
                    <button
                      title="Move Up"
                      onClick={(e) => {
                        e.stopPropagation();
                        onReorderLayers(layer.id, "up");
                      }}
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      title="Move Down"
                      onClick={(e) => {
                        e.stopPropagation();
                        onReorderLayers(layer.id, "down");
                      }}
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>
                )}
                <label>
                Upload Background
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onBgUpload(file);
                    }}
                />
                </label>

              </div>
            ))}
          </div>

          <div className="layer-properties">
            <h5>Selected Layer</h5>
            {selectedLayer ? (
              (() => {
                const layer = layers.find((l) => l.id === selectedLayer);
                if (!layer) return <div>No layer</div>;

                if (layer.type === "background") {
                  return (
                    <div className="props-group">
                      
                      <label>
                        <input
                          type="checkbox"
                          checked={showOverlay}
                          onChange={() => onToggleOverlay?.()}
                        /> Show Dark Overlay
                      </label>


                      <label>
                        Upload Background
                        <input type="file" accept="image/*" onChange={onBgUpload} />
                      </label>
                      <label>
                        Blur
                        <input
                          type="range"
                          min="0"
                          max="30"
                          value={layer.blur || 0}
                          onChange={(e) =>
                            onUpdateLayer(layer.id, "blur", Number(e.target.value))
                          }
                        />
                      </label>
                      <label>
                        Opacity
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={layer.opacity ?? 1}
                          onChange={(e) =>
                            onUpdateLayer(layer.id, "opacity", Number(e.target.value))
                          }
                        />
                      </label>
                      {layer.url && (
                        <div className="bg-preview">
                          <img src={layer.url} alt="preview" />
                        </div>
                      )}
                    </div>
                  );
                }

                 

                  // 🎨 TEXT LAYER PROPERTIES
                  return (
                    <div className="props-group">
                      <label>
                        Text
                        <textarea
                          value={layer.text}
                          onChange={(e) =>
                            onUpdateLayer(layer.id, "text", e.target.value)
                          }
                        />
                      </label>

                      <div className="inline-fields">
                        <label>
                          Text Color
                          <input
                            type="color"
                            value={layer.palette?.[0] || layer.color || "#ffffff"}
                            onChange={(e) =>
                              onUpdateLayer(layer.id, "palette", [e.target.value])
                            }
                          />
                        </label>
                        <label>
                          Font Size
                          <input
                            type="number"
                            value={layer.fontSize || 36}
                            min="8"
                            onChange={(e) =>
                              onUpdateLayer(layer.id, "fontSize", Number(e.target.value))
                            }
                          />
                        </label>
                      </div>

                      <div className="wh-controls">
                        <label>
                          W
                          <input
                            type="number"
                            value={layer.width || 300}
                            min="10"
                            onChange={(e) =>
                              onUpdateLayer(layer.id, "width", Number(e.target.value))
                            }
                          />
                        </label>
                        <label>
                          H
                          <input
                            type="number"
                            value={layer.height || 100}
                            min="10"
                            onChange={(e) =>
                              onUpdateLayer(layer.id, "height", Number(e.target.value))
                            }
                          />
                        </label>
                      </div>

                      <div className="mini-preview">
                        <div
                          className="text-preview"
                          style={{
                            fontSize: `${Math.max(10, layer.fontSize * 0.4)}px`,
                            color: layer.color,
                          }}
                        >
                          {layer.text}
                        </div>
                      </div>
                    </div>
                    );
                })()
              ) : (
                <div className="no-layer">No layer selected</div>
              )}
          </div>
        </div>

      </div>
    </>
  );
}
*/







