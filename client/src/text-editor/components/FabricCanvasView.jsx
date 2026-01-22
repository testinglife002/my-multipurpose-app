// 📄 src/components/text-editor/FabricCanvasView.jsx
// 📄 src/components/text-editor/FabricCanvasView.jsx
// "use client";

import { useEffect, useRef } from "react";
import {
  Canvas,
  Textbox,
  Image as FabricImage,
  Rect,
  filters,
} from "fabric";
import { applyTextEffect } from "./effects";
import './fabric.css';

/* ─────────────────────────────
   Z-INDEX HELPER (FABRIC v6 SAFE)
───────────────────────────── */
function setZIndex(canvas, obj, zIndex) {
  const list = canvas.getObjects();
  const current = list.indexOf(obj);
  if (current === -1) return;
  const target = Math.max(0, Math.min(zIndex, list.length - 1));
  canvas.moveObjectTo(obj, target);
}

/* ─────────────────────────────
   COMPONENT
───────────────────────────── */
export default function FabricCanvasView({
  layers,
  selectedLayerId,
  onSelectLayer,
  onUpdateLayer,
  overlay,
  width = 1200,
  height = 630,
}) {
  const domRef = useRef(null);          // <canvas>
  const fabricRef = useRef(null);       // fabric.Canvas
  const objectsRef = useRef({});        // layerId → { main, bg? }
  const overlayRef = useRef(null);      // overlay rect
  const wrapperRef = useRef(null);    


  /* ─────────────────────────────
     INIT CANVAS (ONCE)
  ───────────────────────────── */
  useEffect(() => {
    const canvas = new Canvas(domRef.current, {
      width,
      height,
      preserveObjectStacking: true,
      selection: true,
    });

    fabricRef.current = canvas;

    return () => {
      canvas.dispose();
      fabricRef.current = null;
    };
  }, [width, height]);


  /* AUTO RESIZE */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = fabricRef.current;
    if (!wrapper || !canvas) return;

    const resize = () => {
      const w = wrapper.clientWidth;
      const h = wrapper.clientHeight;
      canvas.setWidth(w);
      canvas.setHeight(h);
      canvas.renderAll();
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(wrapper);

    return () => observer.disconnect();
  }, []);


  /* ─────────────────────────────
     GLOBAL OVERLAY (TEXT OVERLAY)
  ───────────────────────────── */
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    if (!overlay?.showOverlay) {
      if (overlayRef.current) {
        canvas.remove(overlayRef.current);
        overlayRef.current = null;
        canvas.renderAll();
      }
      return;
    }

    if (!overlayRef.current) {
      overlayRef.current = new Rect({
        left: 0,
        top: 0,
        width,
        height,
        fill: "rgba(0,0,0,0.25)",
        selectable: false,
        evented: false,
      });
      canvas.add(overlayRef.current);
      canvas.sendObjectToBack(overlayRef.current);
    }

    overlayRef.current.set({
      scaleX: overlay.overlayScale || 1,
      scaleY: overlay.overlayScale || 1,
    });

    canvas.renderAll();
  }, [overlay, width, height]);

  /* ─────────────────────────────
     SYNC LAYERS → CANVAS
  ───────────────────────────── */
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const map = objectsRef.current;
    const activeIds = new Set(layers.map((l) => l.id));

    /* 🧹 REMOVE DELETED LAYERS */
    Object.keys(map).forEach((id) => {
      if (!activeIds.has(id)) {
        if (map[id].bg) canvas.remove(map[id].bg);
        canvas.remove(map[id].main);
        delete map[id];
      }
    });

    layers.forEach((layer) => {
      let entry = map[layer.id];

      /* ───── BACKGROUND / IMAGE ───── */
      if (layer.type === "background" || layer.type === "image") {
        if (!entry && layer.url) {
          FabricImage.fromURL(layer.url).then((img) => {
            img.set({
              left: (layer.x ?? 0) / 100 * width,
              top: (layer.y ?? 0) / 100 * height,
              scaleX: layer.width
                ? layer.width / img.width
                : width / img.width,
              scaleY: layer.height
                ? layer.height / img.height
                : height / img.height,
              opacity: layer.visible === false ? 0 : layer.opacity ?? 1,
              selectable: !layer.locked && layer.type !== "background",
              evented: !layer.locked && layer.type !== "background",
              globalCompositeOperation:
                layer.blendMode || "source-over",
            });

            img.filters = layer.blur
              ? [new filters.Blur({ blur: layer.blur / 100 })]
              : [];

            img.applyFilters();
            img.data = { layerId: layer.id };

            map[layer.id] = { main: img };
            canvas.add(img);
            setZIndex(canvas, img, layer.zIndex);
            canvas.renderAll();
          });
        }

        if (entry) {
          const img = entry.main;
          img.set({
            opacity: layer.visible === false ? 0 : layer.opacity ?? 1,
            selectable: !layer.locked,
            evented: !layer.locked,
            globalCompositeOperation:
              layer.blendMode || "source-over",
          });

          img.filters = layer.blur
            ? [new filters.Blur({ blur: layer.blur / 100 })]
            : [];

          img.applyFilters();
          setZIndex(canvas, img, layer.zIndex);
        }
        return;
      }

      /* ───── TEXT + TEXT BACKGROUND ───── */
      if (!entry) {
        const text = new Textbox(layer.text || "", {
          left: (layer.x / 100) * width,
          top: (layer.y / 100) * height,
          width: layer.width,
          fontSize: layer.fontSize,
          fill: layer.color,
          fontFamily: layer.fontFamily,
          fontWeight: layer.fontWeight,
          selectable: !layer.locked,
          evented: !layer.locked,
        });

        text.data = { layerId: layer.id };

        let bg = null;
        if (layer.showTextBg) {
          bg = new Rect({
            left: text.left - 12,
            top: text.top - 12,
            width: text.width + 24,
            height: text.height + 24,
            rx: 8,
            ry: 8,
            fill: "rgba(0,0,0,0.6)",
            selectable: false,
            evented: false,
          });
          bg.data = { layerId: layer.id };
          canvas.add(bg);
        }

        canvas.add(text);
        map[layer.id] = { main: text, bg };

        applyTextEffect({
          canvas,
          obj: text,
          effect: layer.effect,
          palette: layer.palette,
        });

        setZIndex(canvas, text, layer.zIndex);
        canvas.renderAll();
      } else {
        const { main: text, bg } = entry;

        text.set({
          text: layer.text,
          left: (layer.x / 100) * width,
          top: (layer.y / 100) * height,
          width: layer.width,
          fontSize: layer.fontSize,
          fill: layer.color,
          selectable: !layer.locked,
          evented: !layer.locked,
          opacity: layer.visible === false ? 0 : 1,
        });

        if (layer.showTextBg) {
          if (!bg) {
            entry.bg = new Rect({
              rx: 8,
              ry: 8,
              fill: "rgba(0,0,0,0.6)",
              selectable: false,
              evented: false,
            });
            canvas.add(entry.bg);
          }

          entry.bg.set({
            left: text.left - 12,
            top: text.top - 12,
            width: text.width + 24,
            height: text.height + 24,
            opacity: layer.visible === false ? 0 : 1,
          });

          setZIndex(canvas, entry.bg, layer.zIndex - 0.5);
        } else if (bg) {
          canvas.remove(bg);
          entry.bg = null;
        }

        applyTextEffect({
          canvas,
          obj: text,
          effect: layer.effect,
          palette: layer.palette,
        });

        setZIndex(canvas, text, layer.zIndex);
      }
    });

    canvas.renderAll();
  }, [layers, width, height]);

  /* ─────────────────────────────
     FABRIC → REACT (MOVE / SCALE)
  ───────────────────────────── */
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const sync = (e) => {
      const obj = e.target;
      const id = obj?.data?.layerId;
      if (!id) return;

      onUpdateLayer(id, "x", (obj.left / width) * 100);
      onUpdateLayer(id, "y", (obj.top / height) * 100);
      onUpdateLayer(id, "width", obj.width * obj.scaleX);
      onUpdateLayer(id, "height", obj.height * obj.scaleY);

      obj.set({ scaleX: 1, scaleY: 1 });
      obj.setCoords();
    };

    canvas.on("object:moved", sync);
    canvas.on("object:scaled", sync);
    canvas.on("object:modified", sync);

    return () => {
      canvas.off("object:moved", sync);
      canvas.off("object:scaled", sync);
      canvas.off("object:modified", sync);
    };
  }, [onUpdateLayer, width, height]);

  /* ─────────────────────────────
     SELECTION → LAYER PANEL
  ───────────────────────────── */
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const select = (e) => {
      const obj = e.selected?.[0];
      onSelectLayer(obj?.data?.layerId ?? null);
    };

    canvas.on("selection:created", select);
    canvas.on("selection:updated", select);
    canvas.on("selection:cleared", () => onSelectLayer(null));

    return () => {
      canvas.off("selection:created", select);
      canvas.off("selection:updated", select);
    };
  }, [onSelectLayer]);

  /* ─────────────────────────────
     SIDEBAR → CANVAS
  ───────────────────────────── */
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const entry = objectsRef.current[selectedLayerId];
    if (entry?.main) canvas.setActiveObject(entry.main);
    else canvas.discardActiveObject();

    canvas.renderAll();
  }, [selectedLayerId]);

  return (
    <div className="fabric-wrapper" ref={wrapperRef}>
    {/*<div className="fabric-canvas-wrapper">*/}
      <canvas ref={domRef} />
    {/*</div>*/}
    </div>
  );
}
