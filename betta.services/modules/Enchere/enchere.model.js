const mongoose = require("mongoose");
const enchereSchema = new mongoose.Schema(
  {
    enchereName: {
      type: String,
      required: true,
    },
    enchereDescription: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    stopTime: {
      type: Date,
      required: true,
    },
    enchereArticles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "EnchereArticle",
    }],
    isDeleted: {
      type: Boolean,
    },
    
  },
  { timestamps: true }
);

const Enchere = mongoose.model("Enchere", enchereSchema);

module.exports = Enchere;
