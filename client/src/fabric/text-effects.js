// text-effects.js
import { fabric } from "fabric";
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
    gradientUnits: "percentage",
    coords: { x1: 0, y1: 0, x2: 1, y2: 0 },
    colorStops: options.colors || [
      { offset: 0, color: "red" },
      { offset: 1, color: "blue" },
    ],
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



export const apply3DText = (canvas, textObj, options) => {
  const depth = options.depth || 5;
  const color = options.color || "#333";

  if (!textObj.metadata._3dClones) {
    textObj.metadata._3dClones = [];
  }

  for (let i = 1; i <= depth; i++) {
    const clone = fabric.util.object.clone(textObj);

    clone.set({
      left: textObj.left + i,
      top: textObj.top + i,
      fill: color,
      selectable: false,
      evented: false,
    });

    textObj.metadata._3dClones.push(clone);
    canvas.add(clone);
    canvas.sendToBack(clone);
  }
};



export const toggleTextEffect = (canvas, name, options = {}) => {
  const text = getSelectedTextObject(canvas);
  if (!text) return;

  const effects = text.metadata?.effects || [];
  const exists = effects.find(e => e.name === name);

  if (exists) {
    removeTextEffect(text, name);
  } else {
    registerTextEffect(text, name, options);
  }

  applyTextEffects(canvas, text);
};


