// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import QRCode from "qrcode.react"; // 📌 QR Code Generator
// import { Box, Typography, Button, CircularProgress, Paper, TextField } from "@mui/material";
// import { loadScript } from "../../utils/loadScript.js"; // Helper for loading scripts

// const SalaryPayment = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [salary, setSalary] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [upiId, setUpiId] = useState(""); // For UPI ID Payment
//   const [upiQr, setUpiQr] = useState(""); // For UPI QR Code Payment
//   const [qrVisible, setQrVisible] = useState(false); // Toggle QR Code
//   const razorpayKey = "rzp_test_DcYjNhp77aYIg5"; // Replace with your Razorpay Key ID

//   useEffect(() => {
//     fetchSalaryDetails();
//   }, []);

//   const fetchSalaryDetails = async () => {
//     try {
//       const response = await axios.get(`https://hr-sample-backend.onrender.com/api/salary/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setSalary(response.data.salary);
//     } catch (error) {
//       console.error("❌ Error fetching salary details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Mark as Paid (For Cash/Bank Transfers)
//   const handleMarkAsPaid = async () => {
//     try {
//       await axios.put(`https://hr-sample-backend.onrender.com/api/salary/mark-paid/${id}`, {}, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });

//       alert("✅ Salary marked as paid!");
//       navigate("/admin-dashboard/salary");
//     } catch (error) {
//       console.error("❌ Error marking salary as paid:", error);
//     }
//   };

//   // ✅ Razorpay Payment Gateway
//   const handleRazorpayPayment = async () => {
//     if (!salary) return;

//     const options = {
//       key: razorpayKey,
//       amount: salary.netSalary * 100, // Amount in paise
//       currency: "INR",
//       name: "Company Name",
//       description: `Salary Payment for ${salary.employeeId?.userId?.name}`,
//       handler: async function (response) {
//         alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
//         handleMarkAsPaid();
//       },
//       prefill: {
//         email: "employee@example.com",
//         contact: "9876543210",
//       },
//       theme: {
//         color: "#1976D2",
//       },
//     };

//     const razorpayScriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

//     if (!razorpayScriptLoaded) {
//       alert("Failed to load Razorpay SDK");
//       return;
//     }

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   // ✅ Direct UPI Payment via UPI ID
//   const handleUPIIntent = () => {
//     if (!upiId) {
//       alert("Please enter a valid UPI ID");
//       return;
//     }

//     const upiLink = `upi://pay?pa=${upiId}&pn=Company&mc=1234&tid=123456789&tr=123456789&tn=Salary Payment&am=${salary.netSalary}&cu=INR`;
//     window.location.href = upiLink;
//   };

//   // ✅ Generate UPI QR Code
//   const generateUpiQr = () => {
//     if (!salary) return;

//     const qrData = `upi://pay?pa=company@upi&pn=Company&mc=1234&tid=123456789&tr=123456789&tn=Salary Payment&am=${salary.netSalary}&cu=INR`;
//     setUpiQr(qrData);
//     setQrVisible(true);
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!salary) {
//     return (
//       <Box textAlign="center" mt={4}>
//         <Typography variant="h6" color="error">
//           Salary record not found.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ maxWidth: "600px", margin: "auto", mt: 5, p: 3 }}>
//       <Paper elevation={4} sx={{ p: 3, borderRadius: 2 }}>
//         <Typography variant="h5" fontWeight="bold" mb={2}>
//           Pay Salary
//         </Typography>

//         <Typography variant="body1">Employee: <strong>{salary.employeeId?.userId?.name || "Unknown"}</strong></Typography>
//         <Typography variant="body1">Net Salary: <strong>₹{salary.netSalary || "0.00"}</strong></Typography>
//         <Typography variant="body1">Pay Date: <strong>{salary.payDate?.split("T")[0] || "N/A"}</strong></Typography>

//         <Box mt={3} display="flex" flexDirection="column" gap={2}>
//           {/* ✅ Razorpay Payment */}
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ backgroundColor: "#1976D2", "&:hover": { backgroundColor: "#1565C0" } }}
//             onClick={handleRazorpayPayment}
//           >
//             Pay with Razorpay
//           </Button>

//           {/* ✅ Direct UPI Intent */}
//           <TextField
//             label="Enter UPI ID (e.g., xyz@upi)"
//             variant="outlined"
//             fullWidth
//             value={upiId}
//             onChange={(e) => setUpiId(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//           <Button
//             variant="contained"
//             color="secondary"
//             sx={{ backgroundColor: "#00C5B8", "&:hover": { backgroundColor: "#00A09D" } }}
//             onClick={handleUPIIntent}
//           >
//             Pay via UPI ID
//           </Button>

//           {/* ✅ Generate UPI QR Code */}
//           <Button
//             variant="contained"
//             color="info"
//             sx={{ backgroundColor: "#FF9800", "&:hover": { backgroundColor: "#F57C00" } }}
//             onClick={generateUpiQr}
//           >
//             Generate UPI QR Code
//           </Button>

//           {qrVisible && (
//             <Box display="flex" justifyContent="center" mt={2}>
//               <QRCode value={upiQr} size={200} />
//             </Box>
//           )}

//           {/* ✅ Mark as Paid (Cash/Bank Transfer) */}
//           <Button
//             variant="contained"
//             color="success"
//             sx={{ backgroundColor: "#4CAF50", "&:hover": { backgroundColor: "#388E3C" } }}
//             onClick={handleMarkAsPaid}
//           >
//             Mark as Paid (Cash/Bank Transfer)
//           </Button>
//         </Box>

//         <Button onClick={() => navigate("/admin-dashboard/salary")} sx={{ mt: 2 }}>
//           Back to Salary List
//         </Button>
//       </Paper>
//     </Box>
//   );
// };

// export default SalaryPayment;












// // const razorpayKey = "rzp_test_DcYjNhp77aYIg5"; // Replace with your Razorpay key  sH9Z7TKQTUOPhhgMQoTc4DZ7