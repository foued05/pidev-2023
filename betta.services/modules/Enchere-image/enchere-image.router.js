const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  listData,
  listDataByEnchere,
  listDataByMain,
  getData,
  addData,
  deleteData,
  restoreData,
  updateData,
  downloadData,
} = require("./article-image.service");
const { addDto, updateDto } = require("./article-image.dto");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/enchere");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});
// Multer upload configuration
const upload = multer({ storage: storage });

// List enchere images
router.get("/list", listData);

// List enchere images by Main
router.get("/main", listDataByMain);

// Get enchere image by _id
router.get("/:id", getData);

// List enchere images by enchere
router.get("/enchere/:enchere", listDataByEnchere);

// Upload enchere image
router.post("/upload", upload.single("image"), addDto, addData);

// Download enchere image
router.get("/download/:filename", downloadData);

// Update enchere image
router.post("/update/:id", updateDto, updateData);

// Delete enchere image
router.post("/delete/:id", deleteData);

// Restore enchere image
router.post("/restore/:id", restoreData);

module.exports = router;
