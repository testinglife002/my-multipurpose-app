

import React from "react";
import { FontFamilyList } from "../Options";
import { useCanvasHook } from '../../context/CanvasContext';
import "./font-family.css";

const FontFamily = () => {
  const { canvasEditor } = useCanvasHook();

  const onFontFamilyChange = (font) => {
    if (!canvasEditor) return;

    const activeObject = canvasEditor.getActiveObject();
    if (!activeObject) return;

    activeObject.set({
      fontFamily: font,
    });

    canvasEditor.requestRenderAll();
  };

  return (
    <div className="font-family-dropdown">
      <div className="font-family-header">Font Family</div>

      <div className="font-family-list">
        {FontFamilyList.map((font, index) => (
          <div
            key={index}
            className="font-family-item"
            style={{ fontFamily: font }}
            onClick={() => onFontFamilyChange(font)}
          >
            {font}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FontFamily;

