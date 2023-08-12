const forumModel = require("./forum.model");
const userModel = require("../User/user.model");
const mongoose = require('mongoose');

exports.addData = async (req, res, next) => {
    try{
        const { userId, message } = req.body;

        const user = await userModel.findOne({ _id: userId});

        const forum = new forumModel({
            userId: userId,
            message: message,
            userName: user.userName
        });

        forum.save();

        res.json(forum._id);
    } catch (error) {
    res.status(500).json({ message: err.message });
  }
}

exports.listData = async (req, res, next) => {
    try{

        const list = await forumModel.find().sort({ creationDate: 1 });
        res.status(200).json(list)

    } catch (error) {
    res.status(500).json({ message: err.message });
  }
}

exports.deleteData = async(req, res, next) => {
  try{
    const {id} = req.params;
    const deleteff = await forumModel.findOneAndDelete({ _id: id });

    res.json({id: id})
  }catch(error){
    res.status(500).json({message: err.message})
  }
}