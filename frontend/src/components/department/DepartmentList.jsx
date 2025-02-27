import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSearch, FaPlus } from "react-icons/fa";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  InputAdornment,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://hr-sample-backend.onrender.com/api/department", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: <DepartmentButtons _id={dep._id} onDepartmentDelete={() => handleDeleteRequest(dep._id)} />,
        }));
        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to load departments", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Open delete confirmation dialog
  const handleDeleteRequest = (id) => {
    setSelectedDepartmentId(id);
    setDeleteDialogOpen(true);
  };

  // Confirm delete and remove department
  // const confirmDelete = async () => {
  //   setDeleteDialogOpen(false);

  //   if (!selectedDepartmentId) {
  //       console.error("No department ID selected for deletion.");
  //       return;
  //   }

  //   console.log("Attempting to delete department with ID:", selectedDepartmentId);

  //   try {
  //       const response = await axios.delete(`https://hr-sample-backend.onrender.com/api/department/${selectedDepartmentId}`, {
  //           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       });

  //       console.log("Delete Response:", response.data);

  //       if (response.data.success) {
  //           // Remove department from state
  //           setDepartments((prev) => prev.filter(dep => dep._id !== selectedDepartmentId));
  //           setFilteredDepartments((prev) => prev.filter(dep => dep._id !== selectedDepartmentId));

  //           setSnackbar({ open: true, message: "Department deleted successfully", severity: "success" });
  //       } else {
  //           setSnackbar({ open: true, message: response.data.message || "Failed to delete department", severity: "error" });
  //       }
  //   } catch (error) {
  //       console.error("Error deleting department:", error?.response?.data || error);

  //       setSnackbar({
  //           open: true,
  //           message: error?.response?.data?.error || "Error deleting department",
  //           severity: "error",
  //       });
  //   } finally {
  //       setSelectedDepartmentId(null);
  //   }
  // };

  const confirmDelete = async () => {
    setDeleteDialogOpen(false);

    if (!selectedDepartmentId) return;

    console.log("Attempting to delete department with ID:", selectedDepartmentId);

    try {
        const response = await axios.delete(`https://hr-sample-backend.onrender.com/api/department/${selectedDepartmentId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        console.log("Delete response:", response.data);

        setDepartments((prev) => prev.filter(dep => dep._id !== selectedDepartmentId));
        setFilteredDepartments((prev) => prev.filter(dep => dep._id !== selectedDepartmentId));

        setSnackbar({ open: true, message: "Department deleted successfully", severity: "success" });
    } catch (error) {
        console.error("Error deleting department:", error.response?.data || error.message);
        setSnackbar({ open: true, message: "Error deleting department", severity: "error" });
    } finally {
        setSelectedDepartmentId(null);
    }
  };



  // Filter department list
  const filterDepartments = (e) => {
    const query = e.target.value.toLowerCase();
    setFilteredDepartments(departments.filter((dep) => dep.dep_name.toLowerCase().includes(query)));
  };

  return (
    <Grid container justifyContent="center" style={{ minHeight: "100vh", backgroundColor: "#f5f7fa", padding: "2rem" }}>
      {loading ? (
        <Grid item xs={12} style={{ textAlign: "center", marginTop: "10%" }}>
          <CircularProgress size={50} />
          <Typography variant="h6" style={{ marginTop: "1rem" }}>
            Loading Departments...
          </Typography>
        </Grid>
      ) : (
        <Grid item xs={12} md={10} lg={8}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Paper elevation={4} style={{ padding: "2rem", borderRadius: "12px" }}>
              {/* Title */}
              <Typography variant="h4" align="center" gutterBottom>
                Manage Departments
              </Typography>

              {/* Search & Add Button */}
              <Grid container spacing={2} alignItems="center" style={{ marginBottom: "1.5rem" }}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search Department..."
                    onChange={filterDepartments}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaSearch />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={4} style={{ textAlign: "right" }}>
                  <Button
                    component={Link}
                    to="/admin-dashboard/add-department"
                    variant="contained"
                    color="primary"
                    startIcon={<FaPlus />}
                    fullWidth
                    size="large"
                  >
                    Add Department
                  </Button>
                </Grid>
              </Grid>

              {/* Data Table with Infinite Scrolling */}
              <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                <DataTable
                  columns={columns}
                  data={filteredDepartments}
                  highlightOnHover
                  striped
                  noHeader
                  customStyles={{
                    rows: {
                      highlightOnHoverStyle: {
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                        cursor: "pointer",
                      },
                    },
                    headCells: {
                      style: {
                        fontSize: "1rem",
                        fontWeight: "bold",
                        backgroundColor: "#1976d2",
                        color: "#fff",
                      },
                    },
                    cells: {
                      style: {
                        fontSize: "0.95rem",
                        padding: "12px",
                        borderBottom: "1px solid #e0e0e0",
                      },
                    },
                  }}
                />
              </div>
            </Paper>
          </motion.div>
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography id="delete-dialog-description">Are you sure you want to delete this department?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default DepartmentList;
