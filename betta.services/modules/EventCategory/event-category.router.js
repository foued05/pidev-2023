var express = require("express");
var router = express.Router();
const {
  listData,
  addData,
  updateData,
  getData,
  getDataByName,
  deleteData,
  searchData,
  restoreData,
} = require("./event-category.service");
const { addDto, updateDto } = require("./event-category.dto");

// list event categories
router.get("/list", listData);

// get event category by _id
router.get("/:id", getData);

// get event category by name
router.get("/name/:name", getDataByName);

//search event category
router.post("/search", searchData);

// create event category
router.post("/add", addDto, addData);

// update event category
router.post("/update/:id", updateDto, updateData);

// delete event category
router.post("/delete/:id", deleteData);

// restore event category
router.post("/restore/:id", restoreData);

module.exports = router;
