import React, { useState } from 'react';

import CustomImageUpload from '../Sharable/CustomImageUpload';
// import { AITransformationSettings } from '@/constants/ai';
import './ai-transform.css';
import { AITransformationSettings } from '../Options';

const AiTransforSettings = () => {
  const [selectedAi, setSelectedAi] = useState(null);

  return (
    <div className="ai-settings-container">
      <CustomImageUpload selectedAi={selectedAi} />

      <h2 className="ai-settings-title">AI Transformations</h2>

      <div className="ai-grid">
        {AITransformationSettings.map((option, index) => (
          <div
            key={index}
            className="ai-option"
            onClick={() => setSelectedAi(option)}
          >
            {/*
            <Image
              src={option.image}
              alt={option.name}
              width={500}
              height={500}
              className="ai-option-image"
            />
            */}
            <img
              src={option.image}
              alt={option.name}
              className="ai-option-image"
            />

            <h2 className="ai-option-name">{option.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTransforSettings;
