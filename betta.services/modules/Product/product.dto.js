const yup = require("yup");

// add product  data transfer object
exports.addDto = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = yup.object().shape({
      productName: yup.string().required().min(3),
      productDescription: yup.string().min(30),
      productOriginalPrice: yup.number().required(),
      productCategory: yup.string(),
      createdBy: yup.string().required().min(6),
    });
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

// update product data transfer object
exports.updateDto = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = yup.object().shape({
      productName: yup.string().min(3),
      productDescription: yup.string().min(30),
      productOriginalPrice: yup.number(),
      productCategory: yup.string(),
      isBought: yup.boolean(),
    });
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.json("error", { error: error.message });
  }
};
