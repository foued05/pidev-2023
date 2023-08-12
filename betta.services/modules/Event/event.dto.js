const yup = require("yup");

// add event  data transfer object
exports.addDto = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = yup.object().shape({
      eventName: yup.string().required().min(3),
      eventDescription: yup.string().min(30),
      eventCategory: yup.string(),
      eventState: yup.string(),
      isPrivate: yup.boolean(),
      createdBy: yup.string().required().min(6),
    });
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

// update event data transfer object
exports.updateDto = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = yup.object().shape({
      eventName: yup.string().min(3),
      eventDescription: yup.string().min(30),
      eventCategory: yup.string(),
      eventState: yup.string(),
      isPrivate: yup.boolean(),
    });
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.json("error", { error: error.message });
  }
};
