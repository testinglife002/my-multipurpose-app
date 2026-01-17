  // "use client";

  import { useEffect, useRef, useState } from "react";
  // import ShapesSettings from "../Sharable/ShapesSettings";
  // import TextSettingsBar from "./TextSettingsBar";
  import "./topbar.css";
  import { Layers } from "lucide-react";
  import ShapesSettings from "../Sharable/ShapesSettings";
  import TextSettingsBar from "./TextSettingsBar";
  import { useCanvasHook } from "../../context/CanvasContext";


  const TopBar = ( { onToggleLayers }  ) => {
    const { canvasEditor } = useCanvasHook();

    const [manualOpen, setManualOpen] = useState(false);
    const [hasSelection, setHasSelection] = useState(false);
    const [enableTextSettings, setEnableTextSettings] = useState(false);

    const dropdownRef = useRef(null);

    // ✅ Fabric selection tracking (SAFE & CORRECT)
    useEffect(() => {
      if (!canvasEditor) return;

      const handleSelection = () => {
        const activeObject = canvasEditor.getActiveObject();
        if (!activeObject) return;

        setHasSelection(true);

        const isText =
          activeObject.type === "i-text" ||
          activeObject.type === "textbox" ||
          activeObject.type === "text";

        setEnableTextSettings(isText);

        // Shapes auto-open, text does not
        setManualOpen(!isText);
      };

      const handleClear = () => {
        setHasSelection(false);
        setEnableTextSettings(false);
        setManualOpen(false);
      };

      canvasEditor.on("selection:created", handleSelection);
      canvasEditor.on("selection:updated", handleSelection);
      canvasEditor.on("selection:cleared", handleClear);

      return () => {
        canvasEditor.off("selection:created", handleSelection);
        canvasEditor.off("selection:updated", handleSelection);
        canvasEditor.off("selection:cleared", handleClear);
      };
    }, [canvasEditor]);

    // ✅ Click outside → close manual shape settings
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setManualOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ✅ Visibility rules
    const showShapeSettings =
      (hasSelection && !enableTextSettings) || manualOpen;

    return (
      <div className="topbar">
        <div className="topbar-left">
          <span className="topbar-title">Editor Tools</span>
        </div>

        <div className="topbar-right" ref={dropdownRef}>
          <button
            className="topbar-btn"
            onClick={() => setManualOpen(true)}
          >
            Shape Settings
          </button>

          {<button className="topbar-btn" onClick={onToggleLayers}>
            <Layers size={16} />
            Layers
          </button>}

          <div className="topbar-dropdown-stack">
            {showShapeSettings && !enableTextSettings && <ShapesSettings />}
            {enableTextSettings && <TextSettingsBar />}
          </div>


        </div>
      </div>
    );
  };

  export default TopBar;




