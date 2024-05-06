const multer = require('multer');

// Multer disk storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/JSI/OneDrive/Desktop/Server/Freelance-portal-/images/'); // Destination folder for storing uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Filename format
  }
});

// Multer upload middleware configuration for single file uploads
const upload = multer({ storage: storage }).single('image');

module.exports = upload;
