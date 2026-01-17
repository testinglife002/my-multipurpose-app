// 📁 src/app/design/_components/EffectsPanel.jsx


import { useState } from 'react';

import {
  grayscale,
  sepia,
  invert,
  blur,
  pixelate,
  dropShadow,
  flipH,
  flipV,
  rotate,
  opacity,
  resetAll,
} from '../../lib/fabricEffects';

import { useCanvasHook } from '../../context/CanvasContext';
import { useFabricHistory } from '../../lib/useFabricHistory';



export default function EffectsPanel() {
  const { canvasEditor } = useCanvasHook();
  const { undo, redo } = useFabricHistory(canvasEditor);

  const [angle, setAngle] = useState(0);
  const [opacityValue, setOpacityValue] = useState(1);

  return (
    <div className="effects-panel">
      <h3>Effects</h3>

      <button onClick={() => grayscale(canvasEditor)}>Grayscale</button>
      <button onClick={() => sepia(canvasEditor)}>Sepia</button>
      <button onClick={() => invert(canvasEditor)}>Invert</button>
      <button onClick={() => dropShadow(canvasEditor)}>Shadow</button>

      <button onClick={() => blur(canvasEditor, 0.4)}>Blur</button>
      <button onClick={() => pixelate(canvasEditor, 10)}>Pixelate</button>

      <button onClick={() => flipH(canvasEditor)}>Flip H</button>
      <button onClick={() => flipV(canvasEditor)}>Flip V</button>

      <label>
        Rotate
        <input
          type="range"
          min="0"
          max="360"
          value={angle}
          onChange={(e) => {
            setAngle(e.target.value);
            rotate(canvasEditor, Number(e.target.value));
          }}
        />
      </label>

      <label>
        Opacity
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={opacityValue}
          onChange={(e) => {
            setOpacityValue(e.target.value);
            opacity(canvasEditor, Number(e.target.value));
          }}
        />
      </label>

      <hr />

      <button onClick={() => resetAll(canvasEditor)}>Reset All</button>

      <hr />

      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  );
}
