import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addLeave,
  getLeave,
  getLeaves,
  getLeaveDetail,
  updateLeave,
  deleteLeave,
} from "../controller/leaveController.js";

const router = express.Router();

// Apply for Leave
router.post("/add", authMiddleware, addLeave);

// Get Leaves (For Employee/Admin)
router.get("/:id/:role", authMiddleware, getLeave);

// Get Leave Details
router.get("/:id", authMiddleware, getLeaveDetail);

// Get All Leaves (Admin)
router.get("/", authMiddleware, getLeaves);

// Update Leave Status
router.put("/:id", authMiddleware, updateLeave);

// Delete Leave (Admin Only)
router.delete("/:id", authMiddleware, deleteLeave);



export default router;






