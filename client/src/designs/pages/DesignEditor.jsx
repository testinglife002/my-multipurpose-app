// ✅ src/designs/pages/DesignEditor.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

/*
import { getDesignById } from "../../api/designService";
import { CanvasContext } from "../../context/CanvasContext";

import DesignHeader from "./components/DesignHeader";
import SideBar from "./components/SideBar";
import CanvasEditor from "./components/CanvasEditor";
import LayersPanel from "./components/LayersPanel";
*/

import "./editor.css";
import { getDesignById } from "../../services/designService";
import { CanvasContext } from "../../context/CanvasContext";
import DesignHeader from "../components/DesignHeader";
import SideBar from "../components/SideBar";
import CanvasEditor from "../components/CanvasEditor";
import LayersPanel from "../components/LayersPanel";


export default function DesignEditor() {
  const { designId } = useParams();
  const navigate = useNavigate();

  const [canvasEditor, setCanvasEditor] = useState(null);
  const [designInfo, setDesignInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showLayers, setShowLayers] = useState(false);

  useEffect(() => {
    if (!designId) return;

    getDesignById(designId)
      .then((res) => setDesignInfo(res.data))
      .catch(() => navigate("/dashboard"))
      .finally(() => setLoading(false));
  }, [designId, navigate]);

  if (loading) return <p>Loading design...</p>;
  if (!designInfo) return null;

  return (
    <div className="editor-root">
      <CanvasContext.Provider value={{ canvasEditor, setCanvasEditor }}>
        <DesignHeader designInfo={designInfo} />

        <div className="editor-body">
          <SideBar
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />

          <div className="editor-canvas">
            <CanvasEditor
              designInfo={designInfo}
              onToggleLayers={() => setShowLayers((p) => !p)}
            />
          </div>

          {showLayers && <LayersPanel />}
        </div>
      </CanvasContext.Provider>
    </div>
  );
}
