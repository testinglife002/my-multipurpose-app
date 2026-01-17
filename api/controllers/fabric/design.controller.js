// controllers/fabric/design.controller.js

import Design from "../../models/fabric/design.model.js";

/**
 * Get all designs of logged-in user
 */
export const getUserDesigns = async (req, res) => {
  try {
    const designs = await Design.find({ userId: req.user.id })
      .sort({ updatedAt: -1 });

    res.status(200).json({ success: true, data: designs });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch designs",
    });
  }
};

/**
 * Get single design by ID
 */
export const getUserDesignsByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid design ID" });
    }

    const design = await Design.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!design) {
      return res.status(404).json({
        success: false,
        message: "Design not found",
      });
    }

    res.status(200).json({ success: true, data: design });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch design",
    });
  }
};

/**
 * Create or update design
 */
export const saveDesign = async (req, res) => {
  try {
    const { designId, name, canvasData, width, height, category } = req.body;

    // UPDATE
    if (designId) {
      const design = await Design.findOne({
        _id: designId,
        userId: req.user.id,
      });

      if (!design) {
        return res.status(404).json({
          success: false,
          message: "Design not found or access denied",
        });
      }

      Object.assign(design, {
        name: name ?? design.name,
        canvasData: canvasData ?? design.canvasData,
        width: width ?? design.width,
        height: height ?? design.height,
        category: category ?? design.category,
      });

      await design.save();
      return res.status(200).json({ success: true, data: design });
    }

    // CREATE
    const newDesign = await Design.create({
      userId: req.user.id,   // ✅ FIX
      name: name || "Untitled Design",
      canvasData,
      width,
      height,
      category,
    });

    res.status(201).json({ success: true, data: newDesign });
  } catch (error) {
    console.error("SAVE DESIGN ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save design",
    });
  }
};

/**
 * Delete design
 */
export const deleteDesign = async (req, res) => {
  try {
    const deleted = await Design.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Design not found or access denied",
      });
    }

    res.status(200).json({
      success: true,
      message: "Design deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete design",
    });
  }
};


/**
 * Get ALL designs (all users)
 */
/**
 * Get ALL designs (all users)
 */
export const getAllDesigns = async (req, res) => {
  try {
    const designs = await Design.find()
      .sort({ updatedAt: -1 })
      .select("-canvasData"); // ⬅️ IMPORTANT: avoid huge payload

    res.status(200).json({
      success: true,
      data: designs,
    });
  } catch (error) {
    console.error("GET ALL DESIGNS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all designs",
    });
  }
};


