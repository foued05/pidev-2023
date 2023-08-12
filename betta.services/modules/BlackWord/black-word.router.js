var express = require("express");
var router = express.Router();
const {
  listData,
  getData,
  getDataByWord,
  addData,
  deleteData,
  restoreData,
} = require("./black-word.service");
const { addDto } = require("./black-word.dto");

// list black words 
router.get("/list", listData);

// get black word by _id
router.get("/:id", getData);

// get black word by black
router.get("/black/:word", getDataByWord);

// create black word
router.post("/add", addDto, addData);

// delete black word
router.post("/delete/:id", deleteData);

// restore black word
router.post("/restore/:id", restoreData);

module.exports = router;
