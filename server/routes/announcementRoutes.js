import express from "express";
import {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
  downloadForm16
} from "../controller/announcementController.js";
import authMiddleware from "../middleware/authMiddleware.js";
// import upload from "../middleware/upload.js";

const router = express.Router();

// ➤ Routes
// router.post("/", authMiddleware, upload.single("form16File"), createAnnouncement);   // Create


router.get("/", authMiddleware, getAnnouncements);    // Get All
router.get("/:id", authMiddleware, getAnnouncementById);  // Get Single


// router.put("/:id", authMiddleware, upload.single("form16File"), updateAnnouncement); // Update


router.delete("/:id", authMiddleware, deleteAnnouncement);    // Delete


// router.get("/download/form16/:filename", downloadForm16);          // Download Form 16

export default router;
