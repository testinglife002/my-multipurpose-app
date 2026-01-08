// src/lib/fabricEffects.js
import * as fabric from "fabric";

/* -----------------------------
   Helpers
----------------------------- */
const getActive = (canvas) => canvas?.getActiveObject();

/* -----------------------------
   FILTER HELPERS
----------------------------- */
const applyFilter = (canvas, filter, replace = false) => {
  const obj = canvas?.getActiveObject();
  if (!obj || obj.type !== "image") return;

  obj.filters ||= [];

  if (replace) {
    obj.filters = [filter];
  } else {
    obj.filters.push(filter);
  }

  obj.applyFilters(() => {
    canvas.renderAll(); // 🔥 REQUIRED
  });
};


export const clearFilters = (canvas) => {
  const obj = getActive(canvas);
  if (!obj) return;

  obj.filters = [];
  obj.applyFilters();
  canvas.requestRenderAll();
};

/* -----------------------------
   COLOR FILTERS
----------------------------- */
export const grayscale = (canvas) =>
  applyFilter(canvas, new fabric.filters.Grayscale(), true);

export const sepia = (canvas) =>
  applyFilter(canvas, new fabric.filters.Sepia(), true);

export const invert = (canvas) =>
  applyFilter(canvas, new fabric.filters.Invert(), true);

/* -----------------------------
   BLUR / PIXELATE
----------------------------- */
export const blur = (canvas, value = 0.3) =>
  applyFilter(canvas, new fabric.filters.Blur({ blur: value }), true);

export const pixelate = (canvas, value = 8) =>
  applyFilter(
    canvas,
    new fabric.filters.Pixelate({ blocksize: value }),
    true
  );

/* -----------------------------
   SHADOW
----------------------------- */
export const dropShadow = (canvas) => {
  const obj = getActive(canvas);
  if (!obj) return;

  obj.set(
    "shadow",
    new fabric.Shadow({
      color: "rgba(0,0,0,0.35)",
      blur: 25,
      offsetX: 10,
      offsetY: 10,
    })
  );
  canvas.requestRenderAll();
};

export const removeDropShadow = (canvas) => {
  const obj = getActive(canvas);
  if (!obj) return;

  obj.set("shadow", null);
  canvas.requestRenderAll();
};

/* -----------------------------
   UPSCALE
----------------------------- */
export const upscaleImage = (canvas, factor = 1.3) => {
  const obj = getActive(canvas);
  if (!obj) return;

  obj.scaleX *= factor;
  obj.scaleY *= factor;

  canvas.requestRenderAll();
};

/* -----------------------------
   SMART CROP (NON-DESTRUCTIVE)
----------------------------- */
export const smartCrop = (canvas) => {
  const obj = getActive(canvas);
  if (!obj || obj.type !== "image") return;

  const cropRect = new fabric.Rect({
    width: obj.width * 0.7,
    height: obj.height * 0.7,
    left: obj.width * 0.15,
    top: obj.height * 0.15,
    absolutePositioned: true,
  });

  obj.set("clipPath", cropRect);
  canvas.requestRenderAll();
};

export const resetCrop = (canvas) => {
  const obj = getActive(canvas);
  if (!obj) return;

  obj.set("clipPath", null);
  canvas.requestRenderAll();
};

/* -----------------------------
   TRANSFORMS
----------------------------- */
export const flipH = (canvas) => {
  const obj = getActive(canvas);
  if (!obj) return;
  obj.toggle("flipX");
  canvas.requestRenderAll();
};

export const flipV = (canvas) => {
  const obj = getActive(canvas);
  if (!obj) return;
  obj.toggle("flipY");
  canvas.requestRenderAll();
};

export const rotate = (canvas, angle) => {
  const obj = getActive(canvas);
  if (!obj) return;
  obj.set("angle", angle);
  canvas.requestRenderAll();
};

export const opacity = (canvas, value) => {
  const obj = getActive(canvas);
  if (!obj) return;
  obj.set("opacity", value);
  canvas.requestRenderAll();
};

/* -----------------------------
   RESET ALL
----------------------------- */
export const resetAll = (canvas) => {
  const obj = getActive(canvas);
  if (!obj) return;

  obj.set({
    opacity: 1,
    angle: 0,
    flipX: false,
    flipY: false,
    shadow: null,
    clipPath: null,
  });

  obj.filters = [];
  obj.applyFilters();
  canvas.requestRenderAll();
};
