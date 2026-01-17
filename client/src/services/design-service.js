// src/services/design-service.js
import newRequest from "../api/newRequest";

/**
 * GET all designs of logged-in user
 * GET /api/designs
 */
export const getUserDesigns = async () => {
  const res = await newRequest.get("/designs");
  return res.data;
};

/**
 * GET single design by ID
 * GET /api/designs/:id
 */
export const getDesignById = async (designId) => {
  const res = await newRequest.get(`/designs/${designId}`);
  return res.data;
};

/**
 * GET all designs (admin / public)
 * GET /api/designs/all
 */
export const getAllDesigns = async () => {
  const res = await newRequest.get("/designs/all");
  return res.data;
};

/**
 * CREATE or UPDATE design
 * POST /api/designs
 */
export const saveDesign = async ({
  designId = null,
  name,
  canvasData,
  width,
  height,
  category = "general",
}) => {
  const res = await newRequest.post("/designs", {
    designId,
    name,
    canvasData,
    width,
    height,
    category,
  });

  return res.data;
};

/**
 * DELETE design
 * DELETE /api/designs/:id
 */
export const deleteDesign = async (designId) => {
  const res = await newRequest.delete(`/designs/${designId}`);
  return res.data;
};



// import { saveDesign } from "./design-service";


export async function saveCanvasState(
  canvas,
  designId = null,
  title = "Untitled Design",
  category = "general"
) {
  if (!canvas) return false;

  try {
    const canvasData = JSON.stringify(canvas.toJSON(["id", "filters"]));

    return saveDesign({
      designId,
      name: title,
      canvasData,
      width: canvas.width,
      height: canvas.height,
      category,
    });
  } catch (error) {
    console.error("Error saving canvas state:", error);
    throw error;
  }
}


