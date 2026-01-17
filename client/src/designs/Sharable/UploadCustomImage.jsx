// UploadCustomImage.jsx ✅ CORRECTED


import React, { useEffect, useState, useMemo } from "react";
 import ImageKit from "imagekit-javascript";
// import ImageKit from "imagekit";
import { Image as FabricImage } from "fabric"; // ✅ FIX
import { useCanvasHook } from '../../context/CanvasContext';

import { ImageUp } from "lucide-react";
import { useParams } from "react-router-dom";

export default function UploadCustomImage({ selectedAi }) {
  const { designId } = useParams();
  const { canvasEditor } = useCanvasHook();

  const [loading, setLoading] = useState(false);
  const [baseImage, setBaseImage] = useState(null);
  const [image, setImage] = useState(null);
  
  
  const imagekit = useMemo(
    () =>
      new ImageKit({
        publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
        // privateKey: import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
        authenticationEndpoint: "https://my-multipurpose-app.onrender.com/api/imagekit/auth",
      }),
    []
  );

  /* -----------------------------
     Upload Image
  ----------------------------- */
  const onImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      const res = await imagekit.upload({
        file,
        fileName: `${designId}.png`,
        isPublished: true,
      });

      setBaseImage(res.url);
      setImage(res.url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  /* -----------------------------
     AI Preview
  ----------------------------- */
  useEffect(() => {
    if (!selectedAi || !baseImage) return;
    setImage(`${baseImage}?tr=${selectedAi.command}`);
  }, [selectedAi, baseImage]);

  /* -----------------------------
     Add to Fabric Canvas
  ----------------------------- */
  const onAddToCanvas = () => {
    if (!image || !canvasEditor) return;

    FabricImage.fromURL(image, (img) => {
    img.set({
        crossOrigin: "anonymous", // 🔥 THIS FIXES BLANK IMAGE
        left: canvasEditor.getWidth() / 2,
        top: canvasEditor.getHeight() / 2,
        originX: "center",
        originY: "center",
        selectable: true,
    });

    img.scaleToWidth(300); // 🔥 ensure visible
    canvasEditor.add(img);
    canvasEditor.setActiveObject(img);
    canvasEditor.renderAll();
    });


    setImage(null);
  };

  return (
    <div className="upload-wrapper">
      {!image ? (
        <label htmlFor="uploadImage" className="upload-placeholder">
          <ImageUp />
          <h2>Upload Image</h2>
        </label>
      ) : (
        <img src={image} alt="preview" className="ai-option-image" />
      )}

      <input
        id="uploadImage"
        type="file"
        hidden
        accept="image/*"
        onChange={onImageUpload}
      />

      {image && (
        <button onClick={onAddToCanvas} disabled={loading}>
          Add Image to Canvas
        </button>
      )}
    </div>
  );
}
