// src/editor/components/TextEffectsPanel.jsx
import { toggleTextEffect } from "../../fabric/text-effects";
import { useEditorStore } from "../../store";
import "./text-effects-panel.css";

function TextEffectsPanel() {
  const { canvas } = useEditorStore();

  return (
    <div className="text-effects-panel">
      <h4>Text Effects</h4>

      <button onClick={() => toggleTextEffect(canvas, "shadow", { blur: 20 })}>
        Shadow
      </button>

      <button onClick={() => toggleTextEffect(canvas, "stroke", { color: "#000", width: 2 })}>
        Outline
      </button>

      <button onClick={() => toggleTextEffect(canvas, "glow", { color: "#00ffff", blur: 25 })}>
        Glow
      </button>

      <button onClick={() => toggleTextEffect(canvas, "neon", { color: "#00ffff" })}>
        Neon
      </button>

      <button
        onClick={() =>
          toggleTextEffect(canvas, "gradient", {
            colors: ["#ff0080", "#00ffff"],
          })
        }
      >
        Gradient
      </button>

      <button onClick={() => toggleTextEffect(canvas, "3d", { depth: 5 })}>
        3D
      </button>

      <p style={{ fontSize: 12, opacity: 0.6 }}>
        Select a text object to apply effects.
      </p>
    </div>
  );
}

export default TextEffectsPanel;
