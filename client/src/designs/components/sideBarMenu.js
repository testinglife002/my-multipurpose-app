// options/sideBarMenu.js
import AddImageSettings from "@/services/Components/AddImageSettings";
import AiTransforSettings from "@/services/Components/AiTransforSettings";
import BackgroundSetting from "@/services/Components/BackgroundSetting";
import EffectsPanel from "@/services/Components/EffectsPanel";
import Elements from "@/services/Components/Elements";
import FabricEffects from "@/services/Components/FabricEffects";
import FabricEffectsPanel from "@/services/Components/FabricEffectsPanel";
import TextSettings from "@/services/Components/TextSettings";

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
