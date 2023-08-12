var express = require("express");
var router = express.Router();
const {addData, listData, deleteData} = require("./forum.service");

router.post("/add", addData);
router.get("/list", listData);
router.get("/delete/:id", deleteData)

module.exports = router;