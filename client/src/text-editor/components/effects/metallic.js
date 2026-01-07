// 📄 effects/metallic.js
import { Gradient, Shadow } from "fabric";


export function applyMetallic(obj, palette) {
  obj.set("fill", new Gradient({
    type: "linear",
    gradientUnits: "percentage",
    coords: { x1: 0, y1: 0, x2: 0, y2: 1 },
    colorStops: palette.map((c, i) => ({
      offset: i / (palette.length - 1),
      color: c,
    })),
  }));

  obj.set("shadow", new Shadow({
    color: "rgba(0,0,0,0.35)",
    blur: 8,
    offsetX: 3,
    offsetY: 3,
  }));
}

