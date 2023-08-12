const eventInterestModel = require("./event-interest.model");

// list event Interests
exports.listData = async (req, res, next) => {
  try {
    const list = await eventInterestModel.find();
    if (list.length > 0) {
      res.status(200).json(list);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      eventInterest: error.eventInterest,
      error: error,
    });
  }
};

// get event Interest by _id
exports.getData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventInterest = await eventInterestModel.findOne({ _id: id });
    if (eventInterest) {
      res.status(200).json(eventInterest);
    } else {
      res.status(404).json("Event Interest doesn't exist Found");
    }
  } catch (error) {
    res.json({
      eventInterest: error.eventInterest,
      error: error,
    });
  }
};

// list event Interest by user
exports.listDataByUser = async (req, res, next) => {
  try {
    const { user } = req.params;
    const eventInterestList = await eventInterestModel.find({
      user: user,
    });
    if (eventInterestList) {
      res.status(200).json(eventInterestList);
    } else {
      res.status(404).json("Event Interest doesn't exist");
    }
  } catch (error) {
    res.json("error", {
      eventInterest: error.eventInterest,
      error: error,
    });
  }
};

// list event Interest by event
exports.listDataByEvent = async (req, res, next) => {
  try {
    const { event } = req.params;
    const eventInterestList = await eventInterestModel.find({
      event: event,
    });
    if (eventInterestList) {
      res.status(200).json(eventInterestList);
    } else {
      res.status(404).json("Event Interest doesn't exist");
    }
  } catch (error) {
    res.json("error", {
      eventInterest: error.eventInterest,
      error: error,
    });
  }
};

// add event Interest
exports.addData = async (req, res, next) => {
  try {
    if (
      req.body.event !== undefined ||
      req.body.user !== undefined ||
      req.body.createdBy !== undefined
    ) {
      const existingEventInterest = await eventInterestModel.findOne({
        event: req.body.event,
        user: req.body.user,
      });
      if (!existingEventInterest) {
        const eventInterest = new eventInterestModel({
          event: req.body.event,
          user: req.body.user,
          createdBy: req.body.createdBy,
        });
        eventInterest.save();
        res.json(eventInterest._id);
      } else {
        res.status(500).json({ error: "Event Interest already exists" });
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

// delete event Interest

exports.deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingEventInterest = await eventInterestModel.findOne({
      isDeleted: false,
      _id: id,
    });
    if (existingEventInterest) {
      const eventInterest = await eventInterestModel.findByIdAndUpdate(id, {
        $set: { isDeleted: true },
      });
      if (eventInterest) {
        res.status(200).json("Event Interest deleted successfully");
      } else {
        res.json({ error: "Error while deleting the event Interest" });
      }
    } else {
      res.status(404).json({ error: "Event Interest doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};

// restore event Interest

exports.restoreData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingEventInterest = await eventInterestModel.findOne({
      isDeleted: true,
      _id: id,
    });
    if (existingEventInterest) {
      const eventInterest = await eventInterestModel.findByIdAndUpdate(id, {
        $set: { isDeleted: false },
      });
      if (eventInterest) {
        res.status(200).json("Event Interest restored successfully");
      } else {
        res.json({ error: "Error while restoring the event Interest" });
      }
    } else {
      res.status(404).json({ error: "Event Interest doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};
