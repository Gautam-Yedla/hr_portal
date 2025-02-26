// import Announcement from "../models/Announcement.js";
// import path from "path";
// import fs from "fs";

// // ➤ Create Announcement
// export const createAnnouncement = async (req, res) => {
//   try {
//     const { title, description, departments, expiryDate, isImportant } = req.body;

//     const announcement = new Announcement({
//       title,
//       description,
//       departments: JSON.parse(departments), // Assuming departments is sent as JSON string
//       expiryDate,
//       isImportant: isImportant === "true", // Convert string to boolean
//       form16File: req.file ? req.file.filename : null,
//       createdBy: req.user.id,
//     });

//     await announcement.save();
//     res.status(201).json({ success: true, message: "Announcement created", announcement });
//   } catch (error) {
//     console.error("Error creating announcement:", error);
//     res.status(500).json({ success: false, message: "Error creating announcement", error });
//   }
// };

// // ➤ Get All Announcements
// export const getAnnouncements = async (req, res) => {
//   try {
//     const { departmentId } = req.query;

//     const filter = { isActive: true };
//     if (departmentId) filter.departments = departmentId;

//     const announcements = await Announcement.find(filter)
//       .populate("createdBy", "name")
//       .populate("departments", "dep_name")
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, announcements });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error fetching announcements", error });
//   }
// };

// // ➤ Get Single Announcement
// export const getAnnouncementById = async (req, res) => {
//   try {
//     const announcement = await Announcement.findById(req.params.id)
//       .populate("createdBy", "name")
//       .populate("departments", "dep_name");

//     if (!announcement) {
//       return res.status(404).json({ success: false, message: "Announcement not found" });
//     }

//     res.status(200).json({ success: true, announcement });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error fetching announcement", error });
//   }
// };

// // ➤ Update Announcement
// export const updateAnnouncement = async (req, res) => {
//   try {
//     const { title, description, departments, expiryDate, isImportant } = req.body;

//     const updateData = {
//       title,
//       description,
//       departments: departments ? JSON.parse(departments) : undefined,
//       expiryDate,
//       isImportant: isImportant === "true",
//     };

//     if (req.file) {
//       updateData.form16File = req.file.filename;
//     }

//     const updatedAnnouncement = await Announcement.findByIdAndUpdate(req.params.id, updateData, { new: true });

//     if (!updatedAnnouncement) {
//       return res.status(404).json({ success: false, message: "Announcement not found" });
//     }

//     res.status(200).json({ success: true, message: "Announcement updated", updatedAnnouncement });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error updating announcement", error });
//   }
// };

// // ➤ Delete Announcement
// export const deleteAnnouncement = async (req, res) => {
//   try {
//     const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);

//     if (!deletedAnnouncement) {
//       return res.status(404).json({ success: false, message: "Announcement not found" });
//     }

//     // Delete associated Form 16 file if exists
//     if (deletedAnnouncement.form16File) {
//       const filePath = path.join("uploads/form16/", deletedAnnouncement.form16File);
//       fs.unlink(filePath, (err) => {
//         if (err) console.error("Error deleting Form 16 file:", err);
//       });
//     }

//     res.status(200).json({ success: true, message: "Announcement deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error deleting announcement", error });
//   }
// };

// // ➤ Download Form 16
// export const downloadForm16 = (req, res) => {
//   const filename = req.params.filename;
//   const filePath = path.join("uploads/form16/", filename);

//   fs.access(filePath, fs.constants.F_OK, (err) => {
//     if (err) {
//       return res.status(404).json({ success: false, message: "File not found" });
//     }
//     res.download(filePath);
//   });
// };













import Announcement from "../models/Announcement.js";
import path from "path";
import fs from "fs";

// ➤ Create Announcement
export const createAnnouncement = async (req, res) => {
  try {
    const { title, description, departments, expiryDate, isImportant } = req.body;

    // ✅ Safely parse departments
    let parsedDepartments = [];
    try {
      parsedDepartments = departments ? JSON.parse(departments) : [];
    } catch (parseError) {
      console.error("Error parsing departments:", parseError);
      return res.status(400).json({ success: false, message: "Invalid departments format" });
    }

    const announcement = new Announcement({
      title,
      description,
      departments: parsedDepartments,
      expiryDate,
      isImportant: isImportant === "true",
      form16File: req.file ? req.file.filename : null,
      createdBy: req.user.id,
    });

    await announcement.save();
    res.status(201).json({ success: true, message: "Announcement created", announcement });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ success: false, message: "Error creating announcement", error });
  }
};

// ➤ Get All Announcements
export const getAnnouncements = async (req, res) => {
  try {
    const { departmentId } = req.query;

    const filter = { isActive: true };
    if (departmentId) filter.departments = departmentId;

    const announcements = await Announcement.find(filter)
      .populate("createdBy", "name")
      .populate("departments", "dep_name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, announcements });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ success: false, message: "Error fetching announcements", error });
  }
};

// ➤ Get Single Announcement
export const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate("createdBy", "name")
      .populate("departments", "dep_name");

    if (!announcement) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }

    res.status(200).json({ success: true, announcement });
  } catch (error) {
    console.error("Error fetching announcement:", error);
    res.status(500).json({ success: false, message: "Error fetching announcement", error });
  }
};

// ➤ Update Announcement
export const updateAnnouncement = async (req, res) => {
  try {
    const { title, description, departments, expiryDate, isImportant } = req.body;

    // ✅ Safely parse departments
    let parsedDepartments = [];
    try {
      parsedDepartments = departments ? JSON.parse(departments) : [];
    } catch (parseError) {
      console.error("Error parsing departments:", parseError);
      return res.status(400).json({ success: false, message: "Invalid departments format" });
    }

    const updateData = {
      title,
      description,
      departments: parsedDepartments,
      expiryDate,
      isImportant: isImportant === "true",
    };

    if (req.file) {
      updateData.form16File = req.file.filename;
    }

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedAnnouncement) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }

    res.status(200).json({ success: true, message: "Announcement updated", updatedAnnouncement });
  } catch (error) {
    console.error("Error updating announcement:", error);
    res.status(500).json({ success: false, message: "Error updating announcement", error });
  }
};

// ➤ Delete Announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);

    if (!deletedAnnouncement) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }

    // ✅ Delete associated Form 16 file if exists
    if (deletedAnnouncement.form16File) {
      const filePath = path.join("E:/hr_sample/server/uploads/form16/", deletedAnnouncement.form16File);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting Form 16 file:", err);
      });
    }

    res.status(200).json({ success: true, message: "Announcement deleted" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ success: false, message: "Error deleting announcement", error });
  }
};

// ➤ Download Form 16
// ➤ Download Form 16
export const downloadForm16 = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join("E:/hr_sample/server/uploads/form16/", filename);
  console.log("Resolved Path:", path.resolve(filePath));


  console.log("Downloading File:", filePath); // 🟢 Log the full path

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("File not found or inaccessible:", err); // Log detailed error
      return res.status(404).json({ success: false, message: "File not found" });
    }

    res.download(filePath, (downloadErr) => {
      if (downloadErr) {
        console.error("Error during file download:", downloadErr); // Log download errors
        return res.status(500).json({ success: false, message: "Error downloading file" });
      }
    });
  });
};
