import axios from "axios";

const API_URL = "http://localhost:5000/api/announcements";

// ➤ Get All Announcements
export const fetchAnnouncements = async () => {
  const { data } = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return data.announcements;
};

// ➤ Get Single Announcement
export const fetchAnnouncementById = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return data.announcement;
};

// ➤ Create Announcement
export const createAnnouncement = async (announcementData) => {
  const { data } = await axios.post(API_URL, announcementData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data", // ✅ Important for file uploads
    },
  });
  return data;
};


// ➤ Update Announcement
export const updateAnnouncement = async (id, announcementData) => {
  const { data } = await axios.put(`${API_URL}/${id}`, announcementData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data", // ✅ Important for file uploads
    },
  });
  return data;
};

// ➤ Delete Announcement
export const deleteAnnouncement = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return data;
};
