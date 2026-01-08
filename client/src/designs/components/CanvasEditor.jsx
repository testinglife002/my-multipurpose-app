// ✅ src/designs/components/CanvasEditor.jsx
import { useEffect, useRef } from "react";
import { Canvas } from "fabric";
import { useCanvasHook } from "../../context/CanvasContext";
import TopBar from "./TopBar";
/*
import { useCanvasHook } from "../../../context/CanvasContext";
import TopBar from "../../../components/TopBar";
*/

export default function CanvasEditor({ designInfo, onToggleLayers }) {
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
      canvas.loadFromJSON(designInfo.jsonTemplate, canvas.renderAll.bind(canvas));
    }

    setCanvasEditor(canvas);

    return () => canvas.dispose();
  }, [designInfo, setCanvasEditor]);

  return (
    <>
      <TopBar onToggleLayers={onToggleLayers} />
      <div className="canvas-editor-wrapper">
        <canvas ref={canvasRef} />
      </div>
    </>
  );
}
