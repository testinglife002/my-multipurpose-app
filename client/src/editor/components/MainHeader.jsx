// // // // 2️⃣ src/editor/components/✅ MainHeader.jsx (React)
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Download,
  Eye,
  LogOut,
  Pencil,
  Save,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// import { useEditorStore } from "../store";

// import { saveCanvasState } from "../services/design-service";

import "./header.css";
import { useEditorStore } from "../../store";
import { saveCanvasState } from "../../services/design-service";

function MainHeader({ user }) {
  const {
    isEditing,
    setIsEditing,
    name,
    setName,
    canvas,
    saveStatus,
    markAsModified,
    designId,
  } = useEditorStore();

  const navigate = useNavigate();

  const [showExportModal, setShowExportModal] = useState(false);
  const [modeOpen, setModeOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const modeRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (modeRef.current && !modeRef.current.contains(e.target))
        setModeOpen(false);
      if (userRef.current && !userRef.current.contains(e.target))
        setUserOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!canvas || !designId) return;
    markAsModified();
  }, [name]);

  const handleSave = async () => {
    const res = await saveCanvasState(canvas, designId, name);

    if (!designId && res?.data?._id) {
      useEditorStore.setState({ designId: res.data._id });
      navigate(`/editor/${res.data._id}`, { replace: true });
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button onClick={() => navigate("/")}>Canva</button>

        <div className="dropdown" ref={modeRef}>
          <button onClick={() => setModeOpen(!modeOpen)}>
            {isEditing ? "Editing" : "Viewing"}
            <ChevronDown size={16} />
          </button>

          {modeOpen && (
            <div className="dropdown-menu">
              <button onClick={() => setIsEditing(true)}>
                <Pencil size={14} /> Editing
              </button>
              <button onClick={() => setIsEditing(false)}>
                <Eye size={14} /> Viewing
              </button>
            </div>
          )}
        </div>

        <button onClick={handleSave}>
          {saveStatus === "Saving..." ? <Loader2 className="spin" /> : <Save />}
        </button>

        <button onClick={() => setShowExportModal(true)}>
          <Download />
        </button>
      </div>

      <div className="header-center">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Design name"
        />
      </div>

      <div className="header-right">
        <div ref={userRef}>
          <button onClick={() => setUserOpen(!userOpen)}>
            {user?.name?.[0]?.toUpperCase()}
          </button>

          {userOpen && (
            <div className="dropdown-menu right">
              <strong>{user?.name}</strong>
              <small>{user?.email}</small>

              <button
                onClick={() => {
                  localStorage.removeItem("currentUser");
                  navigate("/login");
                }}
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/*<ExportModal isOpen={showExportModal} onClose={setShowExportModal} />*/}
    </header>
  );
}

export default MainHeader;
