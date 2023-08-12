const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { boolean } = require("yup");
const forumSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    creationDate: {
      type: Date,
      required: true,
      default: new Date(),
    },
    userId: {
      type: ObjectId,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
  },
  { collection: "Forum" },
  { timestamps: true }
);

const forum = mongoose.model("Forum", forumSchema);
module.exports = forum;
