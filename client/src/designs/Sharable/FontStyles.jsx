

import React, { useState } from "react";
import { Bold, Italic, Underline } from "lucide-react";
import "./font-styles.css";
import { useCanvasHook } from '../../context/CanvasContext';

function FontStyles() {
    const [active, setActive] = useState({
        bold: false,
        italic: false,
        underline: false,
    });

    const toggle = (key) => {
        setActive((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const { canvasEditor } = useCanvasHook();
    const onSettingClick = (type) => {

    const activeObject = canvasEditor.getActiveObject();
    if (activeObject) {
            if (type == 'bold') {
                activeObject.set({
                    fontWeight: activeObject?.fontWeight == 'bold' ? 'normal' : 'bold',
                })
            }

            if (type == 'italic') {
                activeObject.set({
                    fontStyle: activeObject?.fontStyle == 'italic' ? 'normal' : 'italic',
                })
            }

            if (type == 'underline') {
                activeObject.set({
                    underline: activeObject?.underline ? false : true,
                    
                })
            }
            canvasEditor.add(activeObject);
        }
    }   

  return (
    <div className="font-style-toolbar">
      <button
        className={`font-style-btn ${active.bold ? "active" : ""}`}
        aria-label="Toggle bold"
        // onClick={() => toggle("bold")}
        // defaultPressed={activeObject?.fontWeight == 'bold'}
        onClick={
            ()=> {
                onSettingClick('bold')
                toggle("bold")
            }    
        }
      >
        <Bold size={18} />
      </button>

      <button
        className={`font-style-btn ${active.italic ? "active" : ""}`}
        aria-label="Toggle italic"
        // onClick={() => toggle("italic")}
        // defaultPressed={activeObject?.fontStyle == 'italic'}
        onClick={
            ()=> {
                onSettingClick('italic')
                toggle("italic")
            }    
        }
      >
        <Italic size={18} />
      </button>

      <button
        className={`font-style-btn ${active.underline ? "active" : ""}`}
        aria-label="Toggle underline"
        // onClick={() => toggle("underline")}
        // defaultPressed={activeObject?.underline == 'bold'}
        onClick={
                ()=> {
                    onSettingClick('underline')
                    toggle("underline")
                }
            }
      >
        <Underline size={18} />
      </button>
    </div>
  );
}

export default FontStyles;
