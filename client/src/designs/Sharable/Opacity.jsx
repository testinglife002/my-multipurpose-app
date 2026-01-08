import { useCanvasHook } from '../../context/CanvasContext';
import React, { useState } from 'react';
 import "./shape-controls.css";

const Opacity = () => {
  const { canvasEditor } = useCanvasHook();
  const [opacity,setOpacity] = useState(1);

  const onOpacityChange = (e) => {
    const value = Number(e.target.value);
    setOpacity(value);

    if (!canvasEditor) return;

    const activeObject = canvasEditor.getActiveObject();
    if (!activeObject) return;

    activeObject.set({
      opacity: value,
    });

    canvasEditor.renderAll();
  };

  return (
    <div className="control-group">
      <label>Update Opacity</label>
      <input
        type="range"
        min={0}
        max={1}
        step={0.1}
        value={opacity}
        onChange={onOpacityChange}   
      />
    </div>
  );
};

export default Opacity;








