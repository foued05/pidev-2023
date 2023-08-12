const yup = require("yup");

// add event comment data transfer object
exports.addDto = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = yup.object().shape({
      user: yup.string().required(),
      event: yup.string().required(),
      eventComment: yup.string().required().min(2),
      isApproved: yup.boolean(),
      approvedBy: yup.string().min(6),
      createdBy: yup.string().required().min(6),
    });
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

// update event comment data transfer object
exports.updateDto = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = yup.object().shape({
      eventComment: yup.string().min(2),
      isApproved: yup.boolean(),
      isBlocked: yup.boolean(),
      approvedBy: yup.string().min(6),
    });
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};
