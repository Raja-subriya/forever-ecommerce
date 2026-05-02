import multer from "multer";

// Store uploaded images in memory (buffer) before sending to Cloudinary
// diskStorage would save to disk first — memoryStorage is faster for cloud uploads
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;