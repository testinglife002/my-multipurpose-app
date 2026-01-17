// src/services/Components/FabricEffectsPanel.jsx


import React, { useState } from 'react';

// import CustomImageUpload from './CustomImageUpload';
import { AITransformationSettings } from '../../lib/aiTransformations';
import {
  dropShadow,
  upscaleImage,
  smartCrop,
  
} from '../../lib/fabricEffects';

import UploadCustomImage from '../Sharable/UploadCustomImage';
import { useCanvasHook } from '../../context/CanvasContext';

export default function FabricEffectsPanel() {
  const { canvasEditor } = useCanvasHook();
  const [selectedAi, setSelectedAi] = useState(null);

  const applyTransformation = (option) => {
    if (!canvasEditor) return;

    if (option.type === 'imagekit') {
      setSelectedAi(option);
      return;
    }

    switch (option.action) {
      case 'shadow':
        dropShadow(canvasEditor);
        break;
      case 'upscale':
        upscaleImage(canvasEditor);
        break;
      case 'crop':
        smartCrop(canvasEditor);
        break;
      default:
        break;
    }
  };

  return (
    <div className="ai-settings-container">
      <UploadCustomImage selectedAi={selectedAi} />

      <h2 className="ai-settings-title">Effects & Transforms</h2>

      <div className="ai-grid">
        {AITransformationSettings.map((option, idx) => (
          <div
            key={idx}
            className="ai-option"
            onClick={() => applyTransformation(option)}
          >
            <img src={option.image} alt={option.name} />
            <h3>{option.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
