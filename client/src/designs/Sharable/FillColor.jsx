import React, { useState } from 'react'
import ColorPickerEditor from './ColorPickerEditor'
import { useCanvasHook } from '../../context/CanvasContext';

const FillColor = () => {
    const [color,setColor] = useState('#000');
    const { canvasEditor } = useCanvasHook();
    const onColorChange = (color) => {
        setColor(color);
        if (!canvasEditor) return;
        const activeObject = canvasEditor.getActiveObject(); // ✅ FIX

        if (!activeObject) return;
        // if (!activeObject) return;
        activeObject.set({
            fill: color
        });
        // canvasEditor.add(activeObject);
        canvasEditor.renderAll();
    }
  return (
    <div>
      <ColorPickerEditor value={color} onColorChange={onColorChange}  />
    </div>  
  )
}

export default FillColor
