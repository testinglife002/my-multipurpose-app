// 📄 src/components/text-editor/effects/index.js
// This is the single entry point FabricCanvasView calls.

import { applyGlow } from "./glow";
import { applyGradient } from "./gradients";
import { applyGlitch } from "./glitch";
import { applyTypewriter } from "./typewriter";
import { applyWavy } from "./wavy";
import { applyShimmer } from "./shimmer";
import { applyMetallic } from "./metallic";

export function applyTextEffect({
  canvas,
  obj,
  effect,
  palette = [],
}) {
  if (!obj) return;

  // reset
  obj.set({
    shadow: null,
    fill: palette[0] || "#fff",
  });

  switch (effect) {
    case "neon":
      applyGlow(obj, palette);
      break;

    case "animatedGradient":
    case "aurora":
    case "cityNight":
      applyGradient(obj, palette);
      break;

    case "chrome":
    case "metallic":
    case "wooden":
      applyMetallic(obj, palette);
      break;

    case "glitch":
      applyGlitch(canvas, obj, palette);
      break;

    case "typewriter":
    case "dynamicTypewriter":
      applyTypewriter(canvas, obj);
      break;

    case "wavy":
    case "gooeyMarquee":
      applyWavy(canvas, obj);
      break;

    case "shimmer":
      applyShimmer(canvas, obj, palette);
      break;

    default:
      // no effect
      break;
  }

  canvas.renderAll();
}

