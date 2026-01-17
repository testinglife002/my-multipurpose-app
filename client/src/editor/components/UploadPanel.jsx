// src/editor/components/UploadPanel.jsx
import { useCallback, useEffect, useState } from "react";
import { Loader2, Upload } from "lucide-react";

import { addImageToCanvas } from "../../fabric/fabric-utils";
import { uploadMedia, getUserMedias } from "../../services/upload-service";
import { useEditorStore } from "../../store";

import "./upload-panel.css";

import newRequest from "../../api/newRequest";

function UploadPanel() {
  const { canvas } = useEditorStore();

  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userUploads, setUserUploads] = useState([]);

  /* ---------- FETCH ---------- */
  const fetchUserUploads = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getUserMedias();
      setUserUploads(res?.data || []);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserUploads();
  }, [fetchUserUploads]);

  /* ---------- UPLOAD ---------- */
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      
      const res = await newRequest.post("/uploads", formData, {
            headers: { "Content-Type": "multipart/form-data" },
       });
       console.log(res.data)

      if (res?.data) {
        setUserUploads((prev) => [res?.data?.data, ...prev]);
      }

    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };
  /*
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);

    try {
        const res = await newRequest.post("/uploads", formData);

        if (res?.data?.data) {
        setUserUploads((prev) => [res.data.data, ...prev]);
        }

    } catch (err) {
        console.error("Upload failed:", err);
    } finally {
        setIsUploading(false);
        e.target.value = "";
    }
    };
    */
  /* ---------- CANVAS ---------- */
  const handleAddImage = (url) => {
    if (!canvas) return;
    addImageToCanvas(canvas, url);
  };

  return (
    <div className="upload-panel">
      <label className={`upload-btn ${isUploading ? "disabled" : ""}`}>
        <Upload />
        {isUploading ? "Uploading..." : "Upload Image"}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      </label>

      <h4>Your Uploads</h4>

      {isLoading ? (
        <div className="loading">
          <Loader2 className="spin" /> Loading...
        </div>
      ) : userUploads.length > 0 ? (
        <div className="upload-grid">
          {userUploads.map((img) => (
            <div
              key={img._id}
              className="upload-thumb"
              onClick={() => handleAddImage(img.url)}
            >
              <img src={img.url} alt={img.name} />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">No uploads yet</div>
      )}
    </div>
  );
}

export default UploadPanel;
