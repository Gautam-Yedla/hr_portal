// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // Resolve the directory path
// const form16Dir = path.join("E:", "hr_sample", "uploads", "form16");

// // Ensure the directory exists
// if (!fs.existsSync(form16Dir)) {
//   fs.mkdirSync(form16Dir, { recursive: true });
// }

// // Storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, form16Dir); // ✅ Uses resolved path
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
//   },
// });

// // Allow only PDF files
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "application/pdf") {
//     cb(null, true);
//   } else {
//     cb(new Error("Only PDF files are allowed!"), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Max size: 5MB
// });

// export default upload;
