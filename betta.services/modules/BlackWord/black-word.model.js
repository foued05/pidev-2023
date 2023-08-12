const mongoose = require("mongoose");
const blackWordSchema = new mongoose.Schema(
  {
    blackWord: {
      type: String,
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
  { collection: "BlackWord" },
  { timestamps: true }
);

const blackWord = mongoose.model("BlackWord", blackWordSchema);
module.exports = blackWord;
