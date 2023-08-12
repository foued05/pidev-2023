const mongoose = require("mongoose");

const enchereImageSchema = new mongoose.Schema(
  {
    enchere: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enchere",
      required: false,
    },
    enchereImageName: {
      type: String,
      required: true,
    },
    enchereImagePath: {
      type: String,
      required: true,
    },
    enchereImageAlt: {
      type: String,
      default: "enchere image",
      required: false,
    },
    isMain: {
      type: Boolean,
      default: false,
      required: false,
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
  { collection: "EnchereImage" },
  { timestamps: true }
);

const EnchereImage = mongoose.model("EnchereImage", enchereImageSchema);
module.exports = EnchereImage;
