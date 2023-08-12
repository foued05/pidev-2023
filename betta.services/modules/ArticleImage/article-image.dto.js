const yup = require("yup");

// add article image data transfer object
exports.addDto = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = yup.object().shape({
      article: yup.string().required(),
      articleImageName: yup.string(),
      articleImagePath: yup.string(),
      articleImageAlt: yup.string(),
      isMain: yup.boolean(),
      createdBy: yup.string().required().min(6),
    });
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

// update article image data transfer object
exports.updateDto = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = yup.object().shape({
      articleImageAlt: yup.string(),
      isMain: yup.boolean(),
    });
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

