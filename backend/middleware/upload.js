const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (isValid) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (jpg, jpeg, png, webp) are allowed'));
    }
  },
});

module.exports = upload;