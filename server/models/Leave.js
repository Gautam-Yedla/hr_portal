import mongoose from "mongoose";
import { Schema } from "mongoose";

const leaveSchema = new Schema(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    leaveType: {
      type: String,
      enum: [
        "Sick Leave",
        "Casual Leave",
        "Maternity Leave",
        "Paternity Leave",
        "Emergency Leave",
        "Annual Leave",
      ],
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    appliedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

leaveSchema.virtual("days").get(function () {
  return Math.ceil(
    (this.endDate - this.startDate) / (1000 * 60 * 60 * 24) + 1
  );
});

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
