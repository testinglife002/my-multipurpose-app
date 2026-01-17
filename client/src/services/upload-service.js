// 📁 src/services/upload-service.js
import newRequest from "../api/newRequest";

export const uploadMedia = async (file, onProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await newRequest.post("/uploads", formData, {
    onUploadProgress: (e) => {
      if (!e.total) return;
      onProgress?.(Math.round((e.loaded * 100) / e.total));
    },
  });

  return res.data; // { success, data }
};

export const getUserMedias = async () => {
  const res = await newRequest.get("/uploads");
  return res.data; // { success, data }
};


// upload by category
export const uploadByCategory = async (file, category) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("category", category);

  const res = await newRequest.post("/uploads/category", formData);
  return res.data;
};

// get by category
export const getUploadsByCategory = async (category) => {
  const res = await newRequest.get(`/uploads/category/${category}`);
  return res.data;
};
