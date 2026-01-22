// fabric-utils.js
import { shapeDefinitions } from "./shapes/shape-definitions";
import { createShape } from "./shapes/shape-factory";
import { apply3DText, applyGlassText, applyGlow, applyGradientFill, applyIsometricText, applyLongShadow, applyNeon, applyPerspective } from "./text-effects";




export const initializeFabric = async (canvasEl, containerEl) => {
  try {
    // const { Canvas, PencilBrush } = await import("fabric");
    // const { Canvas, PencilBrush, fabric } = fabricModule;
    const fabricModule = await import("fabric");
    const { Canvas, PencilBrush } = fabricModule;
    const fabric = fabricModule;

    // 🔥 ENABLE METADATA SERIALIZATION
    fabric.Object.prototype.toObject = (function (toObject) {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          metadata: this.metadata || null,
        });
      };
    })(fabric.Object.prototype.toObject);

    const canvas = new Canvas(canvasEl, {
      preserveObjectStacking: true,
      isDrawingMode: false,
      renderOnAddRemove: true,
    });

    //drawing init
    const brush = new PencilBrush(canvas);
    brush.color = "#000000";
    brush.width = 5;
    brush.opacity = 1;
    brush.pathCaching = false;
    canvas.freeDrawingBrush = brush;
    canvas.renderAll();
    return canvas;
  } catch (e) {
    console.error("Failed to load fabric", e);
    return null;
  }
};


export const resizeCanvas = () => {
  if (!fabricCanvasRef.current || !canvasContainerRef.current) return;

  const container = canvasContainerRef.current;

  const width = container.clientWidth * 0.95;
  const height = container.clientHeight * 0.95;

  fabricCanvasRef.current.setDimensions({
    width,
    height,
  });

  fabricCanvasRef.current.renderAll();
};



export const centerCanvas = (canvas) => {
  if (!canvas || !canvas.wrapperEl) return;

  const canvasWrapper = canvas.wrapperEl;

  canvasWrapper.style.width = `${canvas.width}px`;
  canvasWrapper.style.height = `${canvas.height}px`;

  canvasWrapper.style.position = "absolute";
  canvasWrapper.style.top = "50%";
  canvasWrapper.style.left = "50%";
  canvasWrapper.style.transform = "translate(-50%, -50%)";
};

export const addShapeToCanvas = async (canvas, shapeType, customProps = {}) => {
  if (!canvas) return null;
  try {
    const fabricModule = await import("fabric");

    const shape = createShape(fabricModule, shapeType, shapeDefinitions, {
      left: 100,
      top: 100,
      ...customProps,
    });

    if (shape) {
      shape.id = `${shapeType}-${Date.now()}`;
      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.renderAll();
      return shape;
    }
  } catch (e) {}
};



export const addTextToCanvas = async (
  canvas,
  text,
  options = {},
  withBackground = false
) => {
  if (!canvas) return null;

  try {
    const { IText } = await import("fabric");

    const defaultProps = {
      left: 100,
      top: 100,
      width: 300,              // REQUIRED
      fontSize: 24,
      fontFamily: "Arial",
      fill: "#000",
      textAlign: "left",
      padding: withBackground ? 10 : 0,
      objectCaching: false,
      splitByGrapheme: true,
      lockScalingFlip: true,
      id: `text-${Date.now()}`,
    };


    const textObj = new IText(text, {
      ...defaultProps,
      ...options,
    });

    canvas.add(textObj);
    canvas.setActiveObject(textObj);
    canvas.renderAll();

    return textObj;
  } catch (e) {
    return null;
  }
};

export const getSelectedTextObject = (canvas) => {
  if (!canvas) return null;
  const obj = canvas.getActiveObject();
  if (!obj) return null;

  if (["i-text", "textbox", "text"].includes(obj.type)) return obj;
  return null;
};


export const registerTextEffect = (textObj, name, options = {}) => {
  if (!textObj.metadata) textObj.metadata = {};
  if (!textObj.metadata.effects) textObj.metadata.effects = [];

  const exists = textObj.metadata.effects.find(e => e.name === name);
  if (!exists) {
    textObj.metadata.effects.push({ name, options });
  }
};

export const removeTextEffect = (textObj, name) => {
  if (!textObj?.metadata?.effects) return;
  textObj.metadata.effects = textObj.metadata.effects.filter(e => e.name !== name);
};


export const resetTextBaseState = (textObj) => {
  textObj.set({
    shadow: null,
    stroke: null,
    strokeWidth: 0,
    fill: textObj.metadata.baseFill || textObj.fill,
  });
};



export const applyTextEffects = async (canvas, textObj) => {
  if (!canvas || !textObj) return;

  if (!textObj.metadata) textObj.metadata = {};
  if (!textObj.metadata.baseFill) {
    textObj.metadata.baseFill = textObj.fill;
  }

  resetTextBaseState(textObj);

  // 🔥 CLEAN ALL DEPTH CLONES
  if (textObj.metadata._effectClones?.length) {
    textObj.metadata._effectClones.forEach(c => canvas.remove(c));
    textObj.metadata._effectClones = [];
  }

  const effects = textObj.metadata.effects || [];

  for (const effect of effects) {
    switch (effect.name) {

      case "shadow":
        textObj.set({ shadow: effect.options });
        break;

      case "stroke":
        textObj.set({
          stroke: effect.options.color,
          strokeWidth: effect.options.width,
        });
        break;

      case "gradient":
        applyGradientFill(textObj, effect.options);
        break;

      case "glow":
        applyGlow(textObj, effect.options);
        break;

      case "neon":
        applyNeon(textObj, effect.options);
        break;

      case "3d":
        await apply3DText(canvas, textObj, effect.options);
        break;

      case "longShadow":
        applyLongShadow(canvas, textObj, effect.options);
        break;

      case "isometric":
        applyIsometricText(canvas, textObj, effect.options);
        break;

      case "perspective":
        applyPerspective(textObj);
        break;

      case "glass":
        applyGlassText(textObj);
        break;
    }
  }

  canvas.requestRenderAll();
};



export const toggleDrawingMode = (
  canvas,
  isDrawingMode,
  drawingColor = "#000000",
  brushWidth = 5
) => {
  if (!canvas) return null;

  try {
    canvas.isDrawingMode = isDrawingMode;
    if (isDrawingMode) {
      canvas.freeDrawingBrush.color = drawingColor;
      canvas.freeDrawingBrush.width = brushWidth;
    }

    return true;
  } catch (e) {
    return false;
  }
};


/*
export const toggleDrawingMode = (
  canvas,
  isDrawingMode,
  drawingColor = "#000000",
  brushWidth = 5
) => {
  if (!canvas) return false;

  canvas.isDrawingMode = isDrawingMode;

  if (isDrawingMode) {
    // Disable object interaction
    canvas.selection = false;
    canvas.skipTargetFind = true;

    canvas.forEachObject(obj => {
      obj.selectable = false;
      obj.evented = false;
    });

    // Brush config
    canvas.freeDrawingBrush.color = drawingColor;
    canvas.freeDrawingBrush.width = brushWidth;

    // 🔥 CRITICAL FIX
    canvas.upperCanvasEl.style.pointerEvents = "none";
  } else {
    canvas.selection = true;
    canvas.skipTargetFind = false;

    canvas.forEachObject(obj => {
      obj.selectable = true;
      obj.evented = true;
    });

    // Restore pointer events
    canvas.upperCanvasEl.style.pointerEvents = "auto";
  }

  canvas.requestRenderAll();
  return true;
};
*/



/*
export const toggleEraseMode = (
  canvas,
  isErasing,
  previousColor = "#000000",
  eraserWidth = 20
) => {
  if (!canvas || !canvas.freeDrawingBrush) return false;

  try {
    if (isErasing) {
      canvas.freeDrawingBrush.color = "#ffffff";
      canvas.freeDrawingBrush.width = eraserWidth;
    } else {
      canvas.freeDrawingBrush.color = previousColor;
      canvas.freeDrawingBrush.width = 5;
    }

    return true;
  } catch (e) {
    return false;
  }
};
*/

/*
export const toggleEraserMode = (canvas, isErasing, color, width) => {
  if (!canvas || !canvas.freeDrawingBrush) return false;

  canvas.freeDrawingBrush.globalCompositeOperation =
    isErasing ? "destination-out" : "source-over";

  canvas.freeDrawingBrush.color = color;
  canvas.freeDrawingBrush.width = width;

  canvas.requestRenderAll();
  return true;
};
*/

/*
export const toggleEraserMode = (canvas, isErasing, color, width) => {
  if (!canvas || !canvas.freeDrawingBrush) return false;

  const brush = canvas.freeDrawingBrush;

  if (isErasing) {
    brush.globalCompositeOperation = "destination-out";
    brush.width = width;
    brush.opacity = 1; // MUST be 1
  } else {
    brush.globalCompositeOperation = "source-over";
    brush.color = color;
    brush.opacity = 1;
    brush.width = width / 2;
  }

  canvas.requestRenderAll();
  return true;
};
*/


export const toggleEraserMode = (canvas, isErasing, color, width) => {
  if (!canvas || !canvas.freeDrawingBrush) return false;

  const brush = canvas.freeDrawingBrush;

  // 🔥 CRITICAL: always keep drawing mode ON
  canvas.isDrawingMode = true;

  if (isErasing) {
    brush.globalCompositeOperation = "destination-out";
    brush.width = width;
    brush.opacity = 1;
  } else {
    brush.globalCompositeOperation = "source-over";
    brush.color = color;
    brush.width = width;
    brush.opacity = 1;
  }

  canvas.requestRenderAll();
  return true;
};



/*
export const toggleEraseMode = (
  canvas,
  isErasing,
  previousColor = "#000000",
  eraserWidth = 20
) => {
  if (!canvas || !canvas.freeDrawingBrush) return false;

  if (isErasing) {
    canvas.freeDrawingBrush.color = "#ffffff";
    canvas.freeDrawingBrush.width = eraserWidth;
  } else {
    canvas.freeDrawingBrush.color = previousColor;
    canvas.freeDrawingBrush.width = eraserWidth / 2;
  }

  canvas.requestRenderAll();
  return true;
};

export const toggleEraserMode = (canvas, isErasing, color, width) => {
  if (!canvas || !canvas.freeDrawingBrush) return false;

  canvas.freeDrawingBrush.globalCompositeOperation =
    isErasing ? "destination-out" : "source-over";

  canvas.freeDrawingBrush.color = color;
  canvas.freeDrawingBrush.width = width;

  canvas.requestRenderAll();
  return true;
};
*/


export const updateDrawingBrush = (canvas, properties = {}) => {
  if (!canvas || !canvas.freeDrawingBrush) return false;

  try {
    const { color, width, opacity } = properties;
    if (color !== undefined) {
      canvas.freeDrawingBrush.color = color;
    }

    if (width !== undefined) {
      canvas.freeDrawingBrush.width = width;
    }

    if (opacity !== undefined) {
      canvas.freeDrawingBrush.opacity = opacity ?? 1;
    }

    return true;
  } catch (e) {
    return false;
  }
};



export const addImageToCanvas = async (canvas, imageUrl) => {
  if (!canvas) return null;

  try {
    const { Image: FabricImage } = await import("fabric");

    let imgObj = new Image();
    imgObj.crossOrigin = "Anonymous";
    imgObj.src = imageUrl;

    return new Promise((resolve, reject) => {
      imgObj.onload = () => {
        let image = new FabricImage(imgObj);
        image.set({
          id: `image-${Date.now()}`,
          top: 100,
          left: 100,
          padding: 10,
          cornorSize: 10,
        });

        const maxDimension = 400;

        if (image.width > maxDimension || image.height > maxDimension) {
          if (image.width > image.height) {
            const scale = maxDimension / image.width;
            image.scale(scale);
          } else {
            const scale = maxDimension / image.height;
            image.scale(scale);
          }
        }

        canvas.add(image);
        canvas.setActiveObject(image);
        canvas.renderAll();
        resolve(image);
      };

      imgObj.onerror = () => {
        reject(new Error("Failed to load image", imageUrl));
      };
    });
  } catch (error) {
    console.error("Error adding image");

    return null;
  }
};



export const cloneSelectedObject = async (canvas) => {
  if (!canvas) return;

  const activeObject = canvas.getActiveObject();
  if (!activeObject) return;

  try {
    const clonedObj = await activeObject.clone();

    clonedObj.set({
      left: activeObject.left + 10,
      top: activeObject.top + 10,
      id: `${activeObject.type || "object"}-${Date.now()}`,
    });

    canvas.add(clonedObj);
    canvas.renderAll();

    return clonedObj;
  } catch (e) {
    console.error("Error while cloning", e);

    return null;
  }
};

export const deletedSelectedObject = async (canvas) => {
  if (!canvas) return;

  const activeObject = canvas.getActiveObject();

  if (!activeObject) return;

  try {
    canvas.remove(activeObject);
    canvas.discardActiveObject();
    canvas.renderAll();

    return true;
  } catch (e) {
    console.error("Error while deleting", e);
    return false;
  }
};

export const customizeBoundingBox = (canvas) => {
  if (!canvas) return;

  try {
    canvas.on("object:added", (e) => {
      if (e.target) {
        e.target.set({
          borderColor: "#00ffe7",
          cornerColor: "#000000",
          cornerStrokeColor: "#00ffe7",
          cornerSize: 10,
          transparentCorners: false,
        });
      }
    });

    canvas.getObjects().forEach((obj) => {
      obj.set({
        borderColor: "#00ffe7",
        cornerColor: "#000000",
        cornerStrokeColor: "#00ffe7",
        cornerSize: 10,
        transparentCorners: false,
      });
    });

    canvas.renderAll();
  } catch (e) {
    console.error("Failed to customise bounding box", e);
  }
};

