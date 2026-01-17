// LayersPanel.jsx

import { useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import "./layers-panel.css";
import { useCanvasHook } from "../../context/CanvasContext";

export default function LayersPanel() {
  const { canvasEditor } = useCanvasHook();
  const [layers, setLayers] = useState([]);

  // 🔄 Sync layers with canvas stack
  useEffect(() => {
    if (!canvasEditor) return;

    const updateLayers = () => {
      const objects = canvasEditor.getObjects().map((obj, index) => ({
        id: obj.__uid || index,
        obj,
        name: obj.type || "Layer",
      }));

      // UI: topmost first
      setLayers([...objects].reverse());
    };

    updateLayers();

    const events = [
      "object:added",
      "object:removed",
      "object:modified",
      "selection:created",
      "selection:updated",
      "selection:cleared",
    ];

    events.forEach((e) => canvasEditor.on(e, updateLayers));
    return () => events.forEach((e) => canvasEditor.off(e, updateLayers));
  }, [canvasEditor]);

  // 🎯 Actions
  const selectLayer = (obj) => {
    canvasEditor.setActiveObject(obj);
    canvasEditor.requestRenderAll();
  };

  const toggleVisibility = (obj) => {
    obj.visible = !obj.visible;
    canvasEditor.requestRenderAll();
  };

  const toggleLock = (obj) => {
    obj.selectable = !obj.selectable;
    obj.evented = !obj.evented;
    canvasEditor.requestRenderAll();
  };

  const deleteLayer = (obj) => {
    canvasEditor.remove(obj);
    canvasEditor.requestRenderAll();
  };

  // 🔼 Move ONE STEP UP
  const moveUp = (obj) => {
    canvasEditor.discardActiveObject();
    canvasEditor.bringForward(obj);
    canvasEditor.setActiveObject(obj);
    canvasEditor.requestRenderAll();
  };

  // 🔽 Move ONE STEP DOWN
  const moveDown = (obj) => {
    canvasEditor.discardActiveObject();
    canvasEditor.sendBackwards(obj);
    canvasEditor.setActiveObject(obj);
    canvasEditor.requestRenderAll();
  };

  return (
    <div className="layers-panel">
      <h3>Layers</h3>

      {layers.map(({ obj, name }, i) => (
        <div
          key={i}
          className={`layer-item ${
            canvasEditor?.getActiveObject() === obj ? "active" : ""
          }`}
          onClick={() => selectLayer(obj)}
        >
          <span>{name}</span>

          <div className="layer-actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleVisibility(obj);
              }}
            >
              {obj.visible ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLock(obj);
              }}
            >
              {obj.selectable ? <Unlock size={14} /> : <Lock size={14} />}
            </button>

            <button
              title="Move up"
              onClick={(e) => {
                e.stopPropagation();
                moveUp(obj);
              }}
            >
              <ArrowUp size={14} />
            </button>

            <button
              title="Move down"
              onClick={(e) => {
                e.stopPropagation();
                moveDown(obj);
              }}
            >
              <ArrowDown size={14} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteLayer(obj);
              }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
