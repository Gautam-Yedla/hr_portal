// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Typography,
//   CircularProgress,
//   Box,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import PaymentIcon from "@mui/icons-material/Payment";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";

// const SalaryList = () => {
//   const [salaries, setSalaries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedSalary, setSelectedSalary] = useState(null);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchSalaries();
//   }, []);

//   const fetchSalaries = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/salary", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });

//       setSalaries(response.data.salaries || []);
//     } catch (error) {
//       console.error(" Error fetching salaries:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMarkAsPaid = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/salary/mark-paid/${id}`, {}, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });

//       fetchSalaries(); // Refresh list
//     } catch (error) {
//       console.error(" Error marking salary as paid:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this salary record?")) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/salary/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });

//       fetchSalaries(); 
//     } catch (error) {
//       console.error(" Error deleting salary:", error);
//     }
//   };

 
//   const openPaymentModal = (salary) => {
//     setSelectedSalary(salary);
//     setShowPaymentModal(true);
//   };

//   return (
//     <Box sx={{ maxWidth: "80%", margin: "auto", mt: 4, p: 3 }}>
//       {/* Page Header */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h5" fontWeight="bold">
//           Salary List
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           color="primary"
//           onClick={() => navigate("/admin-dashboard/salary/add")}
//           sx={{
//             boxShadow: 3,
//             padding: "6px 16px",
//             backgroundColor: "#4CAF50",
//             "&:hover": {
//               backgroundColor: "#388E3C",
//             },
//           }}
//         >
//           Add Salary
//         </Button>
//       </Box>

//       {/* Loading Indicator */}
//       {loading ? (
//         <Box display="flex" justifyContent="center" alignItems="center" height="200px">
//           <CircularProgress />
//         </Box>
//       ) : (
//         <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 2, boxShadow: 5 }}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ bgcolor: "#f5f5f5" }}>
//                 <TableCell>#</TableCell>
//                 <TableCell>Employee ID</TableCell>
//                 <TableCell>Employee Name</TableCell>
//                 <TableCell>Basic Salary</TableCell>
//                 <TableCell>Net Salary</TableCell>
//                 <TableCell>Pay Date</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {salaries.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={8} align="center">
//                     No salary records found.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 salaries.map((salary, index) => {
//                   const emp = salary.employeeId || {};
//                   return (
//                     <TableRow key={salary._id} hover>
//                       <TableCell>{index + 1}</TableCell>
//                       <TableCell>{emp.employeeId || "N/A"}</TableCell>
//                       <TableCell>{emp.userId?.name || "Unknown"}</TableCell>
//                       <TableCell>${salary.basicSalary || "0.00"}</TableCell>
//                       <TableCell>
//                         <Typography fontWeight="bold">${salary.netSalary || "0.00"}</Typography>
//                       </TableCell>
//                       <TableCell>{salary.payDate?.split("T")[0] || "N/A"}</TableCell>
//                       <TableCell>
//                         <Typography
//                           sx={{
//                             px: 2,
//                             py: 1,
//                             borderRadius: 2,
//                             bgcolor: salary.status === "Paid" ? "green" : "red",
//                             color: "white",
//                           }}
//                         >
//                           {salary.status}
//                         </Typography>
//                       </TableCell>
//                       <TableCell>
//                         {/* Action Buttons with better spacing */}
//                         <Box display="flex" justifyContent="flex-start" alignItems="center" gap={1}>
//                           <Button
//                             variant="contained"
//                             size="small"
//                             startIcon={<EditIcon />}
//                             color="warning"
//                             onClick={() => navigate(`/salary/edit/${salary._id}`)}
//                             sx={{
//                               backgroundColor: "#FF9800",
//                               "&:hover": { backgroundColor: "#F57C00" },
//                             }}
//                           >
//                             Edit
//                           </Button>

//                           <Button
//                             variant="contained"
//                             size="small"
//                             startIcon={<DeleteIcon />}
//                             color="error"
//                             onClick={() => handleDelete(salary._id)}
//                             sx={{
//                               backgroundColor: "#F44336",
//                               "&:hover": { backgroundColor: "#D32F2F" },
//                             }}
//                           >
//                             Delete
//                           </Button>

//                           {salary.status !== "Paid" && (
//                             <Button
//                               variant="contained"
//                               size="small"
//                               startIcon={<PaymentIcon />}
//                               color="primary"
//                               onClick={() => openPaymentModal(salary)}
//                               sx={{
//                                 backgroundColor: "#1976D2",
//                                 "&:hover": { backgroundColor: "#1565C0" },
//                               }}
//                             >
//                               Pay Now
//                             </Button>
//                           )}
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Payment Modal */}
//       <Dialog open={showPaymentModal} onClose={() => setShowPaymentModal(false)}>
//         <DialogTitle>Select Payment Method</DialogTitle>
//         <DialogContent>
//           <Typography variant="body1" mb={2}>
//             Pay salary for {selectedSalary?.employeeId?.userId?.name} (${selectedSalary?.netSalary})
//           </Typography>

//           {/* Payment Methods */}
//           <Box display="flex" justifyContent="space-around" flexWrap="wrap" gap={2}>
//             <Button
//               variant="contained"
//               color="secondary"
//               sx={{
//                 width: "150px",
//                 height: "50px",
//                 backgroundColor: "#00C5B8",
//                 "&:hover": {
//                   backgroundColor: "#00A09D",
//                 },
//               }}
//             >
//               Pay with PhonePe
//             </Button>

//             <Button
//               variant="contained"
//               color="primary"
//               sx={{
//                 width: "150px",
//                 height: "50px",
//                 backgroundColor: "#6200EE",
//                 "&:hover": {
//                   backgroundColor: "#3700B3",
//                 },
//               }}
//             >
//               Pay with UPI
//             </Button>

//             <Button
//               variant="contained"
//               color="success"
//               sx={{
//                 width: "150px",
//                 height: "50px",
//                 backgroundColor: "#4CAF50",
//                 "&:hover": {
//                   backgroundColor: "#388E3C",
//                 },
//               }}
//             >
//               Pay with QR
//             </Button>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setShowPaymentModal(false)} color="inherit">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default SalaryList;















import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const SalaryList = () => {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/salary", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setSalaries(response.data.salaries || []);
    } catch (error) {
      console.error(" Error fetching salaries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this salary record?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/salary/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      fetchSalaries(); 
    } catch (error) {
      console.error(" Error deleting salary:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: "80%", margin: "auto", mt: 4, p: 3 }}>
      {/* Page Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Salary List
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
          onClick={() => navigate("/admin-dashboard/salary/add")}
          sx={{
            boxShadow: 3,
            padding: "6px 16px",
            backgroundColor: "#4CAF50",
            "&:hover": {
              backgroundColor: "#388E3C",
            },
          }}
        >
          Add Salary
        </Button>
      </Box>

      {/* Loading Indicator */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 2, boxShadow: 5 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell>#</TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell>Employee Name</TableCell>
                <TableCell>Basic Salary</TableCell>
                <TableCell>Net Salary</TableCell>
                <TableCell>Pay Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salaries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No salary records found.
                  </TableCell>
                </TableRow>
              ) : (
                salaries.map((salary, index) => {
                  const emp = salary.employeeId || {};
                  return (
                    <TableRow key={salary._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{emp.employeeId || "N/A"}</TableCell>
                      <TableCell>{emp.userId?.name || "Unknown"}</TableCell>
                      <TableCell>${salary.basicSalary || "0.00"}</TableCell>
                      <TableCell>
                        <Typography fontWeight="bold">${salary.netSalary || "0.00"}</Typography>
                      </TableCell>
                      <TableCell>{salary.payDate?.split("T")[0] || "N/A"}</TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            bgcolor: salary.status === "Paid" ? "green" : "red",
                            color: "white",
                          }}
                        >
                          {salary.status}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {/* Action Buttons */}
                        <Box display="flex" justifyContent="flex-start" alignItems="center" gap={1}>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<EditIcon />}
                            color="warning"
                            onClick={() => navigate(`/salary/edit/${salary._id}`)}
                            sx={{
                              backgroundColor: "#FF9800",
                              "&:hover": { backgroundColor: "#F57C00" },
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<DeleteIcon />}
                            color="error"
                            onClick={() => handleDelete(salary._id)}
                            sx={{
                              backgroundColor: "#F44336",
                              "&:hover": { backgroundColor: "#D32F2F" },
                            }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default SalaryList;

