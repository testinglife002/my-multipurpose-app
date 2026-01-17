// ✅ CanvasEditor.jsx (Fabric 6)
import { useEffect, useRef } from "react";
import { Canvas } from "fabric";

import { useCanvasHook } from "../../context/CanvasContext";

export default function CanvasEditor({ designInfo }) {
  const canvasRef = useRef(null);
  const { setCanvasEditor } = useCanvasHook();

  useEffect(() => {
    if (!canvasRef.current || !designInfo) return;

    const canvas = new Canvas(canvasRef.current, {
      width: designInfo.width,
      height: designInfo.height,
      backgroundColor: "#fff",
      preserveObjectStacking: true,
    });

    if (designInfo.jsonTemplate) {
      canvas.loadFromJSON(designInfo.jsonTemplate, () =>
        canvas.renderAll()
      );
    }

    setCanvasEditor(canvas);

    return () => canvas.dispose();
  }, [designInfo, setCanvasEditor]);

  return (
    <div className="canvas-editor-wrapper">
      <canvas ref={canvasRef} />
    </div>
  );
}
