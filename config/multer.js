const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = Date.now() + ext;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb("Error: Only image files are allowed!");
    }
  },
});

module.exports = upload;
