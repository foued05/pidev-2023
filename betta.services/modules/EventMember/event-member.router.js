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
  approveEventPresence,
  confirmEventPresence,
  sendEventInvitation,
} = require("./event-member.service");
const { addDto } = require("./event-member.dto");

// list event members 
router.get("/list", listData);

// get event member by _id
router.get("/:id", getData);

// get event member by user
router.get("/user/:user", listDataByUser);

// get event member by event
router.get("/event/:event", listDataByEvent);

// create event member
router.post("/add", addDto, addData);

// sent event invitation to a member
router.post("/send-invitation/:user/:event", sendEventInvitation);

// approve event member
router.post("/approve/:user/:event", approveEventPresence);

// approve event member 
router.get("/confirm-presence/:user/:event", confirmEventPresence);

// delete event member
router.post("/delete/:id", deleteData);

// restore event member
router.post("/restore/:id", restoreData);

module.exports = router;
