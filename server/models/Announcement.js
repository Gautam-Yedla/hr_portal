import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    departments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    expiryDate: { type: Date },
    isImportant: { type: Boolean, default: false },
    form16File: { type: String, default: null }, // ➤ Stores filename of uploaded Form 16
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Announcement", announcementSchema);
