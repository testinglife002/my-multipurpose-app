// src/text-editor/components/TextApp.jsx
// 📄 src/app/dashboard/text-editor/TextApp.jsx
import React, { useEffect, useRef, useState } from "react";
// import CanvasView from "./components/CanvasView";
// import { v4 as uuidv4 } from "uuid";
// import BgControls from "./components/BgControls";

import { v4 as uuidv4 } from "uuid";
import "./TextApp.css";
import "./variables.css";
import TextSidebar from "./TextSidebar";
import FabricCanvasView from "./FabricCanvasView";
import LayerPanel from "./LayerPanel";
import BgControls from "./BgControls";
import EditorHeader from "./EditorHeader";
import newRequest from "../../api/newRequest";
import RightBgPanel from "./RightBgPanel";
/*
import TextCanvas from "@/components/text-editor/TextCanvas";
import TextSidebar from "@/components/text-editor/TextSidebar";
import ExportControls from "@/components/text-editor/ExportControls";
import LayerPanel from "@/components/text-editor/LayerPanel";

import BgControl from "@/components/text-editor/BgControl";
import FabricCanvasView from "./FabricCanvasView";
import BgControls from "@/components/text-editor/BgControls";
*/


const initialLayers = [
  { id: "bg-1", type: "background", url: "", opacity: 0.8, blur: 0, zIndex: 0 },
  {
    id: "text-1",
    type: "text",
    text: "Hello, styled world!\nResize me and try effects",
    fontSize: 48,
    fontFamily: "Inter, system-ui, Arial",
    fontWeight: 700,
    color: "#ffffff",
    x: 50,
    y: 50,
    zIndex: 1,
    width: 520,
    height: 140,
    effect: "neon",
    palette: ["#fff"],
    clipPath: null,
    maskSettings: {},
    playback: { playing: true, speed: 1 },
  },
];


export default function TextApp() {
  const [templates, setTemplates] = useState([]);
  const [current, setCurrent] = useState(null);
  /* ---------------- CORE STATE ---------------- */
  const [layers, setLayers] = useState(initialLayers);
  const [selectedLayer, setSelectedLayer] = useState("text-1");

  /* ---------------- UI STATE ---------------- */
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [rightTab, setRightTab] = useState("layers"); // layers | bg

  /* ---------------- BG STATE (FIX) ---------------- */
  /* ---------------- BG STATE ---------------- */
  const [showOverlay, setShowOverlay] = useState(true);
  const [overlayScale, setOverlayScale] = useState(1);
  const [textBgScale, setTextBgScale] = useState(1);
  const [showTextBg, setShowTextBg] = useState(false);

  // const [showOverlay, setShowOverlay] = useState(true);
  // const [showTextBg, setShowTextBg] = useState(false);


  /* ---------------- HELPERS ---------------- */

  const selectedLayerObj =
    layers.find((l) => l.id === selectedLayer) || null;

  const backgroundLayer =
    layers.find((l) => l.type === "background") || null;

  const handleUpdateLayer = (id, key, value) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [key]: value } : l))
    );
  };

  const updateLayer = (id, patch) => {
    if (patch.__delete__) {
        setLayers((prev) => prev.filter((l) => l.id !== id));
        setSelectedLayer(null);
        return;
    }

    setLayers((prev) =>
        prev.map((l) => (l.id === id ? { ...l, ...patch } : l))
    );
  };


  /*
  const handleBgUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    setLayers((prev) =>
      prev.map((l) =>
        l.type === "background" ? { ...l, url } : l
      )
    );
  };
  */

  const updateBackground = (patch) => {
    if (!backgroundLayer) return;
    updateLayer(backgroundLayer.id, patch);
  };

  const handleBgUpload = (file) => {
    const url = URL.createObjectURL(file);
    updateBackground({ url });
  };



  const textRefs = useRef({});

  useEffect(() => {
    fetchTemplates();
  }, []);

  async function fetchTemplates() {
    try {
      const res = await newRequest.get("/text-templates");
      setTemplates(res.data || []);
    } catch (err) {
      console.error("Failed to fetch templates", err);
    }
  }

  // ✅ When selecting a template from sidebar
  useEffect(() => {
    if (!current) return;

    let tplLayers = [];

    if (Array.isArray(current.layers) && current.layers.length > 0) {
      tplLayers = current.layers.map((l, idx) => ({
        ...l,
        id: l.id || `layer-${idx}-${Date.now()}`,
        zIndex: l.zIndex ?? idx + 1,
      }));
    } else {
      // fallback: convert single-text template into layered format
      tplLayers = [
        {
          id: uuidv4(),
          type: "background",
          url: current.bgImageUrl || "",
          opacity: current.opacity ?? 1,
          blur: current.blur ?? 0,
          zIndex: 0,
        },
        {
          id: uuidv4(),
          type: "text",
          text: current.text || "Untitled",
          fontSize: current.fontSize || 48,
          fontFamily: "Inter, system-ui, Arial",
          fontWeight: 700,
          color: current.color || "#fff",
          palette: current.palette || [current.color || "#fff"],
          effect: current.effect || "",
          x: current.pos?.x ?? 50,
          y: current.pos?.y ?? 50,
          zIndex: 1,
          width: 500,
          height: 150,
          playback: { playing: true, speed: 1 },
        },
      ];
    }

    setLayers(tplLayers);
    const firstText = tplLayers.find((l) => l.type === "text");
    setSelectedLayer(firstText ? firstText.id : null);
  }, [current]);

  

  const handleSelectPreset = (presetId, palette = []) =>
    setLayers((prev) =>
      prev.map((l) =>
        l.type === "text" && l.id === selectedLayer
          ? { ...l, effect: presetId, palette, color: palette[0] ?? l.color }
          : l
      )
    );

  const handleAddTextLayer = () => {
    const highestZ = layers.length
      ? Math.max(...layers.map((l) => l.zIndex ?? 0))
      : 0;
    const newLayer = {
      id: uuidv4(),
      type: "text",
      text: "New text layer",
      fontSize: 36,
      fontFamily: "Inter, system-ui, Arial",
      fontWeight: 600,
      color: "#fff",
      textBgColor: "rgba(0,0,0,0.6)",   // ✅ NEW
      showTextBg: false,               // ✅ NEW
      x: 50,
      y: 50,
      zIndex: highestZ + 1,
      width: 420,
      height: 100,
      effect: "",
      clipPath: null,
      maskSettings: {},
      playback: { playing: true, speed: 1 },
    };
    setLayers((prev) => [...prev, newLayer]);
    setSelectedLayer(newLayer.id);
  };

  
  const handleAddImageLayer = (file) => {
    const url = URL.createObjectURL(file);
    const highestZ = Math.max(...layers.map(l => l.zIndex), 0);

    const layer = {
        id: uuidv4(),
        type: "image",
        url,
        x: 50,
        y: 50,
        width: 400,
        height: 300,
        zIndex: highestZ + 1,
        opacity: 1,
        blur: 0,
        blendMode: "source-over",
    };

    setLayers(prev => [...prev, layer]);
    setSelectedLayer(layer.id);
    };


  const handleDeleteTemplate = async (id) => {
    try {
      await newRequest.delete(`/text-templates/${id}`);
      setTemplates((prev) => prev.filter((t) => t._id !== id));
      if (current?._id === id) setCurrent(null);
    } catch (err) {
      console.error("Failed to delete template", err);
    }
  };

  // ✅ updated to send FormData with optional file (matching backend)
  const handleSaveTemplate = async () => {
    try {
      const payload = {
        name: current?.name || `Template ${Date.now()}`,
        layers,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));

      // optional background file could be added here later
      if (current?.bgFile) formData.append("file", current.bgFile);

      if (current?._id) {
        await newRequest.put(`/text-templates/${current._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Template updated!");
      } else {
        const res = await newRequest.post("/text-templates", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setCurrent(res.data);
        setTemplates((prev) => [res.data, ...prev]);
        alert("Template saved!");
      }

      fetchTemplates();
    } catch (err) {
      console.error("Failed to save template", err);
      alert("Error saving template");
    }
  };


  // const selectedLayerObj = layers.find((l) => l.id === selectedLayer) || null;

  

  return (
    <>
    {/*<div className="app-root">
      
      {<TextSidebar
        templates={templates}
        onSelect={(tpl) => setCurrent(tpl)}
        onPresetSelect={handleSelectPreset}
        onPresetHover={(pId) => setHoverEffect(pId)}
        layers={layers}
        selectedLayer={selectedLayerObj}
        selectedLayerId={selectedLayer}
        onDeleteTemplate={handleDeleteTemplate}
      />}

      <main className="main-area">
        <div className="top-controls">
          <button className="btn" onClick={handleAddTextLayer}>
            + Add Text Layer
          </button>
          <ExportControls canvasId="studio-canvas" template={current} />
        </div>
        <div className="workspace">
          
          <CanvasView
            id="studio-canvas"
            layers={layers}
            template={current}
            selectedLayer={selectedLayer}
            hoverEffect={hoverEffect}
            showOverlay={showOverlay}
            onSelectLayer={(id) => setSelectedLayer(id)}
            onUpdateLayer={handleUpdateLayer}
            onSaveTemplate={handleSaveTemplate}
            showBgControls={showBgControls}
          />
          
          <TextCanvas showBgControls={showBgControls} />

          <div className="canvas-area">
            <FabricCanvasView
                layers={layers}
                selectedLayerId={selectedLayer}
                onSelectLayer={setSelectedLayer}
                onUpdateLayer={handleUpdateLayer}
            />
            </div>

        
            <BgControls
              // backgroundLayer={layers.find((l) => l.type === "background")}
                overlayScale={overlayScale}
                textBgScale={textBgScale}
                showOverlay={showOverlay}
                showTextBg={showTextBg}
                setOverlayScale={setOverlayScale}
                setTextBgScale={setTextBgScale}
                setShowOverlay={setShowOverlay}
                setShowTextBg={setShowTextBg}
                selectedLayerObj={selectedLayerObj}
                onUpdateLayer={handleUpdateLayer}
            />            
         
           
            <BgControls
                overlayScale={overlayScale}
                textBgScale={textBgScale}
                showOverlay={showOverlay}
                showTextBg={showTextBg}
                setOverlayScale={setOverlayScale}
                setTextBgScale={setTextBgScale}
                setShowOverlay={setShowOverlay}
                setShowTextBg={setShowTextBg}
                selectedLayerObj={selectedLayerObj}
                onUpdateLayer={onUpdateLayer}
                />
          
          
        </div>

      </main>

      <div className="right-panel">
        <div className="panel-slot">
            <LayerPanel
            layers={layers}
            selectedLayer={selectedLayer}
            showOverlay={showOverlay}
            onToggleOverlay={setShowOverlay}
            onSelectLayer={setSelectedLayer}
            onUpdateLayer={handleUpdateLayer}
            showBgControls={showBgControls}
            setShowBgControls={setShowBgControls}
            onBgUpload={handleBgUpload}   // ✅ ADD THIS
            />

            <BgControl
            collapsed={!showBgControls}
            showOverlay={showOverlay}
            setShowOverlay={setShowOverlay}
            selectedLayerObj={selectedLayerObj}
            onUpdateLayer={handleUpdateLayer}
            />
        </div>
        </div>


    </div>*/}
    <div className="editor-shell">

        <EditorHeader
            activeTab={rightTab}
            setActiveTab={setRightTab}
            onAddText={handleAddTextLayer}
            onAddImage={handleAddImageLayer}
        />
    <div className="app-root">
    {/* LEFT SIDEBAR */}
    <div className={`left-sidebar ${leftCollapsed ? "collapsed" : ""}`}>
        <TextSidebar
        templates={templates}
        onSelect={(tpl) => setCurrent(tpl)}
        onPresetSelect={handleSelectPreset}
        // onPresetHover={(pId) => setHoverEffect(pId)}
        layers={layers}
        selectedLayer={selectedLayerObj}
        selectedLayerId={selectedLayer}
        onDeleteTemplate={handleDeleteTemplate}
        />
        <button
        className="collapse-btn left"
        onClick={() => setLeftCollapsed((v) => !v)}
        >
        {leftCollapsed ? "▶" : "◀"}
        </button>
    </div>

    
    {/*<div className="top-controls">
        <button className="btn" onClick={handleAddTextLayer}>
        + Add Text Layer
        </button>
        <button className="btn" onClick={handleAddImageLayer}>
        + Add Images
        </button>
      
        <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
                if (!e.target.files) return;

                Array.from(e.target.files).forEach((file) => {
                    const files = Array.from(e.target.files);
                    let lastId = null;

                    setLayers((prev) => {
                    const baseZ = Math.max(...prev.map(l => l.zIndex), 0);

                    const newLayers = files.map((file, i) => {
                        lastId = uuidv4();
                        return {
                        id: lastId,
                        type: "image",
                        url: URL.createObjectURL(file),
                        x: 50,
                        y: 50,
                        width: 400,
                        height: 300,
                        zIndex: baseZ + i + 1,
                        opacity: 1,
                        blur: 0,
                        blendMode: "source-over",
                        visible: true,
                        locked: false,
                        };
                    });

                    return [...prev, ...newLayers];
                    });

                    setSelectedLayer(lastId);

                });
            }}
        />


    </div>*/}

    {/* CANVAS AREA */}
     { <div className="canvas-area">
        <div className="canvas-stage">
        <FabricCanvasView
            layers={layers}
            selectedLayerId={selectedLayer}
            onSelectLayer={setSelectedLayer}
            onUpdateLayer={(id, key, val) =>
            updateLayer(id, { [key]: val })
          }
          overlay={{ showOverlay, overlayScale }}
        />
        </div>
    </div>}

    <div /* style={{marginRight:'10%', marginLeft:'10%', marginTop:'10%'}} */ >
    {/* RIGHT PANEL */}
    {/* RIGHT PANEL 
        <aside className={`right-panel ${rightCollapsed ? "collapsed" : ""}`}>
        
        <button
          className="collapse-btn right"
          onClick={() => setRightCollapsed((v) => !v)}
        >
          {rightCollapsed ? "◀" : "▶"}
        </button>

        {!rightCollapsed && (
          <>
      
            <div className="right-tabs">
                <button
                    className={`tab-btn ${rightTab === "layers" ? "active" : ""}`}
                    onClick={() => setRightTab("layers")}
                >
                    Layers
                </button>

                <button
                    className={`tab-btn ${rightTab === "bg" ? "active" : ""}`}
                    onClick={() => setRightTab("bg")}
                >
                    Background
                </button>
            </div>


          
            <div className="right-panel-content">
              {rightTab === "layers" && (
                <>
                <LayerPanel
                  layers={layers}
                  selectedLayer={selectedLayer}
                  onSelectLayer={setSelectedLayer}
                  onUpdateLayer={handleUpdateLayer}
                  onBgUpload={handleBgUpload}
                  showOverlay={showOverlay}
                  onToggleOverlay={() => setShowOverlay((p) => !p)}
                />
                <LayerPanel
                  layers={layers}
                  selectedLayer={selectedLayer}
                  onSelectLayer={setSelectedLayer}
                  onUpdateLayer={(id, key, val) =>
                    updateLayer(id, { [key]: val })
                  }
                />
                </>
              )}

              {rightTab === "bg" && (
                <BgControls
                  bg={backgroundLayer}
                  onUpload={handleBgUpload}
                  onChange={updateBackground}
                  showOverlay={showOverlay}
                  setShowOverlay={setShowOverlay}
                  overlayScale={overlayScale}
                  setOverlayScale={setOverlayScale}
                  textBgScale={textBgScale}
                  setTextBgScale={setTextBgScale}
                  showTextBg={showTextBg}
                  setShowTextBg={setShowTextBg}
                />
              )}
            </div>
          </>
        )}
      </aside>*/}

      {/* RIGHT PANEL (CONTENT ONLY) */}
      <aside className="right-panel">
        {rightTab === "layers" && (
          <LayerPanel
            layers={layers}
            selectedLayer={selectedLayer}
            onSelectLayer={setSelectedLayer}
            onUpdateLayer={(id, key, val) =>
              updateLayer(id, { [key]: val })
            }
          />
        )}

        {
        /*
        rightTab === "bg" && (
        <BgControls
            bg={backgroundLayer}
            selectedLayer={selectedLayerObj}
            onUploadBg={handleBgUpload}
            onUpdateBg={updateBackground}
            onUpdateLayer={updateLayer}
            showOverlay={showOverlay}
            setShowOverlay={setShowOverlay}
            overlayScale={overlayScale}
            setOverlayScale={setOverlayScale}
        />
        )
        */
        }

        {rightTab === "bg" && (
            <RightBgPanel
                backgroundLayer={backgroundLayer}
                selectedLayer={selectedLayerObj}
                onUploadBackground={handleBgUpload}
                onUpdateBackground={updateBackground}
                onUpdateLayer={updateLayer}
                showOverlay={showOverlay}
                setShowOverlay={setShowOverlay}
                overlayScale={overlayScale}
                setOverlayScale={setOverlayScale}
            />
            )}



      </aside>

    </div>
    </div>

    </div>

    </>
  );
}




