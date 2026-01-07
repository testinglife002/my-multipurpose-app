// 📄 effects/glitch.js
export function applyGlitch(canvas, obj, palette) {
  const clone1 = fabric.util.object.clone(obj);
  clone1.set({
    left: obj.left - 2,
    fill: palette[0] || "red",
    selectable: false,
  });

  const clone2 = fabric.util.object.clone(obj);
  clone2.set({
    left: obj.left + 2,
    fill: palette[1] || "cyan",
    selectable: false,
  });

  canvas.add(clone1);
  canvas.add(clone2);
}