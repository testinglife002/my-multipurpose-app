// text-effects.js
import * as fabric from "fabric";

import {
  getSelectedTextObject,
  registerTextEffect,
  removeTextEffect,
  applyTextEffects,
} from "./fabric-utils";



export const toggleTextShadow = (canvas, options) => {
  const text = getSelectedTextObject(canvas);
  if (!text) return;

  registerTextEffect(text, "shadow", {
    color: "rgba(0,0,0,0.5)",
    blur: 10,
    offsetX: 4,
    offsetY: 4,
    ...options,
  });

  applyTextEffects(canvas, text);
};

export const toggleTextStroke = (canvas, options) => {
  const text = getSelectedTextObject(canvas);
  if (!text) return;

  registerTextEffect(text, "stroke", {
    color: "#000",
    width: 2,
    ...options,
  });

  applyTextEffects(canvas, text);
};


export const applyGradientFill = (textObj, options) => {
  const gradient = new fabric.Gradient({
    type: "linear",
    coords: {
      x1: 0,
      y1: 0,
      x2: textObj.width,
      y2: 0,
    },
    colorStops: (options.colors || ["red", "blue"]).map((c, i, arr) => ({
      offset: i / (arr.length - 1),
      color: c,
    })),
  });

  textObj.set("fill", gradient);
};



export const applyGlow = (textObj, options) => {
  textObj.set({
    shadow: {
      color: options.color || "#00ffff",
      blur: options.blur || 20,
      offsetX: 0,
      offsetY: 0,
    },
  });
};


export const applyNeon = (textObj, options) => {
  textObj.set({
    fill: options.color || "#00ffff",
    shadow: {
      color: options.color || "#00ffff",
      blur: 25,
      offsetX: 0,
      offsetY: 0,
    },
  });
};


/* ---------------- DEPTH EFFECTS ---------------- */

export const apply3DText = async (canvas, textObj, options) => {
  const depth = options.depth || 5;
  const color = options.color || "#333";

  if (!textObj.metadata) textObj.metadata = {};
  textObj.metadata._effectClones = [];

  const baseIndex = canvas.getObjects().indexOf(textObj);

  for (let i = 1; i <= depth; i++) {
    const clone = fabric.util.object.clone(textObj);

    clone.set({
      left: textObj.left + i,
      top: textObj.top + i,
      fill: color,
      selectable: false,
      evented: false,
      objectCaching: false,
      shadow: null,
      stroke: null,
    });

    canvas.add(clone);
    canvas.moveTo(clone, baseIndex);

    textObj.metadata._effectClones.push(clone);
  }

  canvas.bringToFront(textObj);
};

export const applyLongShadow = (canvas, textObj, options) => {
  const depth = options.depth || 20;
  const color = options.color || "rgba(0,0,0,0.3)";

  if (!textObj.metadata._effectClones)
    textObj.metadata._effectClones = [];

  for (let i = 1; i <= depth; i++) {
    const clone = fabric.util.object.clone(textObj);

    clone.set({
      left: textObj.left + i,
      top: textObj.top + i,
      fill: color,
      selectable: false,
      evented: false,
    });

    canvas.add(clone);
    canvas.moveTo(clone, canvas.getObjects().indexOf(textObj));

    textObj.metadata._effectClones.push(clone);
  }
};

export const applyIsometricText = (canvas, textObj, options) => {
  const depth = options.depth || 10;
  const color = options.color || "#555";

  if (!textObj.metadata._effectClones)
    textObj.metadata._effectClones = [];

  for (let i = 1; i <= depth; i++) {
    const clone = fabric.util.object.clone(textObj);

    clone.set({
      left: textObj.left + i,
      top: textObj.top - i,
      fill: color,
      skewX: -20,
      selectable: false,
      evented: false,
    });

    canvas.add(clone);
    canvas.moveTo(clone, canvas.getObjects().indexOf(textObj));

    textObj.metadata._effectClones.push(clone);
  }
};

/* ---------------- TRANSFORM EFFECTS ---------------- */

export const applyPerspective = (textObj) => {
  textObj.set({
    skewX: -25,
    skewY: 5,
  });
};

export const applyGlassText = (textObj) => {
  textObj.set({
    opacity: 0.85,
    shadow: {
      color: "rgba(255,255,255,0.6)",
      blur: 10,
      offsetX: -2,
      offsetY: -2,
    },
  });
};

/* ---------------- OPTIONAL ANIMATION ---------------- */

export const animate3D = (canvas, textObj) => {
  let step = 1;
  setInterval(() => {
    step = (step % 10) + 1;
    apply3DText(canvas, textObj, { depth: step });
    canvas.requestRenderAll();
  }, 200);
};

/* ---------------- TOGGLE HANDLER ---------------- */

export const toggleTextEffect = async (canvas, name, options = {}) => {
  const text = getSelectedTextObject(canvas);
  if (!text) return;

  const effects = text.metadata?.effects || [];
  const exists = effects.find(e => e.name === name);

  if (exists) {
    removeTextEffect(text, name);
  } else {
    registerTextEffect(text, name, options);
  }

  await applyTextEffects(canvas, text);
};

