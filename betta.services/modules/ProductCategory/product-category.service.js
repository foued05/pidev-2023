const productCategoryModel = require("./product-category.model");

// list productCategories
exports.listData = async (req, res, next) => {
  try {
    const list = await productCategoryModel.find();
    if (list.length > 0) {
      res.status(200).json(list);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      productCategory: error.productCategory,
      error: error,
    });
  }
};

// get product category by _id
exports.getData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productCategory = await productCategoryModel.findOne({ _id: id });
    if (productCategory) {
      res.status(200).json(productCategory);
    } else {
      res.status(404).json("product Category doesn't exist Found");
    }
  } catch (error) {
    res.json({
      productCategory: error.productCategory,
      error: error,
    });
  }
};

// get product category by productCategoryName
exports.getDataByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const productCategory = await productCategoryModel.findOne({
      productCategoryName: name,
    });
    if (productCategory) {
      res.status(200).json(productCategory);
    } else {
      res.status(404).json("product Category doesn't exist Found");
    }
  } catch (error) {
    res.json("error", {
      productCategory: error.productCategory,
      error: error,
    });
  }
};

// search product category
exports.searchData = async (req, res, next) => {
  try {
    const { search } = req.body;
    let list = [];
    if (!search) {
      list = await productCategoryModel.find();
      console.log("!search");
    } else {
      list = await productCategoryModel.find({
        $or: [
          { productCategoryName: { $regex: search, $options: "i" } },
          { productCategoryDescription: { $regex: search, $options: "i" } },
        ],
      });
      console.log("search");
    }
    console.log(list);
    if (list.length > 0) {
      res.status(200).json(list);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      message: error.message,
      error: error,
    });
  }
};

// add product category
exports.addData = async (req, res, next) => {
  try {
    const { productCategoryName, productCategoryDescription, createdBy } = req.body;
    if (
      req.body.productCategoryName !== undefined ||
      req.body.productCategoryDescription !== undefined ||
      req.body.createdBy !== undefined
    ) {
      const existingproductCategory = await productCategoryModel.findOne({
        productCategoryName,
      });
      if (!existingproductCategory) {
        const productCategory = new productCategoryModel({
          productCategoryName: productCategoryName,
          productCategoryDescription: productCategoryDescription,
          createdBy: createdBy,
        });
        productCategory.save();
        res.json(productCategory._id);
      } else {
        res.status(500).json({ error: "product category already exists" });
      }
    } else {
      res
        .status(400)
        .json({ error: "BAD REQUEST : No Data has been inserted " });
    }
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

// update productCategory

exports.updateData = async function (req, res, next) {
  try {
    const { id } = req.params;
    const dbproductCategory = await productCategoryModel.findById({ _id: id });
    if (dbproductCategory) {
      // productCategoryName
      let productCategoryName = req.body.productCategoryName;
      if (req.body.productCategoryName === undefined) {
        productCategoryName = dbproductCategory.productCategoryName;
      }
      // productCategoryDescription
      let productCategoryDescription = req.body.productCategoryDescription;
      if (req.body.productCategoryDescription === undefined) {
        productCategoryDescription = dbproductCategory.productCategoryDescription;
      }
      if (
        req.body.productCategoryName !== undefined ||
        req.body.productCategoryDescription !== undefined
      ) {
        if (
          (req.body.productCategoryName !== dbproductCategory.productCategoryName &&
            req.body.productCategoryName !== undefined) ||
          (req.body.productCategoryDescription !==
            dbproductCategory.productCategoryDescription &&
            req.body.productCategoryDescription !== undefined)
        ) {
          const existingproductCategory = await productCategoryModel.findOne({
            productCategoryName: req.body.productCategoryName,
            _id: { $ne: id },
          });
          if (!existingproductCategory) {
            const updatedproductCategory = {
              productCategoryName: productCategoryName,
              productCategoryDescription: productCategoryDescription,
            };
            const productCategory = await productCategoryModel.findByIdAndUpdate(
              id,
              {
                $set: updatedproductCategory,
              }
            );
            if (!productCategory) {
              res
                .status(500)
                .json({ error: "Error while updating product category" });
            } else {
              res.json(await productCategoryModel.findById({ _id: id }));
            }
          } else {
            res
              .status(409)
              .json({ error: "CONFLICT : product Category already exists" });
          }
        } else {
          res
            .status(400)
            .json({ error: "BAD REQUEST : No changes have been made" });
        }
      } else {
        res
          .status(400)
          .json({ error: "BAD REQUEST : No Data has been inserted " });
      }
    } else {
      res
        .status(404)
        .json({ error: "NOT FOUND : product Category doesn't exist" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete product category

exports.deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingproductCategory = await productCategoryModel.findOne({
      isDeleted: false,
      _id: id,
    });
    if (existingproductCategory) {
      const productCategory = await productCategoryModel.findByIdAndUpdate(id, {
        $set: { isDeleted: true },
      });
      if (productCategory) {
        res.status(200).json("product category deleted successfully");
      } else {
        res.json({ error: "Error while deleting the product category" });
      }
    } else {
      res.status(404).json({ error: "product Category doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};

// restore product category

exports.restoreData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingproductCategory = await productCategoryModel.findOne({
      isDeleted: true,
      _id: id,
    });
    if (existingproductCategory) {
      const productCategory = await productCategoryModel.findByIdAndUpdate(id, {
        $set: { isDeleted: false },
      });
      if (productCategory) {
        res.status(200).json("product category restored successfully");
      } else {
        res.json({ error: "Error while restoring the product category" });
      }
    } else {
      res.status(404).json({ error: "product Category doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};
