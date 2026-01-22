import { useEffect, useRef } from "react";
import { Canvas, Textbox, Image as FabricImage, Rect, filters } from "fabric";
import { applyTextEffect } from "./effects";
import "./fabric.css";

function setZIndex(canvas, obj, z) {
  const list = canvas.getObjects();
  const i = list.indexOf(obj);
  if (i !== -1) canvas.moveObjectTo(obj, Math.max(0, Math.min(z, list.length-1)));
}

export default function FabricViewCanvas({
  layers,
  selectedLayerId,
  onSelectLayer,
  onUpdateLayer,
  overlay,
}) {
  const domRef = useRef(null);
  const wrapperRef = useRef(null);
  const fabricRef = useRef(null);
  const objectsRef = useRef({});
  const overlayRef = useRef(null);

  /* INIT */
  useEffect(() => {
    const canvas = new Canvas(domRef.current, {
      preserveObjectStacking: true,
      selection: true,
    });
    fabricRef.current = canvas;
    return () => canvas.dispose();
  }, []);

  /* AUTO RESIZE */
  useEffect(() => {
    const canvas = fabricRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper || !window.ResizeObserver) return;

    const resize = () => {
      canvas.setWidth(wrapper.clientWidth);
      canvas.setHeight(wrapper.clientHeight);
      canvas.renderAll();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, []);

  /* OVERLAY */
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

    const w = canvas.getWidth();
    const h = canvas.getHeight();

    if (!overlayRef.current) {
      overlayRef.current = new Rect({
        left: 0,
        top: 0,
        width: w,
        height: h,
        fill: "rgba(0,0,0,0.25)",
        selectable: false,
        evented: false,
      });
      canvas.add(overlayRef.current);
      canvas.sendObjectToBack(overlayRef.current);
    }

    overlayRef.current.set({ width: w, height: h });
    canvas.renderAll();
  }, [overlay]);

  /* SYNC LAYERS */
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const w = canvas.getWidth();
    const h = canvas.getHeight();
    const map = objectsRef.current;

    const active = new Set(layers.map(l => l.id));

    Object.keys(map).forEach(id => {
      if (!active.has(id)) {
        if (map[id].bg) canvas.remove(map[id].bg);
        canvas.remove(map[id].main);
        delete map[id];
      }
    });

    layers.forEach(layer => {
      let entry = map[layer.id];

      if (layer.type === "image" || layer.type === "background") {
        if (!entry && layer.url) {
          FabricImage.fromURL(layer.url).then(img => {
            img.set({
              left: (layer.x ?? 0) / 100 * w,
              top: (layer.y ?? 0) / 100 * h,
              scaleX: layer.width / img.width,
              scaleY: layer.height / img.height,
            });
            img.data = { layerId: layer.id };
            map[layer.id] = { main: img };
            canvas.add(img);
            setZIndex(canvas, img, layer.zIndex);
            canvas.renderAll();
          });
        }
        return;
      }

      if (!entry) {
        const text = new Textbox(layer.text || "", {
          left: (layer.x / 100) * w,
          top: (layer.y / 100) * h,
          width: layer.width,
          fontSize: layer.fontSize,
          fill: layer.color,
        });
        text.data = { layerId: layer.id };
        canvas.add(text);
        map[layer.id] = { main: text };
      } else {
        entry.main.set({
          text: layer.text,
          left: (layer.x / 100) * w,
          top: (layer.y / 100) * h,
          width: layer.width,
          fontSize: layer.fontSize,
          fill: layer.color,
        });
      }
    });

    canvas.renderAll();
  }, [layers]);

  /* MOVE */
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const sync = e => {
      const obj = e.target;
      const id = obj?.data?.layerId;
      if (!id) return;

      const w = canvas.getWidth();
      const h = canvas.getHeight();

      onUpdateLayer(id, "x", (obj.left / w) * 100);
      onUpdateLayer(id, "y", (obj.top / h) * 100);
    };

    canvas.on("object:modified", sync);
    return () => canvas.off("object:modified", sync);
  }, [onUpdateLayer]);

  /* SELECTION */
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const select = e =>
      onSelectLayer(e.selected?.[0]?.data?.layerId ?? null);

    canvas.on("selection:created", select);
    canvas.on("selection:updated", select);
    canvas.on("selection:cleared", () => onSelectLayer(null));

    return () => {
      canvas.off("selection:created", select);
      canvas.off("selection:updated", select);
    };
  }, [onSelectLayer]);

  /* ACTIVE */
  useEffect(() => {
    const canvas = fabricRef.current;
    const entry = objectsRef.current[selectedLayerId];
    if (entry?.main) canvas.setActiveObject(entry.main);
    else canvas.discardActiveObject();
    canvas.renderAll();
  }, [selectedLayerId]);

  return (
    <div className="fabric-wrapper" ref={wrapperRef}>
      <canvas ref={domRef} />
    </div>
  );
}
