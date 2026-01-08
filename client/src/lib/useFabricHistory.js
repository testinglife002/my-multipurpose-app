// 📁 src/lib/useFabricHistory.js
import { useEffect, useRef } from 'react';

export const useFabricHistory = (canvas) => {
  const undoStack = useRef([]);
  const redoStack = useRef([]);

  useEffect(() => {
    if (!canvas) return;

    const save = () => {
      redoStack.current = [];
      undoStack.current.push(JSON.stringify(canvas.toJSON()));
    };

    canvas.on('object:modified', save);
    canvas.on('object:added', save);

    return () => {
      canvas.off('object:modified', save);
      canvas.off('object:added', save);
    };
  }, [canvas]);

  const undo = () => {
    if (!undoStack.current.length) return;

    redoStack.current.push(JSON.stringify(canvas.toJSON()));
    const state = undoStack.current.pop();

    canvas.loadFromJSON(state, () => canvas.requestRenderAll());
  };

  const redo = () => {
    if (!redoStack.current.length) return;

    undoStack.current.push(JSON.stringify(canvas.toJSON()));
    const state = redoStack.current.pop();

    canvas.loadFromJSON(state, () => canvas.requestRenderAll());
  };

  return { undo, redo };
};
