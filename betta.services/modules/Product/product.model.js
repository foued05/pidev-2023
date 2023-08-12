const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      default: "not-set",
      required: false,
    },
    productOriginalPrice: {
      type: Number,
      required: true,
    },
    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: false,
    },
    isBought: {
      type: Boolean,
      default: false,
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
  { collection: "Product" },
  { timestamps: true }
);

const product = mongoose.model("Product", productSchema);
module.exports = product;
