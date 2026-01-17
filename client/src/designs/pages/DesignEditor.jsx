// ✅ src/designs/pages/DesignEditor.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getDesignById } from "../../services/designService";
import { CanvasContext } from "../../context/CanvasContext";
import { v4 as uuidv4 } from "uuid";


import DesignHeader from "../components/DesignHeader";
import SideBar from "../components/SideBar";
import CanvasEditor from "../components/CanvasEditor";
import LayersPanel from "../components/LayersPanel";

import "./editor.css";
import TopBar from "../components/TopBar";
import { useContext } from "react";

const DEFAULT_CANVAS = {
  name: "Untitled Design",
  width: 1080,
  height: 1080,
  jsonTemplate: null,
};

export default function DesignEditor() {
  const { designId } = useParams(); // ✅ FIXED
  
  const [canvasEditor,setCanvasEditor] = useState()
  const [localDesignId, setLocalDesignId] = useState(null);

  // const router = useRouter();
  const navigate = useNavigate();

  const [designInfo, setDesignInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ UI STATES
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showLayers, setShowLayers] = useState(false);

  useEffect(() => {
    // 🆕 NEW DESIGN
    if (!designId || designId === "new") {
      const newId = uuidv4();
      setLocalDesignId(newId);
      setDesignInfo({
        name: "Untitled Design",
        width: 1080,
        height: 1080,
        jsonTemplate: null,
      });
      setLoading(false);
      return;
    }

    // 📦 EXISTING DESIGN
    getDesignById(designId)
      .then((res) => setDesignInfo(res.data))
      .catch(() => navigate("/dashboard"))
      .finally(() => setLoading(false));
  }, [designId, navigate]);

  if (loading) return <p>Loading design...</p>;
  if (!designInfo) return null;

  return (
    <div className="editor-root">

      <CanvasContext.Provider value={{canvasEditor,setCanvasEditor}} >
        <br/><br/><br/>
      <DesignHeader
        designInfo={designInfo}
        realDesignId={designId || localDesignId}
      />

      <div className="editor-body">
        <SideBar
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />

        <div className="editor-center">
          {/* TOPBAR ALWAYS ABOVE CANVAS */}
          <TopBar onToggleLayers={() => setShowLayers((p) => !p)} />

          <div className="editor-canvas">
            <CanvasEditor designInfo={designInfo} />
          </div>
        </div>

        {showLayers && <LayersPanel />}

      </div>
      </CanvasContext.Provider>
    </div>
  );
}


export const useCanvasHook = () => {
  const context = useContext(CanvasContext);
  if(!context) throw new Error("Error")
    return context;
}
