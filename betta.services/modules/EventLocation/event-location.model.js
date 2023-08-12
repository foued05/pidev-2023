const mongoose = require("mongoose");
const eventLocationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: false,
    },
    eventLocationLatitude: {
      type: Number,
    },
    eventLocationLongitude: {
      type: Number,
    },
    eventAddress: {
      type: String,
      required: true,
    },
    eventCountry: {
      type: String,
      required: true,
    },
    eventCity: {
      type: String,
      required: true,
    },
    eventRegion: {
      type: String,
      required: true,
    },
    eventLocationImage: {
      type: String,
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
  { collection: "EventLocation" },
  { timestamps: true }
);

const eventLocation = mongoose.model("EventLocation", eventLocationSchema);
module.exports = eventLocation;
