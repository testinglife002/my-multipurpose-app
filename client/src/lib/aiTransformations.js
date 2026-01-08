// src/lib/aiTransformations.js
export const AITransformationSettings = [
  {
    name: 'Remove Background',
    type: 'imagekit',
    command: 'e-bgremove',
    image: '/placeholders/remove-bg.svg',
  },
  {
    name: 'Change Background',
    type: 'imagekit',
    command: 'e-changebg-prompt-snow',
    image: '/placeholders/change-bg.svg',
  },
  {
    name: 'Drop Shadow',
    type: 'fabric',
    action: 'shadow',
    image: '/placeholders/shadow.svg',
  },
  {
    name: 'Upscale',
    type: 'fabric',
    action: 'upscale',
    image: '/placeholders/upscale.svg',
  },
  {
    name: 'Smart Crop',
    type: 'fabric',
    action: 'crop',
    image: '/placeholders/smartcrop.svg',
  },
];

