const mongoose = require("mongoose");
const productCategorySchema = new mongoose.Schema(
  {
    productCategoryName: {
      type: String,
      required: true,
    },
    productCategoryDescription: {
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
  { collection: "ProductCategory" },
  { timestamps: true }
);

const productCategory = mongoose.model("ProductCategory", productCategorySchema);
module.exports = productCategory;
