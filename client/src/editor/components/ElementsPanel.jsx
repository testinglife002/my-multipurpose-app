// // src/editor/components/✅ ElementsPanel.jsx (React)
import { addShapeToCanvas } from "../../fabric/fabric-utils";
import { shapeDefinitions, shapeTypes } from "../../fabric/shapes/shape-definitions";
import { useEditorStore } from "../../store";
import { useEffect, useRef, useState } from "react";
import "./elements-panel.css";

function ElementsPanel() {
  const { canvas } = useEditorStore();
  const miniCanvasRef = useRef({});
  const canvasElementRef = useRef({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) return;

    const timer = setTimeout(async () => {
      const fabric = await import("fabric");

      for (const shapeType of shapeTypes) {
        const el = canvasElementRef.current[shapeType];
        if (!el) continue;

        const miniCanvas = new fabric.StaticCanvas(el, {
          width: 100,
          height: 100,
          backgroundColor: "transparent",
        });

        miniCanvasRef.current[shapeType] = miniCanvas;
        shapeDefinitions[shapeType].thumbnail(fabric, miniCanvas);
        miniCanvas.renderAll();
      }

      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [isInitialized]);

  return (
    <div className="elements-panel">
      <div className="elements-grid">
        {shapeTypes.map((type) => (
          <div
            key={type}
            className="element-item"
            onClick={() => addShapeToCanvas(canvas, type)}
          >
            <canvas
              width={100}
              height={100}
              ref={(el) => (canvasElementRef.current[type] = el)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ElementsPanel;
