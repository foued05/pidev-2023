var express = require("express");
var router = express.Router();
const {
  listData,
  listDataByUser,
  listDataByEvent,
  getData,
  addData,
  deleteData,
  restoreData,
} = require("./event-interest.service");
const { addDto } = require("./event-interest.dto");

// list event interests 
router.get("/list", listData);

// get event interest by _id
router.get("/:id", getData);

// get event interest by user
router.get("/user/:user", listDataByUser);

// get event interest by event
router.get("/event/:event", listDataByEvent);

// create event interest
router.post("/add", addDto, addData);

// delete event interest
router.post("/delete/:id", deleteData);

// restore event interest
router.post("/restore/:id", restoreData);

module.exports = router;
