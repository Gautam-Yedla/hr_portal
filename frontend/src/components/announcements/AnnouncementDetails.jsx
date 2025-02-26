import React, { useEffect, useState } from "react";
import { fetchAnnouncementById } from "../../utils/AnnouncementHelper";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
  Chip,
  Alert,
  Stack,
} from "@mui/material";
import { ArrowBack, Download, ErrorOutline } from "@mui/icons-material";

const AnnouncementDetails = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadAnnouncement = async () => {
      try {
        const data = await fetchAnnouncementById(id);
        setAnnouncement(data);
      } catch (err) {
        setError("Failed to fetch announcement. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadAnnouncement();
  }, [id]);



  useEffect(() => {
    if (announcement) {
      console.log("Form 16 File:", announcement.form16File); // 🟢 Check if file exists
    }
  }, [announcement]);

  // ➤ Loading State
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  // ➤ Error State
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Alert severity="error" icon={<ErrorOutline />}>
          {error}
        </Alert>
      </Box>
    );
  }

  // ➤ If no announcement found
  if (!announcement) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Alert severity="warning" icon={<ErrorOutline />}>
          Announcement not found.
        </Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {announcement.title}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            {announcement.description}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            {announcement.isImportant && <Chip label="Important" color="error" />}
            {announcement.departments?.map((dep) => (
              <Chip key={dep._id} label={dep.dep_name} color="primary" />
            ))}
          </Stack>

          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 3 }}>
            📅 Created on: {new Date(announcement.createdAt).toLocaleDateString()}
          </Typography>

          {announcement.expiryDate && (
            <Typography variant="caption" color="error" display="block">
              ⏰ Expires on: {new Date(announcement.expiryDate).toLocaleDateString()}
            </Typography>
          )}

          {/* ➤ Form 16 Download */}
          {announcement.form16File && (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Download />}
              href={`http://localhost:5000/api/announcements/download/form16/${announcement.form16File}`}
              sx={{ mt: 3 }}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!announcement.form16File) {
                  e.preventDefault();
                  alert("Form 16 file not available for download.");
                }
              }}
            >
              Download Form 16
            </Button>
          )}

          {/* ➤ Back Button */}
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            sx={{ mt: 4, ml: 2 }}
            onClick={() => navigate("/admin-dashboard/announcements")}
          >
            Back to Announcements
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AnnouncementDetails;
