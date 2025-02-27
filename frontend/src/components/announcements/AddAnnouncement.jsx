import React, { useState, useEffect } from "react";
import { createAnnouncement } from "../../utils/AnnouncementHelper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Chip,
  IconButton,
  CircularProgress,
  FormControl,
} from "@mui/material";
import { AddCircleOutline, AttachFile, Preview } from "@mui/icons-material";

const AddAnnouncement = () => {
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
    expiryDate: "",
    isImportant: false,
    targetDepartments: [],
    form16File: null,
  });

  const [departments, setDepartments] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch Departments on Mount
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoadingDepartments(true);
      try {
        const response = await axios.get("https://hr-sample-backend.onrender.com/api/department", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setDepartments(response.data.departments);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setLoadingDepartments(false);
      }
    };

    fetchDepartments();
  }, []);

  // Handle Form Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setAnnouncement((prev) => ({ ...prev, form16File: e.target.files[0] }));
  };

  const handleDepartmentsChange = (e) => {
    setAnnouncement((prev) => ({
      ...prev,
      targetDepartments: e.target.value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setAnnouncement((prev) => ({
      ...prev,
      isImportant: e.target.checked,
    }));
  };

  // ✅ Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", announcement.title);
    formData.append("description", announcement.description);
    formData.append("expiryDate", announcement.expiryDate);
    formData.append("isImportant", announcement.isImportant);
    formData.append("targetDepartments", JSON.stringify(announcement.targetDepartments));
    if (announcement.form16File) {
      formData.append("form16File", announcement.form16File);
    }

    await createAnnouncement(formData);
    navigate("/admin-dashboard/announcements");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            ➕ Add New Announcement
          </Typography>

          {previewMode ? (
            <>
              <Typography variant="h6">📋 Preview</Typography>
              <Typography><strong>Title:</strong> {announcement.title}</Typography>
              <Typography><strong>Description:</strong> {announcement.description}</Typography>
              <Typography><strong>Expiry Date:</strong> {announcement.expiryDate}</Typography>
              <Typography><strong>Important:</strong> {announcement.isImportant ? "Yes" : "No"}</Typography>
              <Typography>
                <strong>Departments:</strong>{" "}
                {announcement.targetDepartments
                  .map((deptId) => departments.find((d) => d._id === deptId)?.dep_name)
                  .join(", ")}
              </Typography>
              {announcement.form16File && (
                <Typography><strong>Attached File:</strong> {announcement.form16File.name}</Typography>
              )}

              <Box mt={2}>
                <Button variant="outlined" onClick={() => setPreviewMode(false)}>
                  Edit
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ ml: 2 }}>
                  Submit
                </Button>
              </Box>
            </>
          ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              <TextField
                label="Title"
                name="title"
                value={announcement.title}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />

              <TextField
                label="Description"
                name="description"
                value={announcement.description}
                onChange={handleChange}
                required
                multiline
                rows={4}
                fullWidth
                margin="normal"
              />

              <TextField
                label="Expiry Date"
                type="date"
                name="expiryDate"
                value={announcement.expiryDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
              />

              {/* ✅ Dynamic Departments Multi-Select Wrapped in FormControl */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="departments-label">Target Departments</InputLabel>
                {loadingDepartments ? (
                  <CircularProgress size={24} />
                ) : (
                  <Select
                    labelId="departments-label"
                    multiple
                    value={announcement.targetDepartments}
                    onChange={handleDepartmentsChange}
                    input={<OutlinedInput label="Departments" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((deptId) => (
                          <Chip
                            key={deptId}
                            label={departments.find((d) => d._id === deptId)?.dep_name || deptId}
                          />
                        ))}
                      </Box>
                    )}
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept._id} value={dept._id}>
                        {dept.dep_name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </FormControl>

              {/* Mark as Important */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={announcement.isImportant}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Mark as Important"
              />

              {/* File Upload */}
              <Button
                variant="outlined"
                component="label"
                startIcon={<AttachFile />}
                fullWidth
                sx={{ mb: 2 }}
              >
                Attach Form 16 (PDF)
                <input
                  type="file"
                  hidden
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </Button>

              {/* Preview & Submit */}
              <Box mt={3} display="flex" gap={2}>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<Preview />}
                  onClick={() => setPreviewMode(true)}
                  fullWidth
                >
                  Preview
                </Button>

                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  startIcon={<AddCircleOutline />}
                  onClick={handleSubmit}
                  fullWidth
                >
                  Create Announcement
                </Button>
              </Box>
            </form>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddAnnouncement;
