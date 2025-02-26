// import mongoose from "mongoose";
// import { Schema } from "mongoose";

// const paymentSchema = new Schema({
//   employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
//   salaryId: { type: Schema.Types.ObjectId, ref: "Salary", required: true },
//   amount: { type: Number, required: true },
//   paymentMethod: { 
//     type: String, 
//     enum: ["Stripe", "PayPal", "Bank Transfer"], 
//     required: true 
//   },
//   transactionId: { type: String, required: true, unique: true },
//   status: { 
//     type: String, 
//     enum: ["Pending", "Paid", "Failed"], 
//     default: "Pending" 
//   },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// const Payment = mongoose.model("Payment", paymentSchema);

// export default Payment;
