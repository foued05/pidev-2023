const yup = require("yup");

exports.addDto = async (req, res, next) => {
  try {
    const schema = yup.object().shape({
      enchereName: yup.string().required(),
      enchereDescription: yup.string().required(),
      createdBy: yup.string().required(),
      startTime: yup.date().required(),
      stopTime: yup.date().required(),
      enchereArticles: yup.array().of(yup.string()),
      isDeleted: yup.boolean(),
    });

    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
