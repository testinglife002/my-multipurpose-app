// ✅ SettingsPanel.jsx
import { useState } from "react";
import { Check, Palette } from "lucide-react";
import { colorPresets } from "../../config";
import { centerCanvas } from "../../fabric/fabric-utils";
import { useEditorStore } from "../../store";
import "./settings-panel.css";

function SettingsPanel() {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const { canvas, markAsModified } = useEditorStore();

  const apply = () => {
    canvas.set("backgroundColor", backgroundColor);
    canvas.renderAll();
    centerCanvas(canvas);
    markAsModified();
  };

  return (
    <div className="settings-panel">
      <Palette />
      {colorPresets.map(c => (
        <button
          key={c}
          style={{ background: c }}
          onClick={() => setBackgroundColor(c)}
        >
          {c === backgroundColor && <Check />}
        </button>
      ))}
      <button onClick={apply}>Apply</button>
    </div>
  );
}

export default SettingsPanel;
