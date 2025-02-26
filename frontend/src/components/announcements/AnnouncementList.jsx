import React, { useEffect, useState } from "react";
import { fetchAnnouncements, deleteAnnouncement } from "../../utils/AnnouncementHelper";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAnnouncements = async () => {
      const data = await fetchAnnouncements();
      setAnnouncements(data);
    };
    loadAnnouncements();
  }, []);

  const handleDelete = async () => {
    if (selectedId) {
      await deleteAnnouncement(selectedId);
      setAnnouncements((prev) => prev.filter((ann) => ann._id !== selectedId));
      setOpenDialog(false);
      setSelectedId(null);
    }
  };

  const openDeleteDialog = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const closeDeleteDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          📢 Announcements
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => navigate("/admin-dashboard/announcements/add")}
        >
          Add Announcement
        </Button>
      </Box>

      {announcements.length ? (
        <Grid container spacing={3}>
          {announcements.map((ann) => (
            <Grid item xs={12} key={ann._id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {ann.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {ann.description.substring(0, 100)}...
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                    📅 Created: {new Date(ann.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>

                <CardActions>
                  <IconButton color="primary" onClick={() => navigate(`/admin-dashboard/announcements/${ann._id}`)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="warning" onClick={() => navigate(`/admin-dashboard/announcements/edit/${ann._id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => openDeleteDialog(ann._id)}>
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          No announcements found.
        </Typography>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this announcement? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AnnouncementList;












