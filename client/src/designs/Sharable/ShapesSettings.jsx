// ShapesSettings.jsx
// "use client";

import { useState } from "react";
import { shapesSettingsList } from "../Options";
import "./shapes-settings.css";
import { FaTrash } from "react-icons/fa";
import { useCanvasHook } from "../../context/CanvasContext";


const ShapesSettings = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { canvasEditor } = useCanvasHook();

  const onDelete = () => {
    if (!canvasEditor) return;

    const activeObject = canvasEditor.getActiveObject();
    if (!activeObject) return;

    canvasEditor.remove(activeObject);
    canvasEditor.discardActiveObject();
    canvasEditor.requestRenderAll();
  };

  return (
    <div className="shapes-settings-dropdown">
      <div className="shapes-settings-icons">
        {shapesSettingsList.map((item, index) => (
          <button
            key={index}
            className={`shape-setting-btn ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() =>
              setActiveIndex(activeIndex === index ? null : index)
            }
            title={item.name}
          >
            <item.icon size={18} />
          </button>
        ))}

        <button
          className="shape-setting-btn delete-btn"
          onClick={onDelete}
          title="Delete"
        >
          <FaTrash size={16} />
        </button>
      </div>

      {activeIndex !== null && (
        <div className="shapes-settings-content">
          {shapesSettingsList[activeIndex].component}
        </div>
      )}
    </div>
  );
};

export default ShapesSettings;









/*
// ShapesSettings.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { shapesSettingsList } from "../Options";
import "./shapes-settings.css";
import { FaTrash } from "react-icons/fa";
import { useCanvasHook } from "@/app/design/[designId]/page";

const ShapesSettings = (  { onClose }  ) => {
  const ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const { canvasEditor } = useCanvasHook();

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);
  

  // const onDelete = () => {
  //  if (!canvasEditor) return;
  //  const activeObject = canvasEditor.getActiveObject();
  //  if(activeObject){
  //      canvasEditor.remove(activeObject);
  //      // canvasEditor.renderAll();
  //  }
  // }

  const onDelete = () => {
    if (!canvasEditor) return;

    const activeObject = canvasEditor.getActiveObject();
    if (!activeObject) return;

    // canvasEditor.remove(activeObject);
    canvasEditor.remove(activeObject);
    canvasEditor.renderAll();
     canvasEditor.discardActiveObject();
     canvasEditor.requestRenderAll();
  };


  return (
    <div ref={ref} className="shapes-settings-dropdown">
      <div className="shapes-settings-icons">
        {shapesSettingsList.map((item, index) => (
          <button
            key={index}
            className={`shape-setting-btn ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() =>
              setActiveIndex(activeIndex === index ? null : index)
            }
          >
            <item.icon size={18} />
          </button>
        ))}
        
        
        <button
          className="shape-setting-btn delete-btn"
          onClick={onDelete}
          title="Delete"
        >
          <FaTrash size={16} />
        </button>

      </div>
      
      {activeIndex !== null && (
        <div className="shapes-settings-content">
          {shapesSettingsList[activeIndex].component}
        </div>
      )}

      
    </div>
  );
};

export default ShapesSettings;
*/



/*
import React from 'react'
import { shapesSettingsList } from '../Options'
import './shapes-settings.css';

const ShapesSettings = () => {
  return (
    <div>
        <div className="shape-settings">
      {
        
        shapesSettingsList.map((shape,index) => (
            <div>
            
            <div>
                
                <div asChild >
                    <shape.icon/>
                    <button key={index} className="shape-setting-btn">
                    <shape.icon size={18} />
                    </button>
                </div>
         
                <div>
                    {shape.component}
                </div>
               
            </div>
            </div>
        ))
        
      }
      </div>
    </div>
  )
}

export default ShapesSettings
*/


