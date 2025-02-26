// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   role: { type: String, required: true, enum: ['admin', 'employee'] },
//   profileImage: { type: String },
//   createAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// })

// const User = mongoose.model("User", userSchema)
// export default User
















import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'employee'] },
  profileImage: { type: String },
  phone: { type: String },
  securityQuestion: { type: String },
  securityAnswer: { type: String },
  notifications: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    push: { type: Boolean, default: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const User = mongoose.model("User", userSchema)
export default User
