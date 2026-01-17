// src/editor/components/✅ React Version — Canvas.jsx
import { useEffect, useRef } from "react";
import { customizeBoundingBox, initializeFabric } from "../../fabric/fabric-utils";
import { useEditorStore } from "../../store";

import "./canvas.css";

function Canvas() {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const initAttemptedRef = useRef(false);

  const { setCanvas, markAsModified } = useEditorStore();

  const resizeCanvas = () => {
    if (!fabricCanvasRef.current || !canvasContainerRef.current) return;

    const container = canvasContainerRef.current;

    const width = container.clientWidth * 0.95;
    const height = container.clientHeight * 0.95;

    fabricCanvasRef.current.setDimensions({ width, height });
    fabricCanvasRef.current.renderAll();
  };

  useEffect(() => {
    const cleanUpCanvas = () => {
      if (fabricCanvasRef.current) {
        try {
          fabricCanvasRef.current.off("object:added");
          fabricCanvasRef.current.off("object:modified");
          fabricCanvasRef.current.off("object:removed");
          fabricCanvasRef.current.off("path:created");
        } catch (e) {
          console.error("Error removing event listeners", e);
        }

        try {
          fabricCanvasRef.current.dispose();
        } catch (e) {
          console.error("Error disposing canvas", e);
        }

        fabricCanvasRef.current = null;
        setCanvas(null);
      }
    };

    cleanUpCanvas();
    initAttemptedRef.current = false;

    const initCanvas = async () => {
      if (
        typeof window === "undefined" ||
        !canvasRef.current ||
        initAttemptedRef.current
      ) {
        return;
      }

      initAttemptedRef.current = true;

      try {
        const fabricCanvas = await initializeFabric(
          canvasRef.current,
          canvasContainerRef.current
        );

        if (!fabricCanvas) {
          console.error("Failed to initialize Fabric.js canvas");
          return;
        }

        fabricCanvasRef.current = fabricCanvas;
        setCanvas(fabricCanvas);

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        customizeBoundingBox(fabricCanvas);

        const handleCanvasChange = () => {
          markAsModified();
        };

        fabricCanvas.on("object:added", handleCanvasChange);
        fabricCanvas.on("object:modified", handleCanvasChange);
        fabricCanvas.on("object:removed", handleCanvasChange);
        fabricCanvas.on("path:created", handleCanvasChange);

        console.log("Canvas initialized successfully");

      } catch (e) {
        console.error("Failed to init canvas", e);
      }
    };

    const timer = setTimeout(initCanvas, 50);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", resizeCanvas);
      cleanUpCanvas();
    };
  }, []);

  return (
    <div className="canvas-wrapper" ref={canvasContainerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Canvas;

