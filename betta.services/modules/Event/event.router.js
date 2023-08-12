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
  listDataByCategory,
  listDataByPrivacy,
  listDataByPublic,
  listDataByDate,
  listDataByState,
} = require("./event.service");
const { addDto, updateDto } = require("./event.dto");

// list event
router.get("/list", listData);

// list event by privacy
router.get("/private", listDataByPrivacy);

// list event by public
router.get("/public", listDataByPublic);

// get event by _id
router.get("/:id", getData);

// get event by name
router.get("/name/:name", getDataByName);

// list event by category
router.get("/category/:category", listDataByCategory);

// list event by state
router.get("/state/:state", listDataByState);

//search event
router.post("/search", searchData);

// list event by period ( date-range )
router.post("/period", listDataByDate);

// create event
router.post("/add", addDto, addData);

// update event
router.post("/update/:id", updateDto, updateData);

// delete event
router.post("/delete/:id", deleteData);

// restore event
router.post("/restore/:id", restoreData);

module.exports = router;
