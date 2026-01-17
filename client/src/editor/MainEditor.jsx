// // 2️⃣ src/editor/✅ MainEditor.jsx (React)
// src/editor/MainEditor.jsx

import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import MainHeader from "./components/MainHeader";
import MainSidebar from "./components/MainSidebar";
import Canvas from "./components/Canvas";
// import Properties from "./components/Properties";

import { useEditorStore } from "../store";
import { getDesignById } from "../services/design-service";

import "./editor-layout.css";
import Properties from "./components/Properties";

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

export default function MainEditor({ user }) {
  const { designId } = useParams();
  const navigate = useNavigate();

  const [loadAttempted, setLoadAttempted] = useState(false);
  const [error, setError] = useState(null);

  const {
    canvas,
    setDesignId,
    setName,
    resetStore,
    setShowProperties,
    showProperties,
    isEditing,
  } = useEditorStore();

  /* -----------------------------
     RESET ON ROUTE CHANGE
  ------------------------------*/
  useEffect(() => {
    resetStore();
    setLoadAttempted(false);
    setError(null);

    if (designId === "new") return;

    if (designId && isValidObjectId(designId)) {
      setDesignId(designId);
      return;
    }

    if (!designId) return;

    navigate("/design/dashboard");
  }, [designId]);

  /* -----------------------------
     NEW DESIGN MODE
  ------------------------------*/
  useEffect(() => {
    if (designId === "new") {
      setName("Untitled Design");
      setLoadAttempted(true);
    }
  }, [designId]);

  /* -----------------------------
     LOAD DESIGN
  ------------------------------*/
  const loadDesign = useCallback(async () => {
    if (!canvas || !designId || loadAttempted) return;
    if (designId === "new") return;
    if (!isValidObjectId(designId)) return;

    try {
      setLoadAttempted(true);

      const response = await getDesignById(designId);
      const design = response?.data ?? response;

      if (!design) return;

      setName(design.name);
      setDesignId(designId);

      canvas.clear();

      if (design.width && design.height) {
        canvas.setDimensions({
          width: design.width,
          height: design.height,
        });
      }

      const canvasData =
        typeof design.canvasData === "string"
          ? JSON.parse(design.canvasData)
          : design.canvasData;

      canvas.backgroundColor = canvasData?.background || "#ffffff";

      if (canvasData?.objects?.length) {
        canvas.loadFromJSON(canvasData, () => canvas.requestRenderAll());
      } else {
        canvas.renderAll();
      }
    } catch (e) {
      console.error("Failed to load design", e);
      setError("Failed to load design");
    }
  }, [canvas, designId, loadAttempted]);

  /* -----------------------------
     TRIGGER LOAD WHEN CANVAS READY
  ------------------------------*/
  useEffect(() => {
    if (canvas && designId && !loadAttempted && designId !== "new") {
      loadDesign();
    }
  }, [canvas, designId]);

  /* -----------------------------
     SELECTION LISTENER
  ------------------------------*/
  useEffect(() => {
    if (!canvas) return;

    const handleSelect = () => {
      const obj = canvas.getActiveObject();
      setShowProperties(!!obj);
    };

    canvas.on("selection:created", handleSelect);
    canvas.on("selection:updated", handleSelect);
    canvas.on("selection:cleared", () => setShowProperties(false));

    return () => {
      canvas.off("selection:created", handleSelect);
      canvas.off("selection:updated", handleSelect);
      canvas.off("selection:cleared");
    };
  }, [canvas]);

  /* -----------------------------
     UI
  ------------------------------*/
  return (
    <>
      <div className="editor-root">
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        {/*<Navbar user={user} />*/}
        <MainHeader user={user} />

        <div className="editor-body">
          <div className="editor-left">
            <MainSidebar />
          </div>

          <div className="editor-canvas">
            <Canvas />
          </div>
        </div>
      </div>

      { showProperties && isEditing && <Properties /> }

    </>
  )
}



/*
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEditorStore } from "../store";
import { getDesignById } from "../services/design-service";

import "./editor-layout.css";
import Navbar from "./components/Navbar";
import MainHeader from "./components/MainHeader";
import MainSidebar from "./components/MainSidebar";
import Canvas from "./components/Canvas";

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

export default function MainEditor({ user }) {
  const { designId } = useParams();
  const navigate = useNavigate();

  const [loadAttempted, setLoadAttempted] = useState(false);

  const {
    canvas,
    setDesignId,
    setName,
    resetStore,
    setShowProperties,
    showProperties,
    isEditing,
  } = useEditorStore();

  // Reset store on route change
  useEffect(() => {
    resetStore();
    setLoadAttempted(false);

    // VALID cases
    if (designId === "new") return;
    if (designId && isValidObjectId(designId)) {
      setDesignId(designId);
      return;
    }

    // INVALID route
    if (!designId) return;

    // invalid id
    navigate("/design/dashboard");
  }, [designId]);

  // NEW design mode
  useEffect(() => {
    if (designId === "new") {
      setName("Untitled Design");
      setLoadAttempted(true);
    }
  }, [designId]);

  const loadDesign = useCallback(async () => {
    if (!canvas || !designId || loadAttempted) return;
    if (designId === "new") return;

    if (!isValidObjectId(designId)) return;

    try {
      setLoadAttempted(true);

      const response = await getDesignById(designId);
      const design = response.data ?? response;
      if (!design) return;

      setName(design.name);
      setDesignId(designId);

      canvas.clear();

      if (design.width && design.height) {
        canvas.setDimensions({
          width: design.width,
          height: design.height,
        });
      }

      const data =
        typeof design.canvasData === "string"
          ? JSON.parse(design.canvasData)
          : design.canvasData;

      canvas.backgroundColor = data?.background || "#ffffff";

      if (data?.objects?.length) {
        canvas.loadFromJSON(data, () => canvas.requestRenderAll());
      } else {
        canvas.renderAll();
      }
    } catch (e) {
      console.error("Failed to load design", e);
    }
  }, [canvas, designId, loadAttempted]);

  // Load only after canvas ready
  useEffect(() => {
    if (canvas && designId && !loadAttempted && designId !== "new") {
      loadDesign();
    }
  }, [canvas, designId]);

  // Selection listener
  useEffect(() => {
    if (!canvas) return;

    const onSelect = () => {
      setShowProperties(!!canvas.getActiveObject());
    };

    canvas.on("selection:created", onSelect);
    canvas.on("selection:updated", onSelect);
    canvas.on("selection:cleared", () => setShowProperties(false));

    return () => {
      canvas.off("selection:created", onSelect);
      canvas.off("selection:updated", onSelect);
      canvas.off("selection:cleared");
    };
  }, [canvas]);

  return (
    <div className="editor-root">
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Navbar user={user} />
      <MainHeader user={user} />

      <div className="editor-body">
        <div className="editor-left">
        
          <MainSidebar />
        </div>

        <div className="editor-canvas">
          <Canvas />
        </div>
      </div>
    </div>
  );
}
*/

{/*
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useEditorStore } from "../store";
import { getDesignById } from "../services/design-service";

import "./editor-layout.css";
import Navbar from "./components/Navbar";
import MainHeader from "./components/MainHeader";
import MainSidebar from "./components/MainSidebar";

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

export default function MainEditor({ user }) {
  const { designId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(!!designId && designId !== "new");
  const [loadAttempted, setLoadAttempted] = useState(false);

  const {
    canvas,
    setDesignId,
    setName,
    resetStore,
    setShowProperties,
    showProperties,
    isEditing,
  } = useEditorStore();

  useEffect(() => {
    resetStore();

    if (designId && designId !== "new" && isValidObjectId(designId)) {
        setDesignId(designId);
    }

    return () => resetStore();
  }, [designId]);

  useEffect(() => {
    if (!designId) {
        navigate("/");
        return;
    }

    if (designId === "new") return;

    if (canvas && !loadAttempted) {
        loadDesign();
    }
  }, [canvas, designId]);

useEffect(() => {
    if (designId === "new") {
        setName("Untitled Design");
        setIsLoading(false);
        setLoadAttempted(true);
    }
}, [designId]);


  const loadDesign = useCallback(async () => {
    if (!canvas || !designId || loadAttempted) return;
    if (designId === "new") return;

    if (!isValidObjectId(designId)) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setLoadAttempted(true);

      const response = await getDesignById(designId);
      const design = response.data ?? response;

      if (!design) return setIsLoading(false);

      setName(design.name);
      setDesignId(designId);

      canvas.clear();

      if (design.width && design.height) {
        canvas.setDimensions({
          width: design.width,
          height: design.height,
        });
      }

      const data =
        typeof design.canvasData === "string"
          ? JSON.parse(design.canvasData)
          : design.canvasData;

      canvas.backgroundColor = data?.background || "#ffffff";

      if (data?.objects?.length) {
        canvas.loadFromJSON(data, () => canvas.requestRenderAll());
      } else {
        canvas.renderAll();
      }

    } catch (e) {
      console.error("Failed to load design", e);
    } finally {
      setIsLoading(false);
    }
  }, [canvas, designId, loadAttempted]);

  useEffect(() => {
    if (designId && canvas && !loadAttempted) {
      loadDesign();
    }
    if (!designId) navigate("/");
  }, [canvas, designId]);

  useEffect(() => {
    if (!canvas) return;

    const onSelect = () => {
      const obj = canvas.getActiveObject();
      setShowProperties(!!obj);
    };

    canvas.on("selection:created", onSelect);
    canvas.on("selection:updated", onSelect);
    canvas.on("selection:cleared", () => setShowProperties(false));

    return () => {
      canvas.off("selection:created", onSelect);
      canvas.off("selection:updated", onSelect);
      canvas.off("selection:cleared", () => setShowProperties(false));
    };
  }, [canvas]);

  return (
    <>
      <div className="editor-root">
        <Navbar user={user} />
        <MainHeader user={user} />

        <div className="editor-body">
          <div className="editor-left">
            <MainSidebar />
          </div>

          <div className="editor-canvas">
            Canvas
          </div>
        </div>
      </div>

      {showProperties && isEditing && <Properties />}
    </>
  );
}
*/}