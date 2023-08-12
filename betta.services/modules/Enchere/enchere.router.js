const express = require("express");
const router = express.Router();
const {
  getAllEncheres,
  getEnchereById,
  createEnchere,
  updateEnchere,
  deleteEnchere,
} = require("./enchere.service");

// List enchères
router.get("/list", getAllEncheres);

// Get enchère by ID
router.get("/:id", getEnchereById);

// Create enchère
router.post("/add", createEnchere);

// Update enchère
router.post("/update/:id", updateEnchere);

// Delete enchère
router.post("/delete/:id", deleteEnchere);

module.exports = router;
