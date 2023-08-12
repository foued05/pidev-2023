const yup = require("yup");

// add event category data transfer object
exports.addDto = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = yup.object().shape({
      eventCategoryName: yup.string().required().min(3),
      eventCategoryDescription: yup.string().min(30),
      createdBy: yup.string().required().min(6),
    });
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

// update event category data transfer object
exports.updateDto = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = yup.object().shape({
      eventCategoryName: yup.string().min(3),
      eventCategoryDescription: yup.string().min(30),
    });
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.json("error", { error: error.message });
  }
};
