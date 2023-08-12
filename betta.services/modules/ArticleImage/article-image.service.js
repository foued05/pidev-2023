const articleImageModel = require("./article-image.model");
const path = require("path");

// list article images
exports.listData = async (req, res, next) => {
  try {
    const list = await articleImageModel.find();
    if (list.length > 0) {
      res.status(200).json(list);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      articleImage: error.articleImage,
      error: error,
    });
  }
};

// get article Image by _id
exports.getData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const articleImage = await articleImageModel.findOne({ _id: id });
    if (articleImage) {
      res.status(200).json(articleImage);
    } else {
      res.status(404).json("article Image doesn't exist Found");
    }
  } catch (error) {
    res.json({
      articleImage: error.articleImage,
      error: error,
    });
  }
};

// list article Image by article
exports.listDataByArticle = async (req, res, next) => {
  try {
    const { article } = req.params;
    const articleImageList = await articleImageModel.find({
      article: article,
    });
    if (articleImageList) {
      res.status(200).json(articleImageList);
    } else {
      res.status(404).json("article Image doesn't exist for this article");
    }
  } catch (error) {
    res.json("error", {
      articleImage: error.articleImage,
      error: error,
    });
  }
};

// list article Image by Main
exports.listDataByMain = async (req, res, next) => {
  try {
    const articleImageList = await articleImageModel.find({
      isMain: true,
    });
    if (articleImageList) {
      res.status(200).json(articleImageList);
    } else {
      res.status(404).json("No articles for this Main");
    }
  } catch (error) {
    res.json({
      articleImage: error.articleImage,
      error: error,
    });
  }
};

// add article Image
exports.addData = async (req, res, next) => {
  try {
    if (
      req.body.article !== undefined ||
      req.body.articleImageAlt !== undefined ||
      req.body.createdBy !== undefined
    ) {
      const existingarticleImage = await articleImageModel.findOne({
        articleImageName: req.file.filename,
      });
      if (!existingarticleImage) {
        const articleImage = new articleImageModel({
          articleImagePath: req.file.path,
          articleImageName: req.file.filename,
          ...req.body,
        });
        articleImage.save();
        res.json(articleImage._id);
      } else {
        res.status(520).json({ error: "article Image already exists" });
      }
    } else {
      res
        .status(400)
        .json({ error: "BAD REQUEST : No Data has been inserted " });
    }
  } catch (error) {
    res.status(550).json({ message: error });
  }
};

// download data
exports.downloadData = async (req, res) => {
  try {
    const filename = req.params.filename;
    const articleImage = await articleImageModel.findOne({
      articleImageName: filename,
    });

    if (!articleImage) {
      return res.status(404).json({ message: "article image not found" });
    }

    const filePath = path.join(
      __dirname,
      "../../public/images/article",
      filename
    );
    res.set("Content-Disposition", `attachment; filename="${filename}"`);
    res.set("Cache-Control", "no-store"); // Prarticle caching
    res.sendFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update article Image
exports.updateData = async function (req, res, next) {
  try {
    const { id } = req.params;
    const dbarticleImage = await articleImageModel.findById({ _id: id });
    if (dbarticleImage) {
      // articleImageAlt
      let articleImageAlt = req.body.articleImageAlt;
      if (req.body.articleImageAlt === undefined) {
        articleImageAlt = dbarticleImage.articleImageAlt;
      }

      // isMain
      let isMain = req.body.isMain;
      if (req.body.isMain === undefined) {
        isMain = dbarticleImage.isMain;
      }

      if (
        req.body.articleImageAlt !== undefined ||
        req.body.isMain !== undefined
      ) {
        if (
          (req.body.articleImageAlt !== dbarticleImage.articleImageAlt &&
            req.body.articleImageAlt !== undefined) ||
          (req.body.isMain !== dbarticleImage.isMain &&
            req.body.isMain !== undefined)
        ) {
          const updatedarticleImage = {
            articleImageAlt: articleImageAlt,
            isMain: isMain,
          };
          const articleImage = await articleImageModel.findByIdAndUpdate(id, {
            $set: updatedarticleImage,
          });
          if (!articleImage) {
            res.status(500).json({ error: "Error while updating Image " });
          } else {
            res.json(await articleImageModel.findById({ _id: id }));
          }
        } else {
          res
            .status(400)
            .json({ error: "BAD REQUEST : No changes have been made" });
        }
      } else {
        res
          .status(400)
          .json({ error: "BAD REQUEST : No Data has been inserted " });
      }
    } else {
      res.status(404).json({ error: "NOT FOUND : article  doesn't exist" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete article Image
exports.deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingarticleImage = await articleImageModel.findOne({
      isDeleted: false,
      _id: id,
    });
    if (existingarticleImage) {
      const articleImage = await articleImageModel.findByIdAndUpdate(id, {
        $set: { isDeleted: true },
      });
      if (articleImage) {
        res.status(200).json("article Image deleted successfully");
      } else {
        res.json({ error: "Error while deleting the article Image" });
      }
    } else {
      res.status(404).json({ error: "article Image doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};

// restore article Image

exports.restoreData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingarticleImage = await articleImageModel.findOne({
      isDeleted: true,
      _id: id,
    });
    if (existingarticleImage) {
      const articleImage = await articleImageModel.findByIdAndUpdate(id, {
        $set: { isDeleted: false },
      });
      if (articleImage) {
        res.status(200).json("article Image restored successfully");
      } else {
        res.json({ error: "Error while restoring the article Image" });
      }
    } else {
      res.status(404).json({ error: "article Image doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};
