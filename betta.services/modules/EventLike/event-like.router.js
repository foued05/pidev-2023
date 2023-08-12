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
} = require("./event-like.service");
const { addDto } = require("./event-like.dto");

// list event likes 
router.get("/list", listData);

// get event like by _id
router.get("/:id", getData);

// get event like by user
router.get("/user/:user", listDataByUser);

// get event like by event
router.get("/event/:event", listDataByEvent);

// create event like
router.post("/add", addDto, addData);

// delete event like
router.post("/delete/:id", deleteData);

// restore event like
router.post("/restore/:id", restoreData);

module.exports = router;
