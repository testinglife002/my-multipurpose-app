import React, { useEffect, useState, useMemo } from 'react';
import ImageKit from 'imagekit';
import { FabricImage } from 'fabric';
import { useCanvasHook } from '../../context/CanvasContext';
// import { useParams } from 'next/navigation';
import { ImageUp } from 'lucide-react';
import { useParams } from 'react-router-dom';

function CustomImageUpload({ selectedAi }) {
  const { designId } = useParams();
  const { canvasEditor } = useCanvasHook();

  const [loading, setLoading] = useState(false);
  const [baseImage, setBaseImage] = useState(null); // original uploaded image
  const [image, setImage] = useState(null);         // transformed image

  /**
   * ImageKit client
   * ⚠️ WARNING: privateKey should NOT be exposed in production.
   * Move uploads to a server route for production use.
   */
  const imagekit = useMemo(
    () =>
      new ImageKit({
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
      }),
    []
  );

  /* -----------------------------
     Upload Image
  ------------------------------ */
  const onImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return; // ⛔ guard: no file selected

    try {
      setLoading(true);

      const imageRef = await imagekit.upload({
        file,
        fileName: `${designId}.png`,
        isPublished: true
      });

      setBaseImage(imageRef.url); // 👈 original
      setImage(imageRef.url);     // 👈 displayed
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------
     Apply SINGLE AI transform
     (Recommended default)
  ------------------------------ */
  useEffect(() => {
    if (!selectedAi || !baseImage) return;

    const transformedUrl = `${baseImage}?tr=${selectedAi.command}`;
    setImage(transformedUrl);
  }, [selectedAi, baseImage]);

  /* -----------------------------
     OPTIONAL: Multi-transform support
     (Disabled by default)
  ------------------------------ */
  /*
  const [activeTransforms, setActiveTransforms] = useState([]);

  useEffect(() => {
    if (!baseImage || activeTransforms.length === 0) return;

    const tr = activeTransforms.map(t => t.command).join(',');
    setImage(`${baseImage}?tr=${tr}`);
  }, [activeTransforms, baseImage]);
  */

  /* -----------------------------
     Add Image to Canvas
  ------------------------------ */
  const onAddToCanvas = async () => {
    if (!image || !canvasEditor) return;

    const canvasImageRef = await FabricImage.fromURL(image, {
      crossOrigin: 'anonymous'
    });

    canvasEditor.add(canvasImageRef);
    setImage(null);
  };

  /* -----------------------------
     UI
  ------------------------------ */
  return (
    <div className="upload-wrapper">
      {!image ? (
        <label htmlFor="uploadImage" className="upload-placeholder">
          <ImageUp />
          <h2>Upload Image</h2>
        </label>
      ) : (
        <label htmlFor="uploadImage">
          <img
            src={image}
            alt="AI preview"
            className="ai-option-image"
          />
        </label>
      )}

      <input
        type="file"
        id="uploadImage"
        className="hidden-input"
        accept="image/*"
        onChange={onImageUpload}
      />

      {image && (
        <button
          className="canvas-button"
          onClick={onAddToCanvas}
          disabled={loading}
        >
          Add Image to Canvas
        </button>
      )}
    </div>
  );
}

export default CustomImageUpload;
 
