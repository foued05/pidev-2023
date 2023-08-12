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
} = require("./product-category.service");
const { addDto, updateDto } = require("./product-category.dto");

// list product categories
router.get("/list", listData);

// get product category by _id
router.get("/:id", getData);

// get product category by name
router.get("/name/:name", getDataByName);

//search product category
router.post("/search", searchData);

// create product category
router.post("/add", addDto, addData);

// update product category
router.post("/update/:id", updateDto, updateData);

// delete product category
router.post("/delete/:id", deleteData);

// restore product category
router.post("/restore/:id", restoreData);

module.exports = router;
