const yup = require("yup");

// add event location data transfer object
exports.addDto = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = yup.object().shape({
      event: yup.string().required(),
      eventLocationLatitude: yup.number(),
      eventLocationLongitude: yup.number(),
      eventAddress: yup.string().required(),
      eventCountry: yup.string(),
      eventCity: yup.string(),
      eventRegion: yup.string(),
      eventLocationImage: yup.string(),
      createdBy: yup.string().required().min(6),
    });
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

// update event location data transfer object
exports.updateDto = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = yup.object().shape({
      event: yup.string().required(),
      eventLocationLatitude: yup.number(),
      eventLocationLongitude: yup.number(),
      eventAddress: yup.string(),
      eventCountry: yup.string(),
      eventCity: yup.string(),
      eventRegion: yup.string(),
      eventLocationImage: yup.string(),
    });
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

