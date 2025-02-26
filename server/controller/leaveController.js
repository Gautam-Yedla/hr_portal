import nodemailer from "nodemailer";
import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import mongoose from "mongoose";



const addLeave = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const { userId, leaveType, startDate, endDate, reason } = req.body;
    const employee = await Employee.findOne({ userId });

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();

    return res
      .status(201)
      .json({ success: true, message: "Leave request submitted successfully" });
  } catch (error) {
    console.error("Error adding leave:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while adding leave" });
  }
};




// const getLeave = async (req, res) => {
//   try {
//     const { id, role } = req.params;
//     let leaves;

//     if (role === "admin") {
//       leaves = await Leave.find().populate({
//         path: "employeeId",
//         populate: { path: "userId", select: "name" },
//       });
//     } else {
//       const employee = await Employee.findOne({ userId: id });
//       if (!employee) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Employee not found" });
//       }
//       leaves = await Leave.find({ employeeId: employee._id });
//     }

//     return res.status(200).json({ success: true, leaves });
//   } catch (error) {
//     console.error("Error fetching leaves:", error.message);
//     return res
//       .status(500)
//       .json({ success: false, message: "Server error while fetching leaves" });
//   }
// };


const getLeave = async (req, res) => {
  try {
    const {id, role} = req.params;
    let leaves
    // let leaves = await Leave.findById({employeeId: id})
    if(role === 'admin') {
     leaves = await Leave.find({ employeeId: id });

    }else {

    // if(!leaves){
    //   const employee = await Employee.findOne({userId: id})
    //   leaves = await Leave.find({employeeId: employee._id})
    // }
    // If no leaves found, check if it's a userId and fetch the employeeId

   
      const employee = await Employee.findOne({ userId: id });
      if (!employee) {
        return res.status(404).json({ success: false, message: 'Employee not found' });
      }
      leaves = await Leave.find({ employeeId: employee._id });
    }
    
    return res.status(200).json({success: true, leaves})

  }catch (error) {
    console.error("Error fetching leaves:", error.message);
    return res.status(500).json({success: false, message: "leave add Server error "})
  }
}




const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: { path: "userId", select: "name profileImage" },
    });

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("Error fetching leaves:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error while fetching leaves" });
  }
};







const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received Leave ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const leave = await Leave.findById(id).populate({
      path: "employeeId",
      populate: { path: "userId", select: "name profileImage" },
    });

    if (!leave) {
      console.error("No leave found with ID:", id);
      return res.status(404).json({ success: false, message: "Leave not found" });
    }
    
    console.log("Leave details fetched successfully:", leave);
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    console.error("Error fetching leave details:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching leave details",
    });
  }
};






const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const adminId = req.user.id; // Get logged-in admin's ID

    // Validate leave ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid leave ID" });
    }

    // Find the leave request
    const leave = await Leave.findById(id).populate({
      path: "employeeId",
      populate: { path: "userId", select: "name email" }, // Get employee's name & email
    });

    if (!leave) {
      return res.status(404).json({ success: false, message: "Leave not found" });
    }

    // Fetch admin's email
    const admin = await User.findById(adminId);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    // Update leave status
    leave.status = status;
    leave.updatedAt = Date.now();
    await leave.save();

    // Send Email Notification
    await sendLeaveNotification(admin.email, leave.employeeId.userId.email, leave, status);

    return res.status(200).json({ success: true, message: `Leave ${status} successfully` });
  } catch (error) {
    console.error("Error updating leave:", error);
    return res.status(500).json({ success: false, message: "Server error while updating leave" });
  }
};

// ✅ Function to Send Leave Approval/Rejection Email
// const sendLeaveNotification = async (adminEmail, employeeEmail, leave, status) => {
//   try {
//     // Create transporter using Gmail SMTP
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.GMAIL_USER, // Your Gmail address
//         pass: process.env.GMAIL_PASS, // Your App Password
//       },
//       secure: true, // Force secure connection (TLS)
//       tls: {
//         rejectUnauthorized: false, // Ignore self-signed certificate issues
//       },
//     });

//     // Email content
//     const mailOptions = {
//       from: adminEmail, // Logged-in admin's email
//       to: employeeEmail, // Employee's email
//       subject: `Leave Request ${status}`,
//       html: `
//         <h3>Leave Request ${status}</h3>
//         <p>Hello ${leave.employeeId.userId.name},</p>
//         <p>Your leave request for <b>${leave.leaveType}</b> from <b>${leave.startDate}</b> to <b>${leave.endDate}</b> has been <b>${status}</b>.</p>
//         <p>Regards,</p>
//         <p>${adminEmail} (HR Team)</p>
//       `,
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);
//     console.log(`Email sent to ${employeeEmail} for leave ${status}`);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };


const sendLeaveNotification = async (adminEmail, employeeEmail, leave, status) => {
  try {
    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_PASS, // Your App Password
      },
      secure: true, // Use TLS encryption
      tls: {
        rejectUnauthorized: false, // Ignore self-signed certificate issues
      },
    });

    const statusColor = status.toLowerCase() === "approved" ? "green" : "red";

    const mailOptions = {
      from: adminEmail,
      to: employeeEmail,
      subject: `Leave Request ${status.toUpperCase()} - HR Notification`,
      html: `
        <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; max-width: 600px; margin: auto;">
          <h2 style="background-color: #007bff; color: white; padding: 10px; text-align: center; margin: 0;">HR Leave Notification</h2>
          <p>Hello <strong>${leave.employeeId.userId.name}</strong>,</p>
          <p>Your leave request for <strong>${leave.leaveType}</strong> from <strong>${leave.startDate}</strong> to <strong>${leave.endDate}</strong> has been 
            <strong style="color: ${statusColor};">${status.toUpperCase()}</strong>.
          </p>
          <p style="text-align: center;">
            <a href="https://your-company-portal.com/leaves" style="background-color: #007bff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">View Leave Details</a>
          </p>
          <p>Regards,</p>
          <p><strong>HR Team</strong></p>
          <hr />
          <p style="font-size: 12px; color: gray;">This is an automated email. Please do not reply.</p>
        </div>
      `,
    };


    // Send Email and log results
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email Sent Successfully:");
    console.log(`   📧 To: ${employeeEmail}`);
    console.log(`   🏢 From (HR Admin): ${adminEmail}`);
    console.log(`   📅 Leave Type: ${leave.leaveType}`);
    console.log(`   🗓️ Leave Duration: ${leave.startDate} to ${leave.endDate}`);
    console.log(`   🚀 Status: ${status.toUpperCase()}`);
    console.log(`   📨 Message ID: ${info.messageId}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};






const deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findByIdAndDelete(id);
    if (!leave) {
      return res.status(404).json({ success: false, message: "Leave not found" });
    }

    return res.status(200).json({ success: true, message: "Leave deleted successfully" });
  } catch (error) {
    console.error("Error deleting leave:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting leave",
    });
  }
};

export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave, deleteLeave };
