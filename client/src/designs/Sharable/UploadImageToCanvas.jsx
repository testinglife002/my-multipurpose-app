// 📁 src/services/Components/UploadImageToCanvas.jsx


import React, { useState } from "react";
import { Image as FabricImage } from "fabric";
import { useCanvasHook } from '../../context/CanvasContext';
import { ImageUp } from "lucide-react";

export default function UploadImageToCanvas() {
  const { canvasEditor } = useCanvasHook();
  const [loading, setLoading] = useState(false);

  const onUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !canvasEditor) return;

    setLoading(true);

    const reader = new FileReader();
    reader.onload = () => {
      FabricImage.fromURL(
        reader.result,
        (img) => {
          img.set({
            left: canvasEditor.getWidth() / 2,
            top: canvasEditor.getHeight() / 2,
            originX: "center",
            originY: "center",
            selectable: true,
          });

          canvasEditor.add(img);
          canvasEditor.setActiveObject(img);
          canvasEditor.requestRenderAll();
          setLoading(false);
        },
        { crossOrigin: "anonymous" }
      );
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="upload-wrapper">
      <label htmlFor="uploadImage" className="upload-placeholder">
        <ImageUp />
        <h3>Upload Image</h3>
      </label>

      <input
        id="uploadImage"
        type="file"
        accept="image/*"
        hidden
        onChange={onUpload}
      />

      {loading && <p>Uploading…</p>}
    </div>
  );
}
