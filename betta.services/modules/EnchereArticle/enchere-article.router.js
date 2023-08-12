const express = require("express");
const router = express.Router();
const {
  getAllEnchereArticles,
  getEnchereArticleById,
  createEnchereArticle,
  updateEnchereArticle,
  deleteEnchereArticle,
} = require("./enchere-article.service");

// List enchere-articles
router.get("/list", getAllEnchereArticles);

// Get enchere-article by ID
router.get("/:id", getEnchereArticleById);

// Create enchere-article
router.post("/add", createEnchereArticle);

// Update enchere-article
router.put("/update/:id", updateEnchereArticle);

// Delete enchere-article
router.delete("/:id", deleteEnchereArticle);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = router;
