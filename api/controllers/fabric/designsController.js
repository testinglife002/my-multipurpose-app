// controllers/fabric/designsController.js

import mongoose from "mongoose";
import Designz from "../../models/fabric/design.model.js";
//import Designz from "../../models/fabric/design.model.js";

/**
 * Get all designs of logged-in user
 */
export const getUserDesigns = async (req, res) => {
  try {
    const designs = await Designz.find({ userId: req.user.id })
      .sort({ updatedAt: -1 });

    res.status(200).json({ success: true, data: designs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch designs" });
  }
};

/**
 * Get single design by ID
 */
export const getUserDesignById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const design = await Designz.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!design) {
      return res.status(404).json({ success: false, message: "Design not found" });
    }

    res.status(200).json({ success: true, data: design });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch design" });
  }
};

/**
 * CREATE or UPDATE design
 */
export const saveDesign = async (req, res) => {
  try {
    const { designId, name, canvasData, width, height, category } = req.body;

    // UPDATE
    if (designId) {
      const design = await Designz.findOne({
        _id: designId,
        userId: req.user.id,
      });

      if (!design) {
        return res.status(404).json({
          success: false,
          message: "Design not found or access denied",
        });
      }

      if (name !== undefined) design.name = name;
      if (canvasData !== undefined) design.canvasData = canvasData;
      if (width !== undefined) design.width = width;
      if (height !== undefined) design.height = height;
      if (category !== undefined) design.category = category;

      await design.save();

      return res.status(200).json({ success: true, data: design });
    }

    // CREATE
    const newDesign = await Designz.create({
      userId: req.user.id,
      name: name || "Untitled Design",
      canvasData,
      width,
      height,
      category,
    });

    res.status(201).json({ success: true, data: newDesign });

  } catch (err) {
    console.error("SAVE DESIGN ERROR:", err);
    res.status(500).json({ success: false, message: "Failed to save design" });
  }
};

/**
 * Delete design
 */
export const deleteDesign = async (req, res) => {
  try {
    const deleted = await Designz.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Design not found or access denied",
      });
    }

    res.status(200).json({ success: true, message: "Design deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete design" });
  }
};

/**
 * Get ALL designs (admin / public listing)
 */
export const getAllDesigns = async (req, res) => {
  try {
    const designs = await Designz.find()
      .sort({ updatedAt: -1 })
      .select("-canvasData");

    res.status(200).json({ success: true, data: designs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch all designs" });
  }
};
