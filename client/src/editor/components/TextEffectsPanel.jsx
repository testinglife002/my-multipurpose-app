// 👉 Rewrite TextEffectsPanel UI for all new effects
// src/editor/components/TextEffectsPanel.jsx
import { toggleTextEffect } from "../../fabric/text-effects";
import { useEditorStore } from "../../store";
import "./text-effects-panel.css";

function TextEffectsPanel() {
  const { canvas } = useEditorStore();

  const apply = (name, options = {}) => {
    if (!canvas) return;
    toggleTextEffect(canvas, name, options);
  };    

  return (
    <div className="text-effects-panel">
      <h4>Basic Effects</h4>

      <div className="effects-grid">
        <button onClick={() => toggleTextEffect(canvas, "shadow", { blur: 20 })}>Shadow</button>
        <button onClick={() => toggleTextEffect(canvas, "stroke", { color: "#000", width: 2 })}>Outline</button>
        <button onClick={() => toggleTextEffect(canvas, "glow", { color: "#00ffff", blur: 25 })}>Glow</button>
        <button onClick={() => toggleTextEffect(canvas, "neon", { color: "#00ffff" })}>Neon</button>
        <button
            onClick={() =>
            toggleTextEffect(canvas, "gradient", {
                colors: ["#ff0080", "#00ffff"],
            })
            }
        >
            Gradient
        </button>
      </div>

    

      <h4>3D / Depth</h4>

      <div className="effects-grid">
        <button onClick={() => toggleTextEffect(canvas, "3d", { depth: 5 })}>3D Extrude</button>
        <button onClick={() => apply("longShadow", { depth: 20 })}>Long Shadow</button>
        <button onClick={() => apply("isometric", { depth: 12 })}>Isometric</button>
      </div>

      <h4>Perspective / Glass</h4>

      <div className="effects-grid">
        <button onClick={() => apply("perspective")}>Perspective</button>
        <button onClick={() => apply("glass")}>Glass</button>
      </div>

      <p className="panel-hint">
        Select a text object to apply effects.
      </p>
    </div>
  );
}

export default TextEffectsPanel;
 