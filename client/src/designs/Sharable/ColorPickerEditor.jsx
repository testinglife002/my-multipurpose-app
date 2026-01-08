// src/services/Sharable/ColorPickerEditor.jsx
import React from 'react'
import { ChromePicker, CirclePicker } from 'react-color'

function ColorPickerEditor({ value, onColorChange }) {
  return (
    <div >
      <ChromePicker
        color={value}
        onChange={(e) => onColorChange(e.hex)}
        className=''
      />
        <br/><br/>
      <CirclePicker
        color={value}
        onChange={(e) => onColorChange(e.hex)}
      />
      <br/>
    </div>
  )
}


export default ColorPickerEditor;