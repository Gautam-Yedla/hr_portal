





// import axios from "axios";
// import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../../context/authContext";
// import PayslipTemplate from "./PayslipTemplate";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import {
//   Box,
//   Typography,
//   Select,
//   MenuItem,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Button,
//   Grid,
//   Paper,
//   CircularProgress,
// } from "@mui/material";

// const View = () => {
//   const [salaries, setSalaries] = useState(null);
//   const [filteredSalaries, setFilteredSalaries] = useState(null);
//   const [selectedSalary, setSelectedSalary] = useState(null);
//   const { id } = useParams();
//   const { user } = useAuth();
//   const payslipRef = useRef();

//   const fetchSalaries = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/salary/${id}/${user.role}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (response.data.success) {
//         setSalaries(response.data.salary);
//         setFilteredSalaries(response.data.salary);
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Error fetching salary data");
//     }
//   };

//   const [filters, setFilters] = useState({
//     search: "",
//     status: "all",
//     startDate: "",
//     endDate: "",
//   });

//   useEffect(() => {
//     fetchSalaries();
//   }, []);

//   useEffect(() => {
//     if (!salaries) return;
//     let filtered = salaries.filter((salary) => {
//       const employeeName = salary.employeeId?.name?.toLowerCase() || "";
//       const salaryStatus = salary.paymentStatus
//         ? salary.paymentStatus.toLowerCase()
//         : "pending";
//       return (
//         employeeName.includes(filters.search.toLowerCase()) &&
//         (filters.status === "all" || salaryStatus === filters.status) &&
//         (!filters.startDate ||
//           new Date(salary.payDate) >= new Date(filters.startDate)) &&
//         (!filters.endDate ||
//           new Date(salary.payDate) <= new Date(filters.endDate))
//       );
//     });
//     setFilteredSalaries(filtered);
//   }, [filters, salaries]);

//   const markAsPaid = async (salaryId) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/salary/mark-paid/${salaryId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (response.data.success) {
//         alert("Salary marked as paid & email sent successfully!");
//         fetchSalaries();
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Error marking salary as paid");
//     }
//   };

//   const downloadPayslip = async (salary) => {
//     setSelectedSalary(salary);

//     setTimeout(async () => {
//       if (!payslipRef.current) {
//         alert("Payslip not rendered!");
//         return;
//       }

//       try {
//         const canvas = await html2canvas(payslipRef.current, {
//           scale: 2,
//           useCORS: true,
//         });
//         const imgData = canvas.toDataURL("image/png");

//         const pdf = new jsPDF("p", "mm", "a4");
//         const imgProps = pdf.getImageProperties(imgData);
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//         pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//         pdf.save(`Payslip-${salary.employeeId?.name || "Employee"}.pdf`);
//       } catch (err) {
//         console.error("PDF Error:", err);
//         alert("Error generating PDF: " + err.message);
//       } finally {
//         setSelectedSalary(null);
//       }
//     }, 300);
//   };

//   return (
//     <Box p={4}>
//       <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
//         Salary History
//       </Typography>

//       {/* Filters */}
//       <Grid container spacing={2} mb={3}>
//         <Grid item xs={12} sm={4}>
//           <Select
//             fullWidth
//             size="small"
//             value={filters.status}
//             onChange={(e) =>
//               setFilters({ ...filters, status: e.target.value })
//             }
//           >
//             <MenuItem value="all">All Status</MenuItem>
//             <MenuItem value="paid">Paid</MenuItem>
//             <MenuItem value="pending">Pending</MenuItem>
//           </Select>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField
//             fullWidth
//             size="small"
//             type="date"
//             onChange={(e) =>
//               setFilters({ ...filters, startDate: e.target.value })
//             }
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField
//             fullWidth
//             size="small"
//             type="date"
//             onChange={(e) =>
//               setFilters({ ...filters, endDate: e.target.value })
//             }
//           />
//         </Grid>
//       </Grid>

//       {/* Table */}
//       {filteredSalaries ? (
//         filteredSalaries.length > 0 ? (
//           <Paper elevation={3}>
//             <Table>
//               <TableHead
//                 sx={{ background: "linear-gradient(to right, #38b2ac, #4299e1)" }}
//               >
//                 <TableRow>
//                   <TableCell>SNO</TableCell>
//                   <TableCell>Emp Id</TableCell>
//                   <TableCell>Basic Salary</TableCell>
//                   <TableCell>Allowance</TableCell>
//                   <TableCell>Deductions</TableCell>
//                   <TableCell>Total</TableCell>
//                   <TableCell>Pay Date</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredSalaries.map((salary, index) => (
//                   <TableRow key={salary._id} hover>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>
//                       {salary.employeeId.name || salary.employeeId._id}
//                     </TableCell>
//                     <TableCell>{salary.basicSalary}</TableCell>
//                     <TableCell>{salary.allowances}</TableCell>
//                     <TableCell>{salary.deductions}</TableCell>
//                     <TableCell>{salary.netSalary}</TableCell>
//                     <TableCell>
//                       {new Date(salary.payDate).toLocaleDateString()}
//                     </TableCell>
//                     <TableCell>
//                       <Typography
//                         color={
//                           salary.paymentStatus === "paid" ? "green" : "red"
//                         }
//                         fontWeight="bold"
//                       >
//                         {salary.paymentStatus
//                           ? salary.paymentStatus.toUpperCase()
//                           : "Pending"}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         size="small"
//                         variant="contained"
//                         color="primary"
//                         sx={{ mr: 1 }}
//                         onClick={() => downloadPayslip(salary)}
//                       >
//                         Download
//                       </Button>
//                       {salary.paymentStatus === "pending" && (
//                         <Button
//                           size="small"
//                           variant="contained"
//                           color="success"
//                           onClick={() => markAsPaid(salary._id)}
//                         >
//                           Mark as Paid
//                         </Button>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Paper>
//         ) : (
//           <Typography align="center" color="text.secondary" mt={4}>
//             No Salary Records Found
//           </Typography>
//         )
//       ) : (
//         <Box textAlign="center" mt={4}>
//           <CircularProgress />
//           <Typography color="text.secondary" mt={2}>
//             Loading...
//           </Typography>
//         </Box>
//       )}

//       {/* Hidden Payslip */}
//       <div
//         style={{
//           position: "absolute",
//           left: "-9999px",
//           opacity: 0,
//           pointerEvents: "none",
//         }}
//       >
//         {selectedSalary && (
//           <div ref={payslipRef}>
//             <PayslipTemplate salary={selectedSalary} />
//           </div>
//         )}
//       </div>
//     </Box>
//   );
// };

// export default View;









import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import PayslipTemplate from "./PayslipTemplate";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";

const View = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    startDate: "",
    endDate: "",
  });

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/salary/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error fetching salary data");
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  useEffect(() => {
    if (!salaries) return;
    let filtered = salaries.filter((salary) => {
      const employeeName = salary.employeeId?.name?.toLowerCase() || "";
      const status = salary.paymentStatus
        ? salary.paymentStatus.toLowerCase()
        : "pending";
      return (
        employeeName.includes(filters.search.toLowerCase()) &&
        (filters.status === "all" || status === filters.status) &&
        (!filters.startDate ||
          new Date(salary.payDate) >= new Date(filters.startDate)) &&
        (!filters.endDate ||
          new Date(salary.payDate) <= new Date(filters.endDate))
      );
    });
    setFilteredSalaries(filtered);
  }, [filters, salaries]);

  const handlePreview = (salary) => {
    setSelectedSalary(salary);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedSalary(null);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        Salary History
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={3}>
          <Select
            fullWidth
            size="small"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search by name"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
          />
        </Grid>
      </Grid>

      {/* Salary Table */}
      {filteredSalaries ? (
        filteredSalaries.length > 0 ? (
          <Paper elevation={3}>
            <Table>
              <TableHead
                sx={{ background: "linear-gradient(to right, #38b2ac, #4299e1)" }}
              >
                <TableRow>
                  <TableCell>SNO</TableCell>
                  <TableCell>Employee</TableCell>
                  <TableCell>Basic</TableCell>
                  <TableCell>Allowance</TableCell>
                  <TableCell>Deductions</TableCell>
                  <TableCell>Net</TableCell>
                  <TableCell>Pay Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSalaries.map((salary, index) => (
                  <TableRow key={salary._id} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {salary.employeeId.name || salary.employeeId._id}
                    </TableCell>
                    <TableCell>{salary.basicSalary}</TableCell>
                    <TableCell>{salary.allowances}</TableCell>
                    <TableCell>{salary.deductions}</TableCell>
                    <TableCell>{salary.netSalary}</TableCell>
                    <TableCell>
                      {new Date(salary.payDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Typography
                        color={
                          salary.paymentStatus === "paid" ? "green" : "red"
                        }
                        fontWeight="bold"
                      >
                        {salary.paymentStatus
                          ? salary.paymentStatus.toUpperCase()
                          : "Pending"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        sx={{ mr: 1 }}
                        onClick={() => handlePreview(salary)}
                      >
                        Preview
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        ) : (
          <Typography align="center" color="text.secondary" mt={4}>
            No Salary Records Found
          </Typography>
        )
      ) : (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
          <Typography color="text.secondary" mt={2}>
            Loading...
          </Typography>
        </Box>
      )}

      {/* Payslip Modal */}
      <PayslipTemplate
        open={openModal}
        handleClose={handleClose}
        payslipData={selectedSalary}
        fetchSalaries={fetchSalaries}
      />
    </Box>
  );
};

export default View;
