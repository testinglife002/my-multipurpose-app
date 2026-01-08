import { useCanvasHook } from '../../context/CanvasContext';
import React, { useState } from 'react';
 import "./shape-controls.css";

const BorderRadius = () => {
  const { canvasEditor } = useCanvasHook();
  const [radius,setRadius] = useState(1);

  const onOpacityChange = (e) => {
    const value = Number(e.target.value);
    setRadius(value);

    if (!canvasEditor) return;

    const activeObject = canvasEditor.getActiveObject();
    if (!activeObject) return;

    activeObject.set({
      rx: value,
      ry: value
    });

    canvasEditor.renderAll();
  };

  return (
    <div className="control-group">
      <label>Update Border Radius</label>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={radius}
        onChange={onOpacityChange}   
      />
    </div>
  );
};

export default BorderRadius;








