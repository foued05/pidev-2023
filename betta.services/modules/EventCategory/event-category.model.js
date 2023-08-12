const mongoose = require("mongoose");
const eventCategorySchema = new mongoose.Schema(
  {
    eventCategoryName: {
      type: String,
      required: true,
    },
    eventCategoryDescription: {
      type: String,
      default: "not-set",
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
  { collection: "EventCategory" },
  { timestamps: true }
);

const eventCategory = mongoose.model("EventCategory", eventCategorySchema);
module.exports = eventCategory;
