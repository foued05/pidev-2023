const eventModel = require("./event.model");

// list event
exports.listData = async (req, res, next) => {
  try {
    const list = await eventModel.find().populate('eventCategory');
    if (list.length > 0) {
      res.status(200).json(list);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      event: error.event,
      error: error,
    });
  }
};

// get event by _id
exports.getData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await eventModel.findOne({ _id: id });
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json("Event not Found");
    }
  } catch (error) {
    res.json({
      event: error.event,
      error: error,
    });
  }
};

// get event by eventName
exports.getDataByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const event = await eventModel.findOne({
      eventName: name,
    });
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json("Event not Found");
    }
  } catch (error) {
    res.json({
      event: error.event,
      error: error,
    });
  }
};

// list event by eventCategory
exports.listDataByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const eventList = await eventModel.find({
      eventCategory: category,
    });
    if (eventList.length > 0) {
      res.status(200).json(eventList);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      event: error.event,
      error: error,
    });
  }
};

// list event by eventState
exports.listDataByState = async (req, res, next) => {
  try {
    const { state } = req.params;
    const eventList = await eventModel.find({
      eventState: state,
    });
    if (eventList.length > 0) {
      res.status(200).json(eventList);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      event: error.event,
      error: error,
    });
  }
};

// list event by privacy
exports.listDataByPrivacy = async (req, res, next) => {
  try {
    const eventList = await eventModel.find({
      isPrivate: true,
    });
    if (eventList.length > 0) {
      res.status(200).json(eventList);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      event: error.event,
      error: error,
    });
  }
};

// list event by Public
exports.listDataByPublic = async (req, res, next) => {
  try {
    const eventList = await eventModel.find({
      isPrivate: false,
    });
    if (eventList.length > 0) {
      res.status(200).json(eventList);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      event: error.event,
      error: error,
    });
  }
};

// list event by event date range
exports.listDataByDate = async (req, res, next) => {
  try {
    let eventList = [];
    if (req.body.startDate !== undefined && req.body.endDate !== undefined) {
      eventList = await eventModel.find({
        eventStartDate: { $gte: req.body.startDate },
        eventEndDate: { $lte: req.body.endDate },
      });
    } else {
      if (req.body.endDate === undefined) {
        eventList = await eventModel.find({
          eventStartDate: { $gte: req.body.startDate },
        });
      } else {
        eventList = await eventModel.find({
          eventEndDate: { $lte: req.body.endDate },
        });
      }
    }
    if (eventList.length > 0) {
      res.status(200).json(eventList);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      event: error.event,
      error: error,
    });
  }
};

// search event
exports.searchData = async (req, res, next) => {
  try {
    const { search } = req.body;
    let eventList = [];
    if (!search) {
      eventList = await eventModel.find();
      console.log("!search");
    } else {
      eventList = await eventModel.find({
        $or: [
          { eventName: { $regex: search, $options: "i" } },
          { eventDescription: { $regex: search, $options: "i" } },
        ],
      });
      console.log("search");
    }
    console.log(eventList);
    if (eventList.length > 0) {
      res.status(200).json(eventList);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      message: error.message,
      error: error,
    });
  }
};

// add event
exports.addData = async (req, res, next) => {
  try {
    if (
      req.body.eventName !== undefined ||
      req.body.eventDescription !== undefined ||
      req.body.createdBy !== undefined
    ) {
      const existingEvent = await eventModel.findOne({
        eventName: req.body.eventName,
      });
      if (!existingEvent) {
        const event = new eventModel({
          ...req.body,
        });
        event.save();
        res.status(200).json("Event added successfully");
      } else {
        res.status(500).json({ error: "Event already exists" });
      }
    } else {
      res
        .status(400)
        .json({ error: "BAD REQUEST : No Data has been inserted " });
    }
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

// update event

exports.updateData = async function (req, res, next) {
  try {
    const { id } = req.params;
    const dbEvent = await eventModel.findById({ _id: id });
    if (dbEvent) {
      // eventName
      let eventName = req.body.eventName;
      if (req.body.eventName === undefined) {
        eventName = dbEvent.eventName;
      }
      // eventDescription
      let eventDescription = req.body.eventDescription;
      if (req.body.eventDescription === undefined) {
        eventDescription = dbEvent.eventDescription;
      }

      // eventCategory
      let eventCategory = req.body.eventCategory;
      if (req.body.eventCategory === undefined) {
        eventCategory = dbEvent.eventCategory;
      }

      // eventState
      let eventState = req.body.eventState;
      if (req.body.eventState === undefined) {
        eventState = dbEvent.eventState;
      }

      // eventStartDate
      let eventStartDate = req.body.eventStartDate;
      if (req.body.eventStartDate === undefined) {
        eventStartDate = dbEvent.eventStartDate;
      }

      // eventEndDate
      let eventEndDate = req.body.eventEndDate;
      if (req.body.eventEndDate === undefined) {
        eventEndDate = dbEvent.eventEndDate;
      }

      // isPrivate
      let isPrivate = req.body.isPrivate;
      if (req.body.isPrivate === undefined) {
        isPrivate = dbEvent.isPrivate;
      }

      if (
        req.body.eventName !== undefined ||
        req.body.eventDescription !== undefined ||
        req.body.eventCategory !== undefined ||
        req.body.eventState !== undefined ||
        req.body.eventStartDate !== undefined ||
        req.body.eventEndDate !== undefined ||
        req.body.isPrivate !== undefined
      ) {
        if (
          (req.body.eventName !== dbEvent.eventName &&
            req.body.eventName !== undefined) ||
          (req.body.eventDescription !== dbEvent.eventDescription &&
            req.body.eventDescription !== undefined) ||
          (req.body.eventCategory !== dbEvent.eventCategory &&
            req.body.eventCategory !== undefined) ||
          (req.body.eventState !== dbEvent.eventState &&
            req.body.eventState !== undefined) ||
          (req.body.eventStartDate !== dbEvent.eventStartDate &&
            req.body.eventStartDate !== undefined) ||
          (req.body.eventEndDate !== dbEvent.eventEndDate &&
            req.body.eventEndDate !== undefined) ||
          (req.body.isPrivate !== dbEvent.isPrivate &&
            req.body.isPrivate !== undefined)
        ) {
          const existingEvent = await eventModel.findOne({
            eventName: req.body.eventName,
            _id: { $ne: id },
          });
          if (!existingEvent) {
            const updatedEvent = {
              eventName: eventName,
              eventDescription: eventDescription,
              eventCategory: eventCategory,
              eventState: eventState,
              eventStartDate: eventStartDate,
              eventEndDate: eventEndDate,
              isPrivate: isPrivate,
              createdBy: req.body.createdBy,
            };
            const event = await eventModel.findByIdAndUpdate(id, {
              $set: updatedEvent,
            });
            if (!event) {
              res.status(500).json({ error: "Error while updating event " });
            } else {
              res.json(await eventModel.findById({ _id: id }));
            }
          } else {
            res.status(409).json({ error: "CONFLICT : Event  already exists" });
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
      res.status(404).json({ error: "NOT FOUND : Event  doesn't exist" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete event

exports.deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingEvent = await eventModel.findOne({
      isDeleted: false,
      _id: id,
    });
    if (existingEvent) {
      const event = await eventModel.findByIdAndUpdate(id, {
        $set: { isDeleted: true },
      });
      if (event) {
        res.status(200).json("Event deleted successfully");
      } else {
        res.json({ error: "Error while deleting the event " });
      }
    } else {
      res.status(404).json({ error: "Event doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};

// restore event

exports.restoreData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingEvent = await eventModel.findOne({
      isDeleted: true,
      _id: id,
    });
    if (existingEvent) {
      const event = await eventModel.findByIdAndUpdate(id, {
        $set: { isDeleted: false },
      });
      if (event) {
        res.status(200).json("Event restored successfully");
      } else {
        res.json({ error: "Error while restoring the event " });
      }
    } else {
      res.status(404).json({ error: "Event doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};
