var express = require("express");
var router = express.Router();
const {
  listData,addData,getData
} = require("./dons.service");


// list dons 
router.get("/list", listData);

// add dons
router.post("/adddons",addData);

// get by id
router.get("/:id", getData);

module.exports = router;