import { BlendIcon, MinusIcon, PaletteIcon, SquareIcon, SquareRoundCorner, SquareRoundCornerIcon } from "lucide-react";
import FillColor from "./Sharable/FillColor";
import { FaFont, FaFonticons, FaTrash } from "react-icons/fa";
import BorderColor from "./Sharable/BorderColor";
import BorderWidth from "./Sharable/BorderWidth";
import Opacity from "./Sharable/Opacity";
import BorderRadius from "./Sharable/BorderRadius";
import FontFamily from "./Sharable/FontFamily";
import FontStyles from "./Sharable/FontStyles";


export const canvasSizeOptions = [
  {
    name: "Instagram Post",
    width: 500,
    height: 500,
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg",
  },
  {
    name: "Instagram Story",
    width: 1080,
    height: 1600,
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg",
  },
  {
    name: "Facebook Post",
    width: 1200,
    height: 630,
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg",
  },
  {
    name: "Twitter (X) Post",
    width: 1600,
    height: 900,
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/x.svg",
  },
  {
    name: "LinkedIn Post",
    width: 1200,
    height: 627,
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg",
  },
  {
    name: "Pinterest Pin",
    width: 1000,
    height: 1500,
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/pinterest.svg",
  },
  {
    name: "YouTube Thumbnail",
    width: 1280,
    height: 720,
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg",
  },
  {
    name: "YouTube Banner",
    width: 1600,
    height: 900,
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg",
  },
  {
    name: "YouTube Post",
    width: 1200,
    height: 1200,
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg",
  },
];

export const ShapeList = [
  {
    name: "Circle",
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/84/Circle_-_black_simple.svg",
  },
  {
    name: "Square",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Square_-_black_simple.svg",
  },
  {
    name: "Triangle",
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Triangle_-_black_simple.svg",
  },
  {
    name: "Line",
    icon: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Horizontal_line.svg",
  },
];

export const shapesSettingsList = [
  {
    name: 'Fill',
    icon: PaletteIcon,
    component: <FillColor />
  },
  {
    name: 'Stroke Color',
    icon: SquareIcon,
    component: <BorderColor />
  },
  {
    name: 'Stroke Width',
    icon: MinusIcon,
    component: <BorderWidth />
  },
  {
    name: 'Opacity',
    icon: BlendIcon,
    component: <Opacity />
  },
  {
    name: 'Rounded Corner',
    icon: SquareRoundCornerIcon,
    component: <BorderRadius />
  },
  
  // {
  //  name: 'Delete',
  //  icon: FaTrash
  // }
]


export const TextSettingsList = [
    {
        name: 'Fill',
        icon: PaletteIcon,
        component: <FillColor />
    },
    {
        name: 'Stroke Color',
        icon: SquareIcon,
        component: <BorderColor />
    },
    {
        name: 'Stroke Width',
        icon: MinusIcon,
        component: <BorderWidth />
    },
    {
        name: 'Opacity',
        icon: BlendIcon,
        component: <Opacity />
    },
    {
        name: 'Font Family',
        icon: FaFont,
        component: <FontFamily />
    },
    {
        name: 'Font Styles',
        icon: FaFonticons,
        component: <FontStyles />
    },
];


export const FontFamilyList = [
    "Arial",
    "Arial Black",
    "Verdana",
    "Helvetica",
    "Tahoma",
    "Trebuchet MS",
    "Times New Roman",
    "Georgia",
    "Garamond",
    "Courier New",
    "Brush Script MT",
    "Palatino",
    "Bookman",
    "Comic Sans MS",
    "Impact",
    "Lucida Sans Unicode",
    "Geneva",
    "Lucida Console",
]


// -------------------------
// AI + Fabric Config
// -------------------------
export const AITransformationsSettings = [
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



export const AITransformationSettings = [
  {
    name: 'Change Background',
    command: 'e-bgremove',
    image: '/placeholders/remove-bg.svg',
  },
  {
    name: 'Change Background',
    command: 'e-changebg-prompt-snow',
    image: '/placeholders/change-bg.svg',
    input: true
  },
  {
    name: 'Generative Fill',
    command: 'bg-genfill,w-1000,h-960,cm-pad_resize',
    image: '/placeholders/generative-fill.svg'
  },
  {
    name: 'AI Drop Shadow',
    command: 'e-dropshadow',
    image: '/placeholders/shadow.svg'
  },
  {
    name: 'Upscale',
    command: 'e-upscale',
    image: '/placeholders/upscale.svg'
  },
  {
    name: 'Smart Crop',
    command: 'fo-auto',
    image: '/placeholders/smartcrop.svg'
  }
];

