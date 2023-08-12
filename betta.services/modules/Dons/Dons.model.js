const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const donsSchema = new mongoose.Schema(
  {
    Dons: {
      nom: {
        type: String,
        required: true,
      },
    },
    association: {
      type: String,
      required: true,
    },
    soldout: {
      type: Boolean,
      required: true,
    },
    url_image: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    userId: {
        type: ObjectId,
        required: true,
    }
  },
  { collection: "Dons", timestamps: true }
);

const Dons = mongoose.model("Dons", donsSchema);
module.exports = Dons;