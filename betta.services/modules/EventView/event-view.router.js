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
  listDataRecentByUser,
  listDataRecentByEvent,
} = require("./event-view.service");
const { addDto } = require("./event-view.dto");

// list event views 
router.get("/list", listData);

// get event view by _id
router.get("/:id", getData);

// list event views of events by user
router.get("/user-recent-views/:user", listDataRecentByUser);

// list event viewers of events by events
router.get("/event-recent-views/:event", listDataRecentByEvent);

// get event view by user
router.get("/user/:user", listDataByUser);

// get event view by event
router.get("/event/:event", listDataByEvent);

// list event views of events by user
router.get("/event/:event/recent-views", listDataRecentByEvent);

// create event view
router.post("/add", addDto, addData);

// delete event view
router.post("/delete/:id", deleteData);

// restore event view
router.post("/restore/:id", restoreData);

module.exports = router;
