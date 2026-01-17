// options/sideBarMenu.js

import AddImageSettings from "./AddImageSettings";
import AiTransforSettings from "./AiTransforSettings";
import BackgroundSetting from "./BackgroundSetting";
import EffectsPanel from "./EffectsPanel";
import Elements from "./Elements";
import FabricEffects from "./FabricEffects";
import FabricEffectsPanel from "./FabricEffectsPanel";
import TextSettings from "./TextSettings";

// import Elements from "./Elements";

import {
  LayoutTemplate,
  Shapes as ShapesIcon,
  Image,
  Type,
  Sparkles,
  Component,
  Settings,
  ImagePlayIcon,
  ImagePlus,
  ImagePlusIcon,
} from "lucide-react";





export const sideBarMenu = [
  {
    name: "Templates",
    desc: "Select prebuilt templates",
    icon: LayoutTemplate,
  },
  {
    name: "Elements",
    desc: "Select shapes and stickers",
    icon: ShapesIcon,
    component: <Elements />,
  },
  {
    name: "Images",
    desc: "Add images or upload your own",
    icon: Image,
    component: <AddImageSettings />,
  },
  {
    name: "Text",
    desc: "Add text, headings, and typography",
    icon: Type,
    component: <TextSettings />
  },
  {
    name: "AI",
    desc: "AI-powered design enhancements",
    icon: Sparkles,
    component: <AiTransforSettings />
  },
  {
    name: "AI alike",
    desc: "AI alike design enhancements",
    icon: ImagePlayIcon,
    component: <FabricEffectsPanel />
  },
  {
    name: "Effects",
    desc: "Image manipulation and effects",
    icon: ImagePlus,
    component: <EffectsPanel />
  },
  {
    name: "Fabric Effects",
    desc: "Fabric effects",
    icon: ImagePlusIcon,
    component: <FabricEffects />
  },
  {
    name: "Background",
    desc: "Change canvas background",
    icon: Component,
    component: <BackgroundSetting />,
  },
  {
    name: "Settings",
    desc: "Update canvas size and background",
    icon: Settings,
  },
];
