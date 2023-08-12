const yup = require("yup");

const enchereImageDto = yup.object().shape({
  enchere: yup.string().nullable(),
  enchereImageName: yup.string().required(),
  enchereImagePath: yup.string().required(),
  enchereImageAlt: yup.string().default("enchere image"),
  isMain: yup.boolean().default(false),
  creationDate: yup.date().default(() => new Date()),
  createdBy: yup.string().required(),
  isDeleted: yup.boolean().default(false),
});

module.exports = enchereImageDto;
