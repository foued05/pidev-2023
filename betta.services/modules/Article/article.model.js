const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema(
  {
    articleTitle: {
      type: String,
      required: false,
    },
    articleText: {
      type: String,
      required: false,
    },
    isPrivate: {
      type: Boolean,
      default: false,
      required: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
      required: true,
    },
    creationDate: {
      type: Date,
      required: true,
      default: new Date(),
    },
    createdBy: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { collection: "Article" },
  { timestamps: true }
);

const article = mongoose.model("Article", articleSchema);
module.exports = article;
