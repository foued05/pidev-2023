const yup = require("yup");

const enchereArticleDto = yup.object().shape({
  articleTitle: yup.string().required(),
  articleText: yup.string().required(),
  isPrivate: yup.boolean(),
  creationDate: yup.date(),
  createdBy: yup.string().required(),
  isDeleted: yup.boolean(),
});

module.exports = enchereArticleDto;
