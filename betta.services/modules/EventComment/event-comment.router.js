var express = require("express");
var router = express.Router();
const {
  listData,
  listDataByUser,
  listDataByEvent,
  getData,
  addData,
  updateData,
  deleteData,
  restoreData,
  searchData,
} = require("./event-comment.service");
const { updateDto, addDto } = require("./event-comment.dto");

// list event comments 
router.get("/list", listData);

// get event comment by _id
router.get("/:id", getData);

// get event comment by user
router.get("/user/:user", listDataByUser);

// get event comment by event
router.get("/event/:event", listDataByEvent);

// search event comment
router.post("/search", searchData);

// create event comment
router.post("/add", addDto, addData);

// update event comment
router.post("/update/:id", updateDto, updateData);

// delete event comment
router.post("/delete/:id", deleteData);

// restore event comment
router.post("/restore/:id", restoreData);

module.exports = router;
