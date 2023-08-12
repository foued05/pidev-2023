var express = require("express");
var router = express.Router();
const {
  getDataByTitle,
  listDataByPrivacy,
  listDataByPublic,
  getData,
  addData,
  deleteData,
  restoreData,
  listDataByArchive,
  listData,
} = require("./article.service");
const { addDto } = require("./article.dto");

// list articles 
router.get("/list", listData);

// list article by privacy
router.get("/private", listDataByPrivacy);

// list article by public
router.get("/public", listDataByPublic);

// list article by archive
router.get("/archive", listDataByArchive);

// get article by _id
router.get("/:id", getData);

// get article by title
router.get("/title/:title", getDataByTitle);

// create article
router.post("/add", addDto, addData);

// delete article
router.post("/delete/:id", deleteData);

// restore article
router.post("/restore/:id", restoreData);

module.exports = router;
