var express = require("express");
var router = express.Router();
const {
  listData,
  listDataByEvent,
  listDataByMain,
  getData,
  addData,
  deleteData,
  restoreData,
  updateData,
  downloadData,
} = require("./event-image.service");
const { addDto, updateDto } = require("./event-image.dto");

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/event');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

// list event images 
router.get("/list", listData);


// list event image by Main
router.get("/main", listDataByMain);

// get event image by _id
router.get("/:id", getData);

// list event image by Event
router.get("/event/:event", listDataByEvent);

// upload event image
router.post("/upload",upload.single('image'),addDto, addData);

// download event image
router.get('/download/:filename',downloadData);

// update event image
router.post("/update", updateDto, updateData);

// delete event image
router.post("/delete/:id", deleteData);

// restore event image
router.post("/restore/:id", restoreData);

module.exports = router;
