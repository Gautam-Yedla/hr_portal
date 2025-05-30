import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  Paper,
  Modal,
  Button,
  Avatar,
  Chip,
} from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "react-qr-code";
import axios from "axios";
// import signature from "../../assets/kovalty_logo.png"
import logo from "../../assets/kovalty_sample_logo-Photoroom.png";

const PayslipTemplate = ({ open, handleClose, payslipData, fetchSalaries }) => {

  const payslipRef = useRef();
  
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      if (payslipData?.employeeId?._id) {
        setLoadingDetails(true);
        try {
          const response = await axios.get(
            `http://localhost:5000/api/employee/${payslipData.employeeId._id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.data.success) {
            setEmployeeDetails(response.data.employee.userId);
          }
        } catch (err) {
          console.error("Failed to fetch employee details", err);
        } finally {
          setLoadingDetails(false);
        }
      }
    };

    fetchEmployeeDetails();
  }, [payslipData]);


  if (!payslipData) return null;

  const {
    employeeId,
    basicSalary,
    allowances,
    deductions,
    netSalary,
    paymentStatus,
    payDate,
    _id,
  } = payslipData;

  const downloadPayslip = async () => {
    try {
      const element = payslipRef.current;
      const canvas = await html2canvas(element, {
        scale: 3, // higher scale
        useCORS: true,
        scrollY: -window.scrollY, // prevent shifting
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Payslip-${employeeId?.name || "Employee"}.pdf`);
    } catch (err) {
      alert("Error downloading payslip");
    }
  };
   

  const markAsPaid = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/salary/mark-paid/${payslipData._id}`,
        { status: "paid" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        alert("Salary marked as paid & email sent successfully!");
        handleClose();
        // Update local data without waiting for fetch
        // payslipData.paymentStatus = "paid";
        fetchSalaries(); // Refresh data
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error marking salary as paid");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          maxWidth: "900px",
          mx: "auto",
          my: 4,
          outline: "none",
          p: 2,
        }}
      >
        <Paper
          ref={payslipRef}
          sx={{
            p: 4,
            border: "1px solid #ccc",
            position: "relative",
            backgroundColor: "#f9fafb",
            fontFamily: "Roboto, sans-serif",
          }}
          elevation={3}
        >
          {/* Watermark */}
          <Box
            component="img"
            src={logo}
            alt="Company Logo"
            sx={{
              position: "absolute",
              opacity: 0.12,
              width: "1000px",
              top: "20%",
              zIndex: 0,
              transform: "rotate(-30deg)",
              pointerEvents: "none",
            }}
          />

          {/* Header */}
          <Grid container alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs={3}>
              <Box component="img" src={logo} alt="Company Logo" sx={{ width: "200px" }} />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h6" fontWeight="bold" textAlign="right">
                KOVALTY TECHNOLOGIES LLP
              </Typography>
              <Typography variant="body2" textAlign="right">
                Plot No 54, Tripura Landmark-II, Bowrampet, Hyderabad - 500043
              </Typography>
              <Typography variant="body2" textAlign="right">
                CIN: ACH-7113 | PAN: ABCFK2148L
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 2 }} />

          <Typography
            variant="subtitle1"
            textAlign="center"
            fontWeight="bold"
            sx={{ mb: 2 }}
          >
            PAYSLIP FOR THE MONTH OF{" "}
            {new Date(payDate).toLocaleString("default", { month: "long", year: "numeric" })}
          </Typography>

          {/* Employee & Payment Details */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" fontWeight="bold">
                Employee Details:
              </Typography>
              <Typography variant="body2">Name: {employeeDetails?.name || "Loading..."}</Typography>
              <Typography variant="body2">Employee ID: {employeeId?._id}</Typography>
              <Typography variant="body2">Email: {employeeDetails?.email || "N/A"}</Typography>
              <Typography variant="body2">Status: {paymentStatus}</Typography>
              <Box
                sx={{
                  display: "inline-block",
                  backgroundColor: paymentStatus === "paid" ? "green" : "red",
                  color: "#fff",
                  px: 1,
                  py: 0.5,
                  borderRadius: "4px",
                  fontSize: "12px",
                  mt: 1,
                }}
              >
                {paymentStatus?.toUpperCase() || "PENDING"}
              </Box>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Avatar
                src={`http://localhost:5000/${employeeDetails?.photo}`}
                alt="Employee"
                sx={{ width: 70, height: 70, mb: 1, ml: "auto" }}
              />
              <QRCode
                value={`EmpID: ${employeeId?._id}, Name: ${employeeId?.name}, Status: ${paymentStatus}`}
                size={80}
              />
            </Grid>
          </Grid>

          {/* Salary Breakdown Table */}
          <Table size="small" sx={{ mb: 2, border: "1px solid #ddd" }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                <TableCell colSpan={2} align="center">
                  <strong>Earnings</strong>
                </TableCell>
                <TableCell colSpan={2} align="center">
                  <strong>Deductions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Basic Pay</TableCell>
                <TableCell>₹{basicSalary}</TableCell>
                <TableCell>Professional Tax</TableCell>
                <TableCell>₹{deductions}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Allowances</TableCell>
                <TableCell>₹{allowances}</TableCell>
                <TableCell colSpan={2}></TableCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
                <TableCell>
                  <strong>Net Salary</strong>
                </TableCell>
                <TableCell colSpan={3}>
                  <strong>₹{netSalary}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Footer */}
          <Typography variant="body2" sx={{ mb: 1 }}>
            Amount In Words: <strong>{netSalary} Rupees Only</strong>
          </Typography>

          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="body2">
                Pay Date: {new Date(payDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item textAlign="center">
            <Box
                component="img"
                src={logo} 
                alt="Signature"
                sx={{ width: "130px", mt: 1 }}
              />
              <Divider sx={{ width: "150px",mt: 0, mx: "auto"}} />
              <Typography variant="body2">Authorized Signature</Typography>
            </Grid>
          </Grid>

          <Typography
            variant="caption"
            display="block"
            textAlign="center"
            sx={{ mt: 3, fontStyle: "italic" }}
          >
            -- This is a system-generated document. No signature required. --
          </Typography>
        </Paper>

        {/* Buttons */}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={downloadPayslip}>
            Download
          </Button>
          {paymentStatus !== "paid" && (
            <Button variant="contained" color="success" onClick={markAsPaid}>
              Mark as Paid
            </Button>
          )}
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

PayslipTemplate.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  payslipData: PropTypes.object,
  fetchSalaries: PropTypes.func,
  employeeDetails: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    photo: PropTypes.string,
    employeeId: PropTypes.string,
  }),
};

export default PayslipTemplate;
