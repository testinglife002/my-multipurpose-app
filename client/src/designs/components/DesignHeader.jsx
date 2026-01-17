// ✅ src/designs/components/DesignHeader.jsx
import { ArrowLeft, Save, Share2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ImageKit from "imagekit";

import { saveDesign } from "../../services/designService";
// import { useCanvasHook } from "../../context/CanvasContext";
import './design-header.css';
import { useCanvasHook } from "../pages/DesignEditor";

export default function DesignHeader({ designInfo, realDesignId }) {

  const navigate = useNavigate();
  const { designId } = useParams();
  const { canvasEditor } = useCanvasHook();

  const imagekit = new ImageKit({
    publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
    privateKey: import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
  });

  const onSave = async () => {
    if (!canvasEditor) return;

    const id = realDesignId;

    const image = canvasEditor.toDataURL({ format: "png", quality: 0.6 });

    const uploaded = await imagekit.upload({
      file: image,
      fileName: `${id}.png`,
      useUniqueFileName: false,
    });

    await saveDesign(id, {
      jsonDesign: canvasEditor.toJSON(),
      imagePreview: uploaded.url,
      name: designInfo.name,
      width: designInfo.width,
      height: designInfo.height,
    });

    if (!designId || designId === "new") {
      navigate(`/design/${id}`, { replace: true });
    }

    alert("Design saved");
  };



  return (

    <header className="design-header">
      <div className="design-header-left">
        <button className="icon-btn" onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={18} />
        </button>

        <strong>{designInfo.name}</strong>
      </div>

      <div className="design-header-right">
        <button className="secondary-btn">
          <Share2 size={16} />
          Share
        </button>

        <button className="primary-btn" onClick={onSave}>
          <Save size={16} />
          Save
        </button>
      </div>
    </header>
  );


}
