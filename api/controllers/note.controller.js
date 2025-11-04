// server/controllers/note.controller.js
// server/controllers/note.controller.js
import Note from "../models/note.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { pushNotification } from "../utils/pushNotification.js";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Utility: format notes
const formatNotes = (notes, userId) => {
  return notes.map((note) => {
    const n = note.toObject ? note.toObject() : note;
    const createdById = note.createdBy?._id || note.createdBy;
    return {
      ...n,
      canEdit: String(createdById) === String(userId),
      isCopy: !!n.sharedOriginal,
    };
  });
};

/* ------------------------- USERS ------------------------- */
export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user?.id;
    const users = await User.find({ _id: { $ne: currentUserId } }).select(
      "username email role isAdmin"
    );
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};

export const getUsersByIds = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids))
      return res.status(400).json({ message: "Invalid request" });

    const users = await User.find({ _id: { $in: ids } }).select("_id username email");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ------------------------- LIST NOTES ------------------------- */
export const listNotes = async (req, res) => {
  try {
    const userId = req.user?.id;
    const objectUserId = mongoose.Types.ObjectId(userId);

    const notes = await Note.find({
      $or: [
        { createdBy: objectUserId },
        { isPublic: true },
        { sharedWith: objectUserId },
      ],
    })
      .populate("createdBy", "username")
      .populate("project", "name")
      .populate("sharedOriginal", "title createdBy")
      .populate("sharedWith", "_id username")
      .sort({ createdAt: -1 });

    res.json(formatNotes(notes, userId));
  } catch (err) {
    console.error("Error listing notes:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ------------------------- GET NOTES ------------------------- */
export const getNotes = async (req, res) => {
  try {
    const userId = req.user?.id;
    const objectUserId = mongoose.Types.ObjectId(userId);

    const notes = await Note.find({
      $or: [
        { createdBy: objectUserId },
        { isPublic: true },
        { sharedWith: objectUserId },
      ],
    })
      .populate("createdBy", "_id username email")
      .populate("project", "name")
      .populate("sharedOriginal", "title createdBy")
      .populate("copiedFrom", "_id username email")
      .populate("sharedWith", "_id username email")
      .sort({ createdAt: -1 });

    res.json(formatNotes(notes, userId));
  } catch (err) {
    console.error("Error getting notes:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ------------------------- CREATE NOTE ------------------------- */
/* ------------------------- CREATE NOTE ------------------------- */
export const createNote = async (req, res) => {
  try {
    const userId = req.user?.id;
    const username = req.user?.username || "";
    const { title, projectId, blocks = [], isPublic = false, tags = [], sharedWith = [] } = req.body;

    if (!userId) return res.status(401).json({ message: "Authentication required" });
    if (!title) return res.status(400).json({ message: "Title required" });

    const cleanSharedWith = Array.from(new Set(sharedWith.map(String))).map((id) =>
      mongoose.Types.ObjectId(id)
    );

    const note = await Note.create({
      title,
      project: projectId || null,
      blocks,
      isPublic,
      tags,
      createdBy: userId,
      createdUsername: username,
      sharedOriginal: null,
      copiedFrom: null,
      sharedWith: cleanSharedWith,
    });

    const notifications = [];

    // Notify creator
    notifications.push(
      pushNotification({
        actor: userId,
        user: userId,
        type: sharedWith.length ? "note_shared_self" : "note_created",
        title: sharedWith.length ? `You shared a note "${title}"` : `Note "${title}" created`,
        message: sharedWith.length
          ? `📝 You shared a new note "${title}" with ${cleanSharedWith.length} users.`
          : `📝 You created a new note "${title}".`,
        referenceId: note._id,
        url: `/notes/${note._id}`,
      })
    );

    // Notify shared users
    if (cleanSharedWith.length) {
      notifications.push(
        pushNotification({
          actor: userId,
          userIds: cleanSharedWith,
          type: "note_shared_with_user",
          title: `New note shared with you`,
          message: `📝 ${username} shared a note "${title}" with you.`,
          referenceId: note._id,
          url: `/notes/${note._id}`,
        })
      );
    }

    await Promise.allSettled(notifications);

    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create note" });
  }
};



/* ------------------------------- GET single ----------------------------- */
/* ------------------------- GET SINGLE NOTE ------------------------- */
export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const note = await Note.findById(id)
      .populate("createdBy", "_id username email")
      .populate("project", "name")
      .populate("sharedOriginal", "title createdBy")
      .populate("sharedWith", "_id username email");

    if (!note) return res.status(404).json({ message: "Note not found" });

    const canView =
      String(note.createdBy._id) === String(userId) ||
      note.isPublic ||
      (note.sharedWith || []).map(String).includes(String(userId));

    if (!canView) return res.status(403).json({ message: "Forbidden" });

    const noteObj = note.toObject();
    noteObj.canEdit = String(note.createdBy._id) === String(userId);
    noteObj.isCopy = !!note.sharedOriginal;

    res.json(noteObj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch note" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId).populate("createdBy", "_id username");
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    console.error("Error in getNoteById:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ------------------------- GET ALL NOTES ------------------------- */
export const getAllNotes = async (req, res) => {
  try {
    const userId = req.user?.id;
    const objectUserId = mongoose.Types.ObjectId(userId);

    const notes = await Note.find({
      $or: [
        { createdBy: objectUserId },
        { isPublic: true },
        { sharedWith: objectUserId },
      ],
    })
      .populate("createdBy", "_id username email")
      .populate("project", "name")
      .populate("sharedOriginal", "title createdBy")
      .populate("copiedFrom", "_id username")
      .populate("sharedWith", "_id username")
      .sort({ createdAt: -1 });

    res.json(formatNotes(notes, userId));
  } catch (err) {
    console.error("Error getAllNotes:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getMyNotes = async (req, res) => {
  try {
    const userId = req.user?.id;
    const notes = await Note.find({ createdBy: userId })
      .populate("createdBy", "_id username email")
      .populate("project", "name")
      .sort({ createdAt: -1 });

    res.json(formatNotes(notes, userId));
  } catch (err) {
    console.error("Error getMyNotes:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getPublicNotes = async (req, res) => {
  try {
    const userId = req.user?.id;
    const notes = await Note.find({ isPublic: true })
      .populate("createdBy", "_id username email")
      .populate("project", "name")
      .sort({ createdAt: -1 });

    res.json(formatNotes(notes, userId));
  } catch (err) {
    console.error("Error getPublicNotes:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getCopiedNotes = async (req, res) => {
  try {
    const userId = req.user?.id;
    const notes = await Note.find({ createdBy: userId, sharedOriginal: { $ne: null } })
      .populate("createdBy", "_id username email")
      .populate("project", "name")
      .populate("sharedOriginal", "title createdBy")
      .sort({ createdAt: -1 });

    res.json(formatNotes(notes, userId));
  } catch (err) {
    console.error("Error getCopiedNotes:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getSharedWithMeNotes = async (req, res) => {
  try {
    const userId = req.user?.id;
    const objectUserId = mongoose.Types.ObjectId(userId);
    const notes = await Note.find({ sharedWith: objectUserId })
      .populate("createdBy", "_id username email")
      .populate("project", "name")
      .sort({ createdAt: -1 });

    res.json(formatNotes(notes, userId));
  } catch (err) {
    console.error("Error getSharedWithMeNotes:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getNotesByProject = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { projectId } = req.params;

    const notes = await Note.find({
      project: projectId,
      $or: [{ createdBy: userId }, { isPublic: true }, { sharedWith: userId }],
    })
      .populate("createdBy", "_id username email")
      .populate("project", "name")
      .sort({ createdAt: -1 });

    res.json(formatNotes(notes, userId));
  } catch (err) {
    console.error("Error getNotesByProject:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ------------------------------- UPDATE --------------------------------- */
/* ------------------------- UPDATE NOTE ------------------------- */
// inside server/controllers/note.controller.js
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const { title, projectId, blocks = [], isPublic = false, tags = [], sharedWith = [] } = req.body;

    const note = await Note.findById(id).populate("createdBy", "_id username");
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (String(note.createdBy._id) !== String(userId))
      return res.status(403).json({ message: "Forbidden: not your note" });

    if (title !== undefined) note.title = title;
    note.project = projectId || null;
    if (blocks.length) note.blocks = blocks;
    note.isPublic = isPublic;
    note.tags = tags || [];

    if (Array.isArray(sharedWith) && sharedWith.length) {
      note.sharedWith = Array.from(new Set([...note.sharedWith.map(String), ...sharedWith.map(String)])).map(
        (id) => mongoose.Types.ObjectId(id)
      );
    }

    await note.save();

    // Notify shared users
    if (note.sharedWith.length) {
      // build usernames for creator notification
      const sharedUsers = await User.find({ _id: { $in: note.sharedWith } }).select("username");
      const sharedUsernames = sharedUsers.map(u => u.username).join(", ");

      await Promise.allSettled([
        // Notify creator (self)
        pushNotification({
          actor: userId,
          user: userId,
          type: "note_updated_self",
          title: `You updated a shared note`,
          message: `📝 You updated the note "${note.title}" shared with ${sharedUsernames}.`,
          referenceId: note._id,
          url: `/notes/${note._id}`,
        }),
        // Notify shared users
        pushNotification({
          actor: userId,
          userIds: note.sharedWith,
          type: "note_updated_shared",
          title: `Note "${note.title}" updated`,
          message: `📝 ${note.createdBy.username} updated a shared note "${note.title}".`,
          referenceId: note._id,
          url: `/notes/${note._id}`,
        })
      ]);
    }

    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update note" });
  }
};




/* ------------------------------- DELETE --------------------------------- */
/* ------------------------- DELETE NOTE ------------------------- */
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const note = await Note.findById(id).populate("createdBy", "_id username");
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (String(note.createdBy._id) !== String(userId))
      return res.status(403).json({ message: "Forbidden" });

    await Note.findByIdAndDelete(id);

    // Notify shared users
    if (note.sharedWith.length) {
      pushNotification({
        actor: userId,
        userIds: note.sharedWith,
        type: "note_deleted",
        title: `Note "${note.title}" deleted`,
        message: `🗑️ The shared note "${note.title}" was deleted.`,
        referenceId: note._id,
      });
    }

    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete note" });
  }
};

/* ------------------------------- SHARE ---------------------------------- */
/* ---------------- SHARE ---------------- */
/* ------------------------- SHARE NOTE ----------- */
export const shareNote = async (req, res) => {
  try {
      const { id } = req.params;
      const { targetUserIds } = req.body;
      const userId = req.user?.id;

      if (!Array.isArray(targetUserIds) || targetUserIds.length === 0)
        return res.status(400).json({ message: "No users selected" });

      const note = await Note.findById(id).populate("createdBy", "_id username");
      if (!note) return res.status(404).json({ message: "Note not found" });
      if (String(note.createdBy._id) !== String(userId))
        return res.status(403).json({ message: "Forbidden" });

      // Merge existing sharedWith with targetUserIds without duplicates
      const existingIds = (note.sharedWith || []).map((id) => String(id));
      const mergedIds = [...new Set([...existingIds, ...targetUserIds.map(String)])];
      note.sharedWith = mergedIds.map((id) => mongoose.Types.ObjectId(id));
      await note.save();

      await pushNotification({
        actor: userId,
        userIds: targetUserIds,
        type: "note_shared_with_user",
        title: "Note shared",
        message: `📝 ${req.user?.username} shared "${note.title}" with you.`,
        referenceId: note._id,
        url: `/notes/${note._id}`,
      });

      res.json({ message: "Note shared successfully", note });
  } catch (err) {
      console.error("Error sharing note:", err);
      res.status(500).json({ message: err.message });
  }
};

/* ------------------------------- COPY ----------------------------------- */

/* ------------------------- COPY NOTE ------------------------- */
export const copyNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const original = await Note.findById(id).populate("createdBy", "_id username");
    if (!original) return res.status(404).json({ message: "Note not found" });

    const newNote = await Note.create({
      title: original.title,
      project: original.project,
      blocks: original.blocks,
      isPublic: false,
      createdBy: userId,
      createdUsername: req.user.username || "",
      tags: original.tags,
      sharedOriginal: original._id,
      copiedFrom: original.createdBy,
      sharedWith: [],
    });

    if (String(original.createdBy._id) !== String(userId)) {
      pushNotification({
        actor: userId,
        user: original.createdBy._id,
        type: "note_copied",
        title: `Your note "${original.title}" was copied`,
        message: `📋 ${req.user.username || "Someone"} copied your note "${original.title}".`,
        referenceId: newNote._id,
        url: `/notes/${newNote._id}`,
      });
    }

    res.status(201).json({ ...newNote.toObject(), canEdit: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to copy note" });
  }
};

/* ------------------------- UPLOADS ------------------------- */
const handleUpload = async (file, folder, resourceType = "image") => {
  if (process.env.USE_CLOUDINARY === "true") {
    const result = await cloudinary.uploader.upload(file.path, { folder, resource_type: resourceType });
    await fs.promises.unlink(file.path).catch(() => {});
    return result.secure_url;
  }
  return `/public/uploads/notes/${file.filename}`;
};

export const uploadNoteImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: 0, message: "No file uploaded" });
    const url = await handleUpload(req.file, "notes", "image");
    res.json({ success: 1, file: { url } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: 0, message: "Upload failed" });
  }
};

export const uploadNoteFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: 0, message: "No file uploaded" });
    const url = await handleUpload(req.file, "notes/files", "raw");
    res.json({ success: 1, file: { url, name: req.file.originalname, size: req.file.size } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: 0, message: "Upload failed" });
  }
};

/* ------------------------- FETCH URL ------------------------- */
export const fetchUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ success: 0, message: "Missing URL" });

    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const getMeta = (name) => $(`meta[property='${name}']`).attr("content") || $(`meta[name='${name}']`).attr("content");

    res.json({
      success: 1,
      meta: {
        title: getMeta("og:title") || $("title").text() || url,
        description: getMeta("description") || getMeta("og:description") || "",
        image: { url: getMeta("og:image") || "" },
      },
    });
  } catch (err) {
    console.error(err);
    res.json({ success: 0 });
  }
};


