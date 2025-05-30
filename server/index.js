import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import salaryRouter from './routes/salary.js';
import leaveRouter from './routes/leave.js';
import settingRouter from './routes/setting.js';
import dashboardRouter from './routes/dashboard.js';
import announcementRoutes from "./routes/announcementRoutes.js";
import fileUpload from 'express-fileupload';

import connectToDatabase from './db/db.js'

import dotenv from "dotenv";
dotenv.config();


connectToDatabase();

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static('public/uploads'))

app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/setting', settingRouter)
app.use('/api/dashboard', dashboardRouter)
// app.use("/api/payment", paymentRoutes);
app.use(fileUpload());  // Middleware to parse form-data

app.use("/api/announcements", announcementRoutes);



const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`🚀 Server is Running on port ${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error(" Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error(" Unhandled Promise Rejection:", err);
});