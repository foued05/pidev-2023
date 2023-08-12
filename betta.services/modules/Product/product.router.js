var express = require("express");
var router = express.Router();
const {
  listData,
  addData,
  updateData,
  getData,
  getDataByName,
  deleteData,
  searchData,
  restoreData,
} = require("./product.service");
const { addDto, updateDto } = require("./product.dto");

// list product
router.get("/list", listData);

// get product by _id
router.get("/:id", getData);

// get product by name
router.get("/name/:name", getDataByName);

//search product
router.post("/search", searchData);

// create product
router.post("/add", addDto, addData);

// update product
router.post("/update/:id", updateDto, updateData);

// delete product
router.post("/delete/:id", deleteData);

// restore product
router.post("/restore/:id", restoreData);

module.exports = router;
