// import React, { useEffect, useState } from "react";
// import { fetchAnnouncementById, updateAnnouncement } from "../../utils/AnnouncementHelper";
// import { useNavigate, useParams } from "react-router-dom";

// const EditAnnouncement = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [announcement, setAnnouncement] = useState({
//     title: "",
//     description: "",
//     expiryDate: "",
//   });

//   useEffect(() => {
//     const loadAnnouncement = async () => {
//       const data = await fetchAnnouncementById(id);
//       setAnnouncement(data);
//     };
//     loadAnnouncement();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAnnouncement((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await updateAnnouncement(id, announcement);
//     navigate("/admin-dashboard/announcements");
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">✏️ Edit Announcement</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={announcement.title}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded-lg"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium">Description</label>
//           <textarea
//             name="description"
//             value={announcement.description}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded-lg"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium">Expiry Date</label>
//           <input
//             type="date"
//             name="expiryDate"
//             value={announcement.expiryDate}
//             onChange={handleChange}
//             className="w-full border p-2 rounded-lg"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//         >
//           Save Changes
//         </button>

//         <button
//           type="button"
//           onClick={() => navigate("/admin-dashboard/announcements")}
//           className="w-full mt-3 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
//         >
//           Cancel
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditAnnouncement;










import React, { useEffect, useState } from "react";
import { fetchAnnouncementById, updateAnnouncement } from "../../utils/AnnouncementHelper";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid
} from "@mui/material";

const EditAnnouncement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
    expiryDate: "",
  });

  useEffect(() => {
    const loadAnnouncement = async () => {
      const data = await fetchAnnouncementById(id);
      setAnnouncement(data);
    };
    loadAnnouncement();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAnnouncement(id, announcement);
    navigate("/admin-dashboard/announcements");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 6 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          ✏️ Edit Announcement
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={announcement.title}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={announcement.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
            margin="normal"
          />

          <TextField
            fullWidth
            type="date"
            label="Expiry Date"
            name="expiryDate"
            value={announcement.expiryDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Save Changes
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/admin-dashboard/announcements")}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditAnnouncement;

