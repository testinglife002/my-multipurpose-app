// CollaborativeCanvas.jsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import "./collaborative-canvas.css";

const CollaborativeCanvas = ({ isDarkMode }) => {
  const containerRef = useRef(null);
  const canvasRefs = useRef({});
  
  // UI State
  const [isLayerPanelVisible, setIsLayerPanelVisible] = useState(true);
  
  // Tool State
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#6366f1');
  const [fillColor, setFillColor] = useState('transparent');
  const [isFilled, setIsFilled] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [opacity, setOpacity] = useState(1);
  const [brushTip, setBrushTip] = useState('round');
  const [strokeStyle, setStrokeStyle] = useState('solid');
  
  // Text Config
  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontSize, setFontSize] = useState(32);
  const [textAlign, setTextAlign] = useState('left');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  
  // Precision
  const [showGrid, setShowGrid] = useState(false);
  const [gridSize, setGridSize] = useState(40);
  const [snapToGrid, setSnapToGrid] = useState(false);
  
  // Shapes
  const [polygonSides, setPolygonSides] = useState(5);
  const [starPoints, setStarPoints] = useState(5);
  
  // Text/Element Management
  const [textInput, setTextInput] = useState(null);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const textInputRef = useRef(null);

  // Drawing State
  const [startPoint, setStartPoint] = useState(null);
  const [snapshot, setSnapshot] = useState(null);

  // Layer System
  const [layers, setLayers] = useState([
    { id: 'l1', name: 'Background', visible: true, locked: false, blendMode: 'normal', type: 'pixel', elements: [] },
    { id: 'l2', name: 'Artwork', visible: true, locked: false, blendMode: 'normal', type: 'pixel', elements: [] },
    { id: 'l3', name: 'Typography', visible: true, locked: false, blendMode: 'normal', type: 'text', elements: [] }
  ]);
  const [activeLayerId, setActiveLayerId] = useState('l2');

  const redrawTextLayer = useCallback((layer) => {
    const canvas = canvasRefs.current[layer.id];
    if (!canvas || layer.type !== 'text') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    layer.elements.forEach(el => {
      const fontStyle = `${el.isItalic ? 'italic ' : ''}${el.isBold ? 'bold ' : ''}`;
      ctx.font = `${fontStyle}${el.fontSize}px ${el.fontFamily}`;
      ctx.textAlign = el.textAlign;
      ctx.fillStyle = el.color;
      ctx.fillText(el.text, el.x, el.y);
      
      if (selectedElementId === el.id) {
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        const metrics = ctx.measureText(el.text);
        const width = metrics.width;
        const height = el.fontSize;
        let startX = el.x;
        if (el.textAlign === 'center') startX -= width / 2;
        else if (el.textAlign === 'right') startX -= width;
        ctx.strokeRect(startX - 10, el.y - height + 5, width + 20, height + 10);
      }
    });
  }, [selectedElementId]);

  useEffect(() => {
    layers.filter(l => l.type === 'text').forEach(redrawTextLayer);
  }, [layers, redrawTextLayer]);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      Object.entries(canvasRefs.current).forEach(([id, canvas]) => {
        if (canvas) {
          const ctx = canvas.getContext('2d');
          const currentLayer = layers.find(l => l.id === id);
          if (currentLayer && currentLayer.type === 'pixel') {
             const temp = ctx?.getImageData(0, 0, canvas.width, canvas.height);
             canvas.width = clientWidth;
             canvas.height = clientHeight;
             if (temp) ctx?.putImageData(temp, 0, 0);
          } else {
             canvas.width = clientWidth;
             canvas.height = clientHeight;
          }
        }
      });
      layers.filter(l => l.type === 'text').forEach(redrawTextLayer);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [layers, redrawTextLayer]);

  const getCoordinates = (e) => {
    const activeCanvas = canvasRefs.current[activeLayerId];
    if (!activeCanvas) return { x: 0, y: 0 };
    const rect = activeCanvas.getBoundingClientRect();
    let x = 0, y = 0;
    if (e.touches) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    if (snapToGrid) {
      x = Math.round(x / gridSize) * gridSize;
      y = Math.round(y / gridSize) * gridSize;
    }
    return { x, y };
  };

  const setupContext = (ctx) => {
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = tool === 'eraser' ? (isDarkMode ? '#030712' : '#ffffff') : color;
    ctx.lineWidth = brushSize;
    if (strokeStyle === 'dashed') ctx.setLineDash([15, 10]);
    else if (strokeStyle === 'dotted') ctx.setLineDash([2, 10]);
    else ctx.setLineDash([]);
    ctx.fillStyle = isFilled ? fillColor : 'transparent';
    ctx.lineCap = brushTip === 'square' ? 'square' : 'round';
    ctx.lineJoin = 'round';
  };

  const startDrawing = (e) => {
    const activeLayer = layers.find(l => l.id === activeLayerId);
    if (!activeLayer || activeLayer.locked || !activeLayer.visible) return;

    const point = getCoordinates(e);

    if (tool === 'select') {
      const textLayer = layers.find(l => l.id === activeLayerId && l.type === 'text');
      if (textLayer) {
        const found = [...textLayer.elements].reverse().find(el => {
          const dist = Math.sqrt((el.x - point.x) ** 2 + (el.y - point.y) ** 2);
          return dist < el.fontSize;
        });
        setSelectedElementId(found?.id || null);
        if (found) {
          setIsDrawing(true);
          setStartPoint(point);
        }
      }
      return;
    }

    if (tool === 'text') {
      if (activeLayer.type !== 'text') {
        const newLayer = { id: 'l-text-' + Date.now(), name: 'New Text Layer', visible: true, locked: false, blendMode: 'normal', type: 'text', elements: [] };
        setLayers([...layers, newLayer]);
        setActiveLayerId(newLayer.id);
      }
      setTextInput({ x: point.x, y: point.y, value: '' });
      setTimeout(() => textInputRef.current?.focus(), 10);
      return;
    }

    if (activeLayer.type === 'pixel') {
      const activeCanvas = canvasRefs.current[activeLayerId];
      if (!activeCanvas) return;
      const ctx = activeCanvas.getContext('2d');
      if (!ctx) return;
      setStartPoint(point);
      setSnapshot(ctx.getImageData(0, 0, activeCanvas.width, activeCanvas.height));
      setupContext(ctx);
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      setIsDrawing(true);
    }
  };

  const draw = (e) => {
    if (!isDrawing || !startPoint) return;
    const currentPoint = getCoordinates(e);

    if (tool === 'select' && selectedElementId) {
      const dx = currentPoint.x - startPoint.x;
      const dy = currentPoint.y - startPoint.y;
      setLayers(prev => prev.map(l => l.id === activeLayerId ? {
        ...l,
        elements: l.elements.map(el => el.id === selectedElementId ? { ...el, x: el.x + dx, y: el.y + dy } : el)
      } : l));
      setStartPoint(currentPoint);
      return;
    }

    const activeCanvas = canvasRefs.current[activeLayerId];
    if (!activeCanvas) return;
    const ctx = activeCanvas.getContext('2d');
    if (!ctx || !snapshot) return;

    if (tool === 'pen' || tool === 'eraser') {
      ctx.lineTo(currentPoint.x, currentPoint.y);
      ctx.stroke();
    } else {
      ctx.putImageData(snapshot, 0, 0);
      setupContext(ctx);
      const dx = currentPoint.x - startPoint.x;
      const dy = currentPoint.y - startPoint.y;
      const radius = Math.sqrt(dx * dx + dy * dy);

      ctx.beginPath();
      if (tool === 'rect') ctx.rect(startPoint.x, startPoint.y, dx, dy);
      else if (tool === 'circle') ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
      else if (tool === 'polygon') {
        for (let i = 0; i < polygonSides; i++) {
          const angle = (i * 2 * Math.PI) / polygonSides - Math.PI / 2;
          const x = startPoint.x + radius * Math.cos(angle);
          const y = startPoint.y + radius * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
      } else if (tool === 'star') {
        let rot = Math.PI / 2 * 3;
        let step = Math.PI / starPoints;
        ctx.moveTo(startPoint.x, startPoint.y - radius);
        for (let i = 0; i < starPoints; i++) {
          ctx.lineTo(startPoint.x + Math.cos(rot) * radius, startPoint.y + Math.sin(rot) * radius);
          rot += step;
          ctx.lineTo(startPoint.x + Math.cos(rot) * (radius / 2.5), startPoint.y + Math.sin(rot) * (radius / 2.5));
          rot += step;
        }
        ctx.closePath();
      }
      if (isFilled && fillColor !== 'transparent') ctx.fill();
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setSnapshot(null);
    setStartPoint(null);
  };

  const handleTextSubmit = (e) => {
    if (e.key === 'Enter' && textInput) {
      const newEl = {
        id: 'txt-' + Date.now(),
        text: textInput.value,
        x: textInput.x,
        y: textInput.y,
        fontSize,
        fontFamily,
        color,
        textAlign,
        isBold,
        isItalic
      };
      setLayers(prev => prev.map(l => l.id === activeLayerId ? { ...l, elements: [...l.elements, newEl] } : l));
      setTextInput(null);
    } else if (e.key === 'Escape') {
      setTextInput(null);
    }
  };

  const createNewLayer = (type = 'pixel') => {
    const newLayer = { 
      id: 'l' + Date.now(), 
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Layer`, 
      visible: true, 
      locked: false, 
      blendMode: 'normal', 
      type, 
      elements: [] 
    };
    setLayers([...layers, newLayer]);
    setActiveLayerId(newLayer.id);
  };

  const handleExport = () => {
    const container = containerRef.current;
    if (!container) return;
    
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = container.clientWidth;
    exportCanvas.height = container.clientHeight;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    if (isDarkMode) {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    }

    layers.forEach(layer => {
      if (!layer.visible) return;
      const layerCanvas = canvasRefs.current[layer.id];
      if (!layerCanvas) return;

      ctx.globalCompositeOperation = layer.blendMode;
      ctx.drawImage(layerCanvas, 0, 0);
    });

    ctx.globalCompositeOperation = 'source-over';

    const link = document.createElement('a');
    link.download = `whiteboard-export-${Date.now()}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  };

  const blendingModes = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'difference', 'exclusion'];


  return (
    <div
      ref={containerRef}
      className={`canvas-root ${isDarkMode ? "dark" : ""}`}
    >
      {showGrid && (
        <div
          className="canvas-grid"
          style={{
            backgroundImage: `radial-gradient(${
              isDarkMode
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.06)"
            } 1px, transparent 1px)`,
            backgroundSize: `${gridSize}px ${gridSize}px`,
          }}
        />
      )}

      {/* TOOLBOX */}
      <div className={`toolbox ${isDarkMode ? "dark" : ""}`}>
        {[
          { id: "select", icon: "🏹" },
          { id: "pen", icon: "✏️" },
          { id: "rect", icon: "⬜" },
          { id: "circle", icon: "⭕" },
          { id: "polygon", icon: "⬡" },
          { id: "star", icon: "⭐" },
          { id: "text", icon: "T" },
          { id: "eraser", icon: "🧽" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTool(t.id)}
            className={`tool-btn ${tool === t.id ? "active" : ""}`}
          >
            {t.icon}
          </button>
        ))}
      </div>

      {/* TOP BAR */}
      <div className={`topbar ${isDarkMode ? "dark" : ""}`}>
        <div className="topbar-left">
          <button
            className={`icon-btn ${isLayerPanelVisible ? "active" : ""}`}
            onClick={() => setIsLayerPanelVisible(!isLayerPanelVisible)}
          >
            🥞
          </button>
          <button className="icon-btn" onClick={handleExport}>
            💾
          </button>
        </div>

        <div className="color-palette">
          {["#6366f1", "#f43f5e", "#10b981", "#f59e0b", "#000", "#fff"].map(
            (c) => (
              <button
                key={c}
                className={`color-dot ${
                  color === c ? "selected" : ""
                }`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            )
          )}
        </div>
      </div>

      {/* CANVAS STACK */}
      <div className="canvas-stage">
        {layers.map((layer) => (
          <canvas
            key={layer.id}
            ref={(el) => (canvasRefs.current[layer.id] = el)}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className={`drawing-canvas ${
              activeLayerId === layer.id ? "active" : ""
            }`}
            style={{
              display: layer.visible ? "block" : "none",
              mixBlendMode: layer.blendMode,
              pointerEvents:
                activeLayerId === layer.id ? "auto" : "none",
            }}
          />
        ))}
      </div>

      {/* LAYERS PANEL */}
      {isLayerPanelVisible && (
        <div className={`layers-panel ${isDarkMode ? "dark" : ""}`}>
          <h4>Layers</h4>
          <div className="layers-list">
            {[...layers].reverse().map((l) => (
              <div
                key={l.id}
                className={`layer-item ${
                  activeLayerId === l.id ? "active" : ""
                }`}
                onClick={() => setActiveLayerId(l.id)}
              >
                <span>{l.name}</span>
                <div className="layer-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLayers((p) =>
                        p.map((x) =>
                          x.id === l.id
                            ? { ...x, visible: !x.visible }
                            : x
                        )
                      );
                    }}
                  >
                    {l.visible ? "👁️" : "🕶️"}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLayers((p) => p.filter((x) => x.id !== l.id));
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STATUS BAR */}
      <div className={`status-bar ${isDarkMode ? "dark" : ""}`}>
        <span className="live-dot" />
        <span>Workspace Live</span>
        <span>Tool: {tool.toUpperCase()}</span>
      </div>
    </div>
  );
};

export default CollaborativeCanvas;
