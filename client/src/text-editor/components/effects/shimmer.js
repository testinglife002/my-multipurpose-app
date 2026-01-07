// 📄 effects/shimmer.js
import { Gradient } from "fabric";


export function applyShimmer(canvas, obj, palette) {
  let offset = 0;

  const animate = () => {
    obj.set("fill", new Gradient({
      type: "linear",
      gradientUnits: "percentage",
      coords: { x1: offset, y1: 0, x2: offset + 1, y2: 0 },
      colorStops: palette.map((c, i) => ({
        offset: i / (palette.length - 1),
        color: c,
      })),
    }));
    offset += 0.02;
    canvas.renderAll();
    requestAnimationFrame(animate);
  };

  animate();
}