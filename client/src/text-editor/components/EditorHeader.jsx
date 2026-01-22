// 📄 src/text-editor/components/EditorHeader.jsx
import React from "react";
import "./EditorHeader.css";
// import { ArrowUp, ArrowDown, Layers, SlidersHorizontal } from "lucide-react";
import { Layers, SlidersHorizontal } from "lucide-react";


export default function EditorHeader({
  activeTab,
  setActiveTab,
  onAddText,
  onAddImage,
  leftCollapsed,
  rightCollapsed,
  toggleLeft,
  toggleRight,
  collapsed,
  setCollapsed,
  showBgControls,
  setShowBgControls
}) {
  return (
    <header className="editor-header">

      <div className="editor-header-left">
        <button className="eh-btn" onClick={toggleLeft}>
          {leftCollapsed ? "▶" : "◀"} Layers
        </button>

        <button className="eh-btn primary" onClick={onAddText}>
          + Text
        </button>

        <label className="eh-btn">
          + Image
          <input hidden type="file" multiple accept="image/*"
            onChange={(e)=>Array.from(e.target.files).forEach(onAddImage)}
          />
        </label>
      </div>

      <div className="editor-header-center">
        <button
          className={`eh-tab ${activeTab==="layers"?"active":""}`}
          onClick={()=>setActiveTab("layers")}
        >
          Layers
        </button>
        <button
          className={`eh-tab ${activeTab==="bg"?"active":""}`}
          onClick={()=>setActiveTab("bg")}
        >
          Background
        </button>
        <button className="eh-tab" onClick={toggleRight}>
          BG {rightCollapsed ? "▶" : "◀"}
        </button>
      </div>

      <div  className="editor-header-right" >
        
        <div  className="header-toggle-group" >
          <button
             className="toggle-btn header-toggle"
            // className="toggle-btn"
            onClick={() => setCollapsed((c) => !c)}
            title={collapsed ? "Show Layers" : "Hide Layers"}
          > 
            <Layers size={20} />
            {!collapsed && <span className="toggle-text">Layers</span>}
          </button>

          <button
            className={`toggle-btn header-toggle ${showBgControls ? "active" : ""}`}
            onClick={() => setShowBgControls((p) => !p)}
            title="Toggle BG Controls"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>
      {/* Toggle Button */}
            
    </header>
  );
}
