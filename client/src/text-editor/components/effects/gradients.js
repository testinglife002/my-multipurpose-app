// 📄 effects/gradients.js
import { Gradient } from "fabric";


export function applyGradient(obj, palette) {
  obj.set("fill", new Gradient({
    type: "linear",
    gradientUnits: "percentage",
    coords: { x1: 0, y1: 0, x2: 1, y2: 0 },
    colorStops: palette.map((c, i) => ({
      offset: i / (palette.length - 1),
      color: c,
    })),
  }));
}
