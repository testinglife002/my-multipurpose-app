// ✅ TextPanel.jsx
import { textPresets } from "../../config";
import { addTextToCanvas } from "../../fabric/fabric-utils";
import { useEditorStore } from "../../store";
import { Type } from "lucide-react";
import "./text-panel.css";

function TextPanel() {
  const { canvas } = useEditorStore();

  return (
    <div className="text-panel">
      <button onClick={() => addTextToCanvas(canvas, "Enter text here")}>
        <Type /> Add Text
      </button>

      {textPresets.map((preset, i) => (
        <button
          key={i}
          onClick={() => addTextToCanvas(canvas, preset.text, preset)}
          style={{
            fontSize: preset.fontSize / 2,
            fontFamily: preset.fontFamily,
          }}
        >
          {preset.text}
        </button>
      ))}
    </div>
  );
}

export default TextPanel;
