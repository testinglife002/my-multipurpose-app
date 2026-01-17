import newRequest from "../api/newRequest";



// CREATE DESIGN
export const createDesign = (data) => {
  return newRequest.post("/design", data);
};

// GET ALL DESIGNS
export const getAllDesigns = () => {
  return newRequest.get("/design");
};

// GET MY DESIGNS
export const getMyDesigns = () => {
  return newRequest.get("/design/my");
};

// GET SINGLE DESIGN
export const getDesignById = (id) => {
  return newRequest.get(`/design/${id}`);
};

// SAVE DESIGN
export const saveDesign = (id, payload) => {
  return newRequest.put(`/design/${id}`, payload);
};
