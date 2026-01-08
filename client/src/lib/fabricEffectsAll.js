// 📁 src/lib/fabricEffectsAll.js
import { fabric } from "fabric";

const active = (canvas) => canvas?.getActiveObject();

/* -------- FILTER HELPERS -------- */
const applyFilter = (canvas, filter) => {
  const obj = active(canvas);
  if (!obj || !obj.filters) return;

  obj.filters.push(filter);
  obj.applyFilters();
  canvas.requestRenderAll();
};

export const clearFilters = (canvas) => {
  const obj = active(canvas);
  if (!obj) return;

  obj.filters = [];
  obj.applyFilters();
  canvas.requestRenderAll();
};

/* -------- COLOR -------- */
export const grayscale = (c) =>
  applyFilter(c, new fabric.Image.filters.Grayscale());

export const sepia = (c) =>
  applyFilter(c, new fabric.Image.filters.Sepia());

export const invert = (c) =>
  applyFilter(c, new fabric.Image.filters.Invert());

/* -------- EFFECTS -------- */
export const blur = (c, v = 0.3) =>
  applyFilter(c, new fabric.Image.filters.Blur({ blur: v }));

export const pixelate = (c, v = 8) =>
  applyFilter(c, new fabric.Image.filters.Pixelate({ blocksize: v }));

export const dropShadow = (c) => {
  const o = active(c);
  if (!o) return;

  o.set(
    "shadow",
    new fabric.Shadow({
      color: "rgba(0,0,0,0.35)",
      blur: 25,
      offsetX: 10,
      offsetY: 10,
    })
  );
  c.requestRenderAll();
};

/* -------- TRANSFORMS -------- */
export const flipH = (c) => {
  const o = active(c);
  if (!o) return;
  o.toggle("flipX");
  c.requestRenderAll();
};

export const flipV = (c) => {
  const o = active(c);
  if (!o) return;
  o.toggle("flipY");
  c.requestRenderAll();
};

export const rotate = (c, angle) => {
  const o = active(c);
  if (!o) return;
  o.set("angle", angle);
  c.requestRenderAll();
};

export const opacity = (c, value) => {
  const o = active(c);
  if (!o) return;
  o.set("opacity", value);
  c.requestRenderAll();
};

/* -------- RESET -------- */
export const resetAll = (c) => {
  const o = active(c);
  if (!o) return;

  o.set({
    opacity: 1,
    angle: 0,
    flipX: false,
    flipY: false,
    shadow: null,
  });

  o.filters = [];
  o.applyFilters();
  c.requestRenderAll();
};
