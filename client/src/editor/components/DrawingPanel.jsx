// ✅ DrawingPanel.jsx
import {
  toggleDrawingMode,
  toggleEraserMode,
  updateDrawingBrush,
} from "../../fabric/fabric-utils";
import { useEditorStore } from "../../store";
import {
  Droplets, EraserIcon, Minus, Palette,
  PencilIcon, Plus,
} from "lucide-react";
import { useState } from "react";
import { drawingPanelColorPresets } from "../../config";
import "./drawing-panel.css";

function DrawingPanel() {
  const { canvas } = useEditorStore();
  const [panelOpen, setPanelOpen] = useState(false);
  const [drawingActive, setDrawingActive] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [color, setColor] = useState("#000");
  const [width, setWidth] = useState(5);
  const [opacity, setOpacity] = useState(100);

  const startDrawing = () => {
    toggleDrawingMode(canvas, true, color, width);
    toggleEraserMode(canvas, false, color, width);
    setDrawingActive(true);
  };

  const stopDrawing = () => {
    toggleDrawingMode(canvas, false);
    setDrawingActive(false);
  };

  const toggleEraser = () => {
    const next = !isErasing;
    setIsErasing(next);
    toggleEraserMode(canvas, next, color, width * 2);
  };

  return (
    <div className="drawing-panel">
      <button onClick={() => setPanelOpen(p => !p)}>
        <PencilIcon /> Drawing
      </button>

      {panelOpen && (
        <>
          <button onClick={drawingActive ? stopDrawing : startDrawing}>
            {drawingActive ? "Stop" : "Start"} Drawing
          </button>

          {drawingPanelColorPresets.map(c => (
            <button
              key={c}
              style={{ background: c }}
              onClick={() => {
                setColor(c);
                updateDrawingBrush(canvas, { color: c });
              }}
            />
          ))}

          <input
            type="range"
            min="1"
            max="30"
            value={width}
            onChange={e => {
              setWidth(+e.target.value);
              updateDrawingBrush(canvas, { width: +e.target.value });
            }}
          />

          <input
            type="range"
            min="1"
            max="100"
            value={opacity}
            onChange={e => {
              setOpacity(+e.target.value);
              updateDrawingBrush(canvas, { opacity: +e.target.value / 100 });
            }}
          />

          <button onClick={toggleEraser}>
            <EraserIcon /> {isErasing ? "Stop" : "Eraser"}
          </button>
        </>
      )}
    </div>
  );
}

export default DrawingPanel;
