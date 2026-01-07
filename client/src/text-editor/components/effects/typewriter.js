// 📄 effects/typewriter.js
export function applyTypewriter(canvas, obj) {
  const fullText = obj.text;
  let index = 0;

  obj.set("text", "");
  canvas.renderAll();

  const interval = setInterval(() => {
    obj.set("text", fullText.slice(0, index++));
    canvas.renderAll();

    if (index > fullText.length) {
      clearInterval(interval);
    }
  }, 50);
}
