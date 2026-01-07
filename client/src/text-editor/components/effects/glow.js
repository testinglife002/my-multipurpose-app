// 📄 effects/glow.js
// 📄 src/components/text-editor/effects/glow.js
import { Shadow } from "fabric";

export function applyGlow(obj, palette = []) {
  if (!obj) return;

  obj.set(
    "shadow",
    new Shadow({
      color: palette[0] || "#00ffff",
      blur: 25,
      offsetX: 0,
      offsetY: 0,
    })
  );
}
