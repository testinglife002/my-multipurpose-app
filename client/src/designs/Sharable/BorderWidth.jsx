import { useCanvasHook } from '../../context/CanvasContext';
import React, { useState } from 'react';
import "./shape-controls.css";

const BorderWidth = () => {
  const { canvasEditor } = useCanvasHook();
  const [width, setWidth] = useState(1);

  const onWidthChange = (e) => {
    const value = Number(e.target.value);
    setWidth(value);

    if (!canvasEditor) return;

    const activeObject = canvasEditor.getActiveObject();
    if (!activeObject) return;

    activeObject.set({
      strokeWidth: value,
    });

    canvasEditor.renderAll();
  };

  return (
    <div className="control-group">
      <label>Stroke Width: {width}px</label>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={width}
        onChange={onWidthChange}   
      />
    </div>
  );
};

export default BorderWidth;









/*
import { useCanvasHook } from '@/app/design/[designId]/page';
import React, { useState } from 'react'

const BorderWidth = () => {

    const { canvasEditor } = useCanvasHook();
    // const [width, setWidth] = useState(1);

    const onWidthChange = (value) => {
        if (!canvasEditor) return;
        // setWidth(value);
        const activeObject = canvasEditor.getActiveObject(); // ✅ FIX

        if (!activeObject) return;
        if (activeObject) {
            activeObject.set({
                strokeWidth: value
            });
            // canvasEditor.add(activeObject);
            canvasEditor.renderAll();
        }
        
    }

  return (
    <div>
    <div className="control-group">
    <label>Stroke Width: {width}px</label>
    <input 
        type='range' 
        max={100} 
        min={0} 
        step={1} 
        defaultValue={[33]}
        onValueChange={(v)=>onWidthChange(v[0])} 
    />  
    </div>
    </div>
  )
}

export default BorderWidth
*/

