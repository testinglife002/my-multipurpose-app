// src/services/Components/BackgroundSetting.jsx
import React, { useState } from 'react'
import ColorPickerEditor from '../Sharable/ColorPickerEditor'
import { useCanvasHook } from '../../context/CanvasContext';


function BackgroundSetting() {
  const [bgColor, setBgColor] = useState('#fff')
  const { canvasEditor } = useCanvasHook();

  const onColorChange = (color) => {
    setBgColor(color);
    canvasEditor?.set({
        backgroundColor: color,
        backgroundImage: null
    })
    canvasEditor.requestRenderAll();
    canvasEditor.renderAll();
  }

  return (
    <div>
      <ColorPickerEditor
        value={bgColor}
        onColorChange={(v) => onColorChange(v)}
      />
    </div>
  )
}

export default BackgroundSetting