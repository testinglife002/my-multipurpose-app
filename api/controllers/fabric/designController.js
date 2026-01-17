// controllers/fabric/designController.js
// import Design from "../models/Design.js";

import DesignFabric from "../../models/fabric/DesignFabric.js";





/**
 * Create new DesignFabric
 * POST /api/DesignFabrics
 * Auth required
 */
export const createDesign = async (req, res) => {
  console.log(req.body)
  try {
    const { name, width, height } = req.body;
    const userId = req.user?.id;

    if (!name || !width || !height) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const design = await DesignFabric.create({
      name,
      width,
      height,
      uid: userId
    });

    res.status(201).json(design);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get ALL designs (for dashboard / admin / home)
 * GET /api/designs
 * Auth required
 */
export const getAllDesigns = async (req, res) => {
  try {
    const designs = await DesignFabric.find()
      .populate("uid", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(designs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get designs of logged-in user
 * GET /api/designs/my
 * Auth required
 */
export const getMyDesigns = async (req, res) => {
    const userId = req.user?.id;
  try {
    const designs = await DesignFabric.find({ uid: userId })
      .sort({ createdAt: -1 });

    res.status(200).json(designs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get single design by ID
 * GET /api/designs/:id
 * Auth required
 */
export const getDesignById = async (req, res) => {
    const userId = req.user?.id;
  try {
    const design = await DesignFabric.findById(req.params.id)
      .populate("uid", "name email");

    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }

    // Optional: restrict access to owner
    if (design.uid._id.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(design);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/**
 * Save (update) design JSON
 * PATCH /api/designs/:id/save
 * Auth required
 */
/**
 * Save design JSON + image preview
 * PATCH /api/designs/:id/save
 */
// controllers/fabric/designController.js

export const saveDesign = async (req, res) => {
  console.log(req.body)
  try {
    const { id } = req.params;
    const { jsonDesign, imagePreview, name, width, height } = req.body;
    const userId = req.user.id;

    if (!jsonDesign) {
      return res.status(400).json({ message: "Design JSON required" });
    }

    let design = await DesignFabric.findOne({
      _id: id,
      uid: userId
    });

    // 🆕 CREATE IF NOT EXISTS
    if (!design) {
      design = await DesignFabric.create({
        _id: id,
        uid: userId,
        name,
        width,
        height,
        jsonTemplate: jsonDesign,
        imagePreview
      });

      return res.status(201).json({
        message: "Design created",
        design
      });
    }

    // 🔄 UPDATE IF EXISTS
    design.jsonTemplate = jsonDesign;
    if (imagePreview) design.imagePreview = imagePreview;
    if (name) design.name = name;
    if (width) design.width = width;
    if (height) design.height = height;

    await design.save();

    res.status(200).json({
      message: "Design updated",
      design
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



