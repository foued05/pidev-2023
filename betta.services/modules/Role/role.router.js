var express = require("express");
var router = express.Router();
const {
  listData,
  addData,
  getData
} = require("./role.service");

// list users 
router.get("/list", listData);

// get user by _id
router.get("/:id", getData);

// create user
router.post("/add", addData);

module.exports = router;
