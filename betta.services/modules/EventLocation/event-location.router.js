var express = require("express");
var router = express.Router();
const {
  listData,
  listDataByCity,
  listDataByRegion,
  listDataByCountry,
  getData,
  addData,
  deleteData,
  restoreData,
  updateData,
} = require("./event-location.service");
const { addDto, updateDto } = require("./event-location.dto");

// list event locations 
router.get("/list", listData);

// get event location by _id
router.get("/:id", getData);

// list event location by country
router.get("/country/:country", listDataByCountry);

// list event location by city
router.get("/city/:city", listDataByCity);

// list event location by region
router.get("/region/:region", listDataByRegion);

// create event location
router.post("/add", addDto, addData);

// update event location
router.post("/update", updateDto, updateData);

// delete event location
router.post("/delete/:id", deleteData);

// restore event location
router.post("/restore/:id", restoreData);

module.exports = router;
