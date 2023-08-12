const mongoose = require("mongoose");
const eventImageSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: false,
    },
    eventImageName: {
      type: String,
      required: true,
    },
    eventImagePath: {
      type: String,
      required: true,
    },
    eventImageAlt: {
      type: String,
      default: "event image",
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
  { collection: "EventImage" },
  { timestamps: true }
);

const eventImage = mongoose.model("EventImage", eventImageSchema);
module.exports = eventImage;
