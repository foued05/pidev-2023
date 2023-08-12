const mongoose = require("mongoose");
const eventLikeSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
  { collection: "EventLike" },
  { timestamps: true }
);

const eventLike = mongoose.model("EventLike", eventLikeSchema);
module.exports = eventLike;
