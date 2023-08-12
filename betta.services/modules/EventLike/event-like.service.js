const eventLikeModel = require("./event-like.model");

// list event likes
exports.listData = async (req, res, next) => {
  try {
    const list = await eventLikeModel.find();
    if (list.length > 0) {
      res.status(200).json(list);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      eventLike: error.eventLike,
      error: error,
    });
  }
};

// get event Like by _id
exports.getData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventLike = await eventLikeModel.findOne({ _id: id });
    if (eventLike) {
      res.status(200).json(eventLike);
    } else {
      res.status(404).json("Event Like doesn't exist Found");
    }
  } catch (error) {
    res.json({
      eventLike: error.eventLike,
      error: error,
    });
  }
};

// list event Like by user
exports.listDataByUser = async (req, res, next) => {
  try {
    const { user } = req.params;
    const eventLikeList = await eventLikeModel.find({
      user: user,
    });
    if (eventLikeList) {
      res.status(200).json(eventLikeList);
    } else {
      res.status(404).json("Event Like doesn't exist");
    }
  } catch (error) {
    res.json("error", {
      eventLike: error.eventLike,
      error: error,
    });
  }
};

// list event Like by event
exports.listDataByEvent = async (req, res, next) => {
  try {
    const { event } = req.params;
    const eventLikeList = await eventLikeModel.find({
      event: event,
    });
    if (eventLikeList) {
      res.status(200).json(eventLikeList);
    } else {
      res.status(404).json("Event Like doesn't exist");
    }
  } catch (error) {
    res.json("error", {
      eventLike: error.eventLike,
      error: error,
    });
  }
};

// add event Like
exports.addData = async (req, res, next) => {
  try {
    if (
      req.body.event !== undefined ||
      req.body.user !== undefined ||
      req.body.createdBy !== undefined
    ) {
      const existingEventLike = await eventLikeModel.findOne({
        event: req.body.event,
        user: req.body.user,
      });
      if (!existingEventLike) {
        const eventLike = new eventLikeModel({
          event: req.body.event,
          user: req.body.user,
          createdBy: req.body.createdBy,
        });
        eventLike.save();
        res.json(eventLike._id);
      } else {
        res.status(500).json({ error: "Event Like already exists" });
      }
    } else {
      res
        .status(400)
        .json({ error: "BAD REQUEST : No Data has been inserted " });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete event Like

exports.deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingEventLike = await eventLikeModel.findOne({
      isDeleted: false,
      _id: id,
    });
    if (existingEventLike) {
      const eventLike = await eventLikeModel.findByIdAndUpdate(id, {
        $set: { isDeleted: true },
      });
      if (eventLike) {
        res.status(200).json("Event Like deleted successfully");
      } else {
        res.json({ error: "Error while deleting the event Like" });
      }
    } else {
      res.status(404).json({ error: "Event Like doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};

// restore event Like

exports.restoreData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingEventLike = await eventLikeModel.findOne({
      isDeleted: true,
      _id: id,
    });
    if (existingEventLike) {
      const eventLike = await eventLikeModel.findByIdAndUpdate(id, {
        $set: { isDeleted: false },
      });
      if (eventLike) {
        res.status(200).json("Event Like restored successfully");
      } else {
        res.json({ error: "Error while restoring the event Like" });
      }
    } else {
      res.status(404).json({ error: "Event Like doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};
