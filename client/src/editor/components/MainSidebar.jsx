// // // // 2️⃣ src/editor/components/✅ MainSidebar.jsx (No change except imports)
import {
  ArrowLeft,
  ChevronLeft,
  Grid,
  Pencil,
  Settings,
  Sparkle,
  Type,
  Upload,
} from "lucide-react";
import { useState } from "react";
import "./main-sidebar.css";
import ElementsPanel from "./ElementsPanel";
import TextPanel from "./TextPanel";
import UploadPanel from "./UploadPanel";
import DrawingPanel from "./DrawingPanel";
import SettingsPanel from "./SettingsPanel";
import TextEffectsPanel from "./TextEffectsPanel";
/*
import SettingsPanel from "./SettingsPanel";
import ElementsPanel from "./ElementsPanel";
import TextPanel from "./TextPanel";
import UploadPanel from "./UploadPanel";
import DrawingPanel from "./DrawingPanel";
*/

function MainSidebar() {
  const [activeSidebar, setActiveSidebar] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    { id: "elements", icon: Grid, label: "Elements", panel: <ElementsPanel/> },
    { id: "text", icon: Type, label: "Text", panel: <TextPanel/> },
     { id: "text-effects", icon: Sparkle, label: "Text Effects", panel: <TextEffectsPanel/> },
    { id: "uploads", icon: Upload, label: "Uploads", panel: <UploadPanel /> },
    { id: "draw", icon: Pencil, label: "Draw", panel: <DrawingPanel /> },
    { id: "settings", icon: Settings, label: "Settings", panel: <SettingsPanel/> },
  ];

  const active = items.find(i => i.id === activeSidebar);

  return (
    <div >
      

    <div className="sidebar-layout">
      {/* PRIMARY SIDEBAR */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        {items.map(i => (
          <button
            key={i.id}
            className={`sidebar-item ${activeSidebar === i.id ? "active" : ""}`}
            onClick={() => setActiveSidebar(i.id)}
          >
            <i.icon className="sidebar-icon" />
            {!collapsed && (
              <span className="sidebar-label">{i.label}</span>
            )}
          </button>
        ))}

        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "›" : "‹"}
        </button>
      </aside>

      {/* SECONDARY PANEL */}
      {active && (
        <div className={`secondary-panel`}>
          <div className="panel-header">
            <ArrowLeft onClick={() => setActiveSidebar(null)} />
            {active.label}
          </div>
          <div className="panel-content">{active.panel}</div>
        </div>
      )}
    </div>
  </div>
  );
}



export default MainSidebar;
