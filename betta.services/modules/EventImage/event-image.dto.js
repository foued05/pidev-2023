const yup = require("yup");

// add event image data transfer object
exports.addDto = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = yup.object().shape({
      event: yup.string().required(),
      eventImageName: yup.string(),
      eventImagePath: yup.string(),
      eventImageAlt: yup.string(),
      isMain: yup.boolean(),
      createdBy: yup.string().required().min(6),
    });
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

// update event image data transfer object
exports.updateDto = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = yup.object().shape({
      eventImageAlt: yup.string(),
      isMain: yup.boolean(),
    });
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

