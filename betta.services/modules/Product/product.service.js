const productModel = require("./product.model");

// list products
exports.listData = async (req, res, next) => {
  try {
    const list = await productModel.find();
    if (list.length > 0) {
      res.status(200).json(list);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      product: error.product,
      error: error,
    });
  }
};

// get product  by _id
exports.getData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productModel.findOne({ _id: id });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json("product  doesn't exist Found");
    }
  } catch (error) {
    res.json({
      product: error.product,
      error: error,
    });
  }
};

// get product  by productName
exports.getDataByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const product = await productModel.findOne({
      productName: name,
    });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json("product  doesn't exist Found");
    }
  } catch (error) {
    res.json("error", {
      product: error.product,
      error: error,
    });
  }
};

// search product
exports.searchData = async (req, res, next) => {
  try {
    const { search } = req.body;
    let list = [];
    if (!search) {
      list = await productModel.find();
      console.log("!search");
    } else {
      list = await productModel.find({
        $or: [
          { productName: { $regex: search, $options: "i" } },
          { productDescription: { $regex: search, $options: "i" } },
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

// add product
exports.addData = async (req, res, next) => {
  try {
    if (
      req.body.productName !== undefined ||
      req.body.productCategory !== undefined ||
      req.body.productOriginalPrice !== undefined ||
      req.body.createdBy !== undefined
    ) {
      const existingproduct = await productModel.findOne({
        productName: req.body.productName,
      });
      if (!existingproduct) {
        const product = new productModel({
          ...req.body,
        });
        product.save();
        res.json(product._id);
      } else {
        res.status(500).json({ error: "product already exists" });
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

// update product

exports.updateData = async function (req, res, next) {
  try {
    const { id } = req.params;
    const dbProduct = await productModel.findById({ _id: id });
    if (dbProduct) {
      // productName
      let productName = req.body.productName;
      if (req.body.productName === undefined) {
        productName = dbProduct.productName;
      }
      // productDescription
      let productDescription = req.body.productDescription;
      if (req.body.productDescription === undefined) {
        productDescription = dbProduct.productDescription;
      }
      // productCategory
      let productCategory = req.body.productCategory;
      if (req.body.productCategory === undefined) {
        productCategory = dbProduct.productCategory;
      }
      // productOriginalPrice
      let productOriginalPrice = req.body.productOriginalPrice;
      if (req.body.productOriginalPrice === undefined) {
        productOriginalPrice = dbProduct.productOriginalPrice;
      }
      // isBought
      let isBought = req.body.isBought;
      if (req.body.isBought === undefined) {
        isBought = dbProduct.isBought;
      }
      if (
        req.body.productName !== undefined ||
        req.body.productCategory !== undefined ||
        req.body.productOriginalPrice !== undefined ||
        req.body.isBought !== undefined ||
        req.body.productDescription !== undefined
      ) {
        if (
          (req.body.productName !== dbProduct.productName &&
            req.body.productName !== undefined) ||
          (req.body.productDescription !== dbProduct.productDescription &&
            req.body.productDescription !== undefined) ||
          (req.body.productCategory !== dbProduct.productCategory &&
            req.body.productCategory !== undefined) ||
          (req.body.productOriginalPrice !== dbProduct.productOriginalPrice &&
            req.body.productOriginalPrice !== undefined) ||
          (req.body.isBought !== dbProduct.isBought &&
            req.body.isBought !== undefined)
        ) {
          const existingproduct = await productModel.findOne({
            productName: req.body.productName,
            _id: { $ne: id },
          });
          if (!existingproduct) {
            const updatedproduct = {
              ...req.body,
            };
            const product = await productModel.findByIdAndUpdate(id, {
              $set: updatedproduct,
            });
            if (!product) {
              res.status(500).json({ error: "Error while updating product " });
            } else {
              res.json(await productModel.findById({ _id: id }));
            }
          } else {
            res
              .status(409)
              .json({ error: "CONFLICT : product  already exists" });
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
      res.status(404).json({ error: "NOT FOUND : product  doesn't exist" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete product

exports.deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingproduct = await productModel.findOne({
      isDeleted: false,
      _id: id,
    });
    if (existingproduct) {
      const product = await productModel.findByIdAndUpdate(id, {
        $set: { isDeleted: true },
      });
      if (product) {
        res.status(200).json("product  deleted successfully");
      } else {
        res.json({ error: "Error while deleting the product " });
      }
    } else {
      res.status(404).json({ error: "product  doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};

// restore product

exports.restoreData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingproduct = await productModel.findOne({
      isDeleted: true,
      _id: id,
    });
    if (existingproduct) {
      const product = await productModel.findByIdAndUpdate(id, {
        $set: { isDeleted: false },
      });
      if (product) {
        res.status(200).json("product  restored successfully");
      } else {
        res.json({ error: "Error while restoring the product " });
      }
    } else {
      res.status(404).json({ error: "product  doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};
