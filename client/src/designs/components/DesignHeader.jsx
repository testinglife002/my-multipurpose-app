// ✅ src/designs/components/DesignHeader.jsx
import { ArrowLeft, Save, Share2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { saveDesign } from "../../../api/designService";
import { useCanvasHook } from "../../../context/CanvasContext";
import ImageKit from "imagekit";

export default function DesignHeader({ designInfo }) {
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

    const image = canvasEditor.toDataURL({ format: "png", quality: 0.6 });

    const uploaded = await imagekit.upload({
      file: image,
      fileName: `${designId}.png`,
      useUniqueFileName: false,
    });

    await saveDesign(designId, {
      jsonDesign: canvasEditor.toJSON(),
      imagePreview: uploaded.url,
    });

    alert("Design saved");
  };

  return (
    <header className="design-header">
      <button onClick={() => navigate("/dashboard")}>
        <ArrowLeft size={18} />
      </button>

      <strong>{designInfo.name}</strong>

      <div>
        <button><Share2 size={16} /> Share</button>
        <button onClick={onSave}><Save size={16} /> Save</button>
      </div>
    </header>
  );
}
