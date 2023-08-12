const articleModel = require("./article.model");
var express = require("express");
var { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

// list articles
exports.listData = async (req, res, next) => {
  try {
    const list = await articleModel.find();
    if (list.length > 0) {
      res.status(200).json(list);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

// get article by _id
exports.getData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await articleModel.findOne({ _id: id });
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json("article doesn't exist");
    }
  } catch (error) {
    res.json({
      article: error.article,
      error: error,
    });
  }
};

// list article by Title
exports.getDataByTitle = async (req, res, next) => {
  try {
    const { title } = req.params;
    const articleList = await articleModel.findOne({
      articleTitle: title,
    });
    if (articleList) {
      res.status(200).json(articleList);
    } else {
      res.status(404).json("article doesn't exist");
    }
  } catch (error) {
    res.json({
      article: error.article,
      error: error,
    });
  }
};

// list article by public
exports.listDataByPublic = async (req, res, next) => {
  try {
    const articleList = await articleModel.find({
      isPrivate: false,
    });
    if (articleList) {
      res.status(200).json(articleList);
    } else {
      res.status(404).json("article doesn't exist");
    }
  } catch (error) {
    res.json({
      article: error.article,
      error: error,
    });
  }
};

// list article by Archive
exports.listDataByArchive = async (req, res, next) => {
  try {
    const articleList = await articleModel.find({
      isArchived: true,
    });
    if (articleList) {
      res.status(200).json(articleList);
    } else {
      res.status(404).json("articles doesn't exist");
    }
  } catch (error) {
    res.json({
      article: error.article,
      error: error,
    });
  }
};

// list article by privacy
exports.listDataByPrivacy = async (req, res, next) => {
  try {
    const articleList = await articleModel.find({
      isPrivate: true,
    });
    if (articleList) {
      res.status(200).json(articleList);
    } else {
      res.status(404).json("article doesn't exist");
    }
  } catch (error) {
    res.json({
      article: error.article,
      error: error,
    });
  }
};

// add article
exports.addData = async (req, res, next) => {
  try {
    if (
      req.body.articleTitle !== undefined ||
      req.body.articleText !== undefined ||
      req.body.createdBy !== undefined
    ) {
      const article = new articleModel({
        ...req.body,
      });
      article.save();
      res.json(article._id);
    } else {
      res
        .status(400)
        .json({ error: "BAD REQUEST : No Data has been inserted " });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete article

exports.deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingArticle = await articleModel.findOne({
      isDeleted: false,
      _id: id,
    });
    if (existingArticle) {
      const article = await articleModel.findByIdAndUpdate(id, {
        $set: { isDeleted: true },
      });
      if (article) {
        res.status(200).json("article deleted successfully");
      } else {
        res.json({ error: "Error while deleting the article" });
      }
    } else {
      res.status(404).json({ error: "article doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};

// restore article

exports.restoreData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingArticle = await articleModel.findOne({
      isDeleted: true,
      _id: id,
    });
    if (existingArticle) {
      const article = await articleModel.findByIdAndUpdate(id, {
        $set: { isDeleted: false },
      });
      if (article) {
        res.status(200).json("article restored successfully");
      } else {
        res.json({ error: "Error while restoring the article" });
      }
    } else {
      res.status(404).json({ error: "article doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};
