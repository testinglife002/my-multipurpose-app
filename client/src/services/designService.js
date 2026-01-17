import newRequest from "../api/newRequest";



// CREATE DESIGN
export const createDesign = (data) => {
  return newRequest.post("/designs", data);
};

// GET ALL DESIGNS
export const getAllDesigns = () => {
  return newRequest.get("/designs");
};

// GET MY DESIGNS
export const getMyDesigns = () => {
  return newRequest.get("/designs/my");
};

// GET SINGLE DESIGN
export const getDesignById = (id) => {
  return newRequest.get(`/designs/${id}`);
};

// SAVE DESIGN
export const saveDesign = (id, payload) => {
  return newRequest.put(`/designs/${id}`, payload);
};
