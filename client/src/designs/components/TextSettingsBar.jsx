import React, { useRef, useState } from 'react'
import './text-settings-bar.css'
// import { TextSettingsList } from '../Options'
import { FaTrash } from 'react-icons/fa';
import { TextSettingsList } from '../Options';



const TextSettingsBar = () => {

    const ref = useRef(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [show,setShow] = useState(false);
    const { canvasEditor } = useCanvasHook();
    const onDelete = () => {
        if (!canvasEditor) return;

        const activeObject = canvasEditor.getActiveObject();
        if (!activeObject) return;

        canvasEditor.remove(activeObject);
        canvasEditor.discardActiveObject();
        canvasEditor.requestRenderAll();
        setShow(true);
    };

  return (
    <div>
    <div ref={ref} className="shapes-dropdown">
      <div className="shapes-toolbar">
        {TextSettingsList.map((item, index) => (
          <button
            key={index}
            className={`tool-btn ${activeIndex === index ? "active" : ""}`}
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

      {activeIndex !== null &&
        TextSettingsList[activeIndex].component && (
          <div className="shapes-panel-content">
            {TextSettingsList[activeIndex].component}
          </div>
        )}
    </div>
    </div>
  )
}

export default TextSettingsBar
