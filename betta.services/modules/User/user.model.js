const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { boolean } = require("yup");
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    creationDate: {
      type: Date,
      required: true,
      default: new Date(),
    },
    roleId: {
      type: ObjectId,
      required: true,
      default: "64995f838d45ca23421826d3"
    },
    improved: {
      type: Boolean,
      required: true,
      default: false
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
  { collection: "User" },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);
module.exports = user;
