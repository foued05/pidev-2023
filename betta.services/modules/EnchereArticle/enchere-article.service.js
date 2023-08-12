const EnchereArticle = require("./enchere-article.model");

// List enchere-articles
exports.getAllEnchereArticles = async (req, res, next) => {
  try {
    const enchereArticles = await EnchereArticle.find();
    res.json(enchereArticles);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve enchere-articles", details: error.message });
  }
};

// Get enchere-article by ID
exports.getEnchereArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enchereArticle = await EnchereArticle.findById(id);
    if (!enchereArticle) {
      return res.status(404).json({ error: "Enchere-article not found" });
    }
    res.json(enchereArticle);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve enchere-article", details: error.message });
  }
};

// Create enchere-article
exports.createEnchereArticle = async (req, res, next) => {
  try {
    const { articleTitle, articleText, isPrivate, createdBy } = req.body;
    const enchereArticle = new EnchereArticle({
      articleTitle,
      articleText,
      isPrivate,
      createdBy,
    });
    await enchereArticle.save();
    res.json(enchereArticle);
  } catch (error) {
    res.status(500).json({ error: "Failed to create enchere-article", details: error.message });
  }
};

// Update enchere-article
exports.updateEnchereArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { articleTitle, articleText, isPrivate } = req.body;
    const enchereArticle = await EnchereArticle.findById(id);
    if (!enchereArticle) {
      return res.status(404).json({ error: "Enchere-article not found" });
    }
    enchereArticle.articleTitle = articleTitle;
    enchereArticle.articleText = articleText;
    enchereArticle.isPrivate = isPrivate;
    await enchereArticle.save();
    res.json(enchereArticle);
  } catch (error) {
    res.status(500).json({ error: "Failed to update enchere-article", details: error.message });
  }
};

// Delete enchere-article
exports.deleteEnchereArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enchereArticle = await EnchereArticle.findById(id);
    if (!enchereArticle) {
      return res.status(404).json({ error: "Enchere-article not found" });
    }
    await enchereArticle.remove();
    res.json({ message: "Enchere-article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete enchere-article", details: error.message });
  }
};
