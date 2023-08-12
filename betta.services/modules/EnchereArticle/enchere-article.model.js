const mongoose = require("mongoose");

const enchereArticleSchema = new mongoose.Schema(
  {
    articleTitle: {
      type: String,
      required: true,
    },
    articleText: {
      type: String,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const EnchereArticle = mongoose.model("EnchereArticle", enchereArticleSchema);

module.exports = EnchereArticle;
