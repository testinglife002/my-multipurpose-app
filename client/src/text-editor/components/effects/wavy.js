// 📄 effects/wavy.js
import { Text } from "fabric";

export function applyWavy(canvas, obj) {
  const text = obj.text;
  const baseX = obj.left;
  const baseY = obj.top;

  canvas.remove(obj);

  text.split("").forEach((char, i) => {
    const t = new Text(char, {
      left: baseX + i * 22,
      top: baseY + Math.sin(i) * 12,
      fill: obj.fill,
      fontSize: obj.fontSize,
      selectable: false,
    });
    canvas.add(t);
  });
}
