const eventViewModel = require("./event-view.model");
var express = require("express");
var {ObjectId} = require("mongodb");
const { default: mongoose } = require("mongoose");


// list event views
exports.listData = async (req, res, next) => {
  try {
    const list = await eventViewModel.find();
    if (list.length > 0) {
      res.status(200).json(list);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      eventView: error.eventView,
      error: error,
    });
  }
};

// get event View by _id
exports.getData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventView = await eventViewModel.findOne({ _id: id });
    if (eventView) {
      res.status(200).json(eventView);
    } else {
      res.status(404).json("Event View doesn't exist Found");
    }
  } catch (error) {
    res.json({
      eventView: error.eventView,
      error: error,
    });
  }
};

// list event view by user
exports.listDataByUser = async (req, res, next) => {
  try {
    const { user } = req.params;
    const eventViewList = await eventViewModel.find({
      user: user,
    });
    if (eventViewList) {
      res.status(200).json(eventViewList);
    } else {
      res.status(404).json("Event View doesn't exist");
    }
  } catch (error) {
    res.json({
      eventView: error.eventView,
      error: error,
    });
  }
};

// list event View by event
exports.listDataByEvent = async (req, res, next) => {
  try {
    const { event } = req.params;
    const eventViewList = await eventViewModel.find({
      event: event,
    });
    if (eventViewList) {
      res.status(200).json(eventViewList);
    } else {
      res.status(404).json("Event View doesn't exist");
    }
  } catch (error) {
    res.json({
      eventView: error.eventView,
      error: error,
    });
  }
};

// list user last event views by event
exports.listDataRecentByUser = async (req, res, next) => {
  try {
    const user = new mongoose.Types.ObjectId(req.params.user)
    const eventViewList = await eventViewModel.aggregate([
      { $match: { user: user,  isDeleted: false } },
      { $sort: { creationDate: -1 } },
      {
        $group: {
          _id: "$event",
          event: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$event" } },
      { $limit: 5 },
    ]);
    if (eventViewList) {
      res.status(200).json(eventViewList);
    } else {
      res.status(404).json("Event View doesn't exist");
    }
  } catch (error) {
    res.json({
      eventView: error.eventView,
      error: error,
    });
  }
};

// list events last views by user
exports.listDataRecentByEvent = async (req, res, next) => {
  try {
    const event = new mongoose.Types.ObjectId(req.params.event)
    const eventViewList = await eventViewModel.aggregate([
      { $match: { event: event, isDeleted: false } },
      { $sort: { creationDate: -1 } },
      {
        $group: {
          _id: "$user",
          user: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$user" } },
      { $limit: 5 },
    ]);
    if (eventViewList) {
      res.status(200).json(eventViewList);
    } else {
      res.status(404).json("Event View doesn't exist");
    }
  } catch (error) {
    res.json({
      eventView: error.eventView,
      error: error,
    });
  }
};

// add event View
exports.addData = async (req, res, next) => {
  try {
    if (
      req.body.event !== undefined ||
      req.body.user !== undefined ||
      req.body.createdBy !== undefined
    ) {
      const eventView = new eventViewModel({
        event: req.body.event,
        user: req.body.user,
        createdBy: req.body.createdBy,
      });
      eventView.save();
      res.json(eventView._id);
    } else {
      res
        .status(400)
        .json({ error: "BAD REQUEST : No Data has been inserted " });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete event View

exports.deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingEventView = await eventViewModel.findOne({
      isDeleted: false,
      _id: id,
    });
    if (existingEventView) {
      const eventView = await eventViewModel.findByIdAndUpdate(id, {
        $set: { isDeleted: true },
      });
      if (eventView) {
        res.status(200).json("Event View deleted successfully");
      } else {
        res.json({ error: "Error while deleting the event View" });
      }
    } else {
      res.status(404).json({ error: "Event View doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};

// restore event View

exports.restoreData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingEventView = await eventViewModel.findOne({
      isDeleted: true,
      _id: id,
    });
    if (existingEventView) {
      const eventView = await eventViewModel.findByIdAndUpdate(id, {
        $set: { isDeleted: false },
      });
      if (eventView) {
        res.status(200).json("Event View restored successfully");
      } else {
        res.json({ error: "Error while restoring the event View" });
      }
    } else {
      res.status(404).json({ error: "Event View doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};
