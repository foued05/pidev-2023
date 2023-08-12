var express = require("express");
var router = express.Router();
const {
  listData,
  listDataByArticle,
  listDataByMain,
  getData,
  addData,
  deleteData,
  restoreData,
  updateData,
  downloadData,
} = require("./article-image.service");
const { addDto, updateDto } = require("./article-image.dto");

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/article');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

// list article images 
router.get("/list", listData);


// list article image by Main
router.get("/main", listDataByMain);

// get article image by _id
router.get("/:id", getData);

// list article image by article
router.get("/article/:article", listDataByArticle);

// upload article image
router.post("/upload",upload.single('image'),addDto, addData);

// download article image
router.get('/download/:filename',downloadData);

// update article image
router.post("/update", updateDto, updateData);

// delete article image
router.post("/delete/:id", deleteData);

// restore article image
router.post("/restore/:id", restoreData);

module.exports = router;
