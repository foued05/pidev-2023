const eventCategoryModel = require("./event-category.model");

// list eventCategories
exports.listData = async (req, res, next) => {
  try {
    const list = await eventCategoryModel.find();
    if (list.length > 0) {
      res.status(200).json(list);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      eventCategory: error.eventCategory,
      error: error,
    });
  }
};

// get event category by _id
exports.getData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventCategory = await eventCategoryModel.findOne({ _id: id });
    if (eventCategory) {
      res.status(200).json(eventCategory);
    } else {
      res.status(404).json("Event Category doesn't exist Found");
    }
  } catch (error) {
    res.json({
      eventCategory: error.eventCategory,
      error: error,
    });
  }
};

// get event category by eventCategoryName
exports.getDataByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const eventCategory = await eventCategoryModel.findOne({
      eventCategoryName: name,
    });
    if (eventCategory) {
      res.status(200).json(eventCategory);
    } else {
      res.status(404).json("Event Category doesn't exist Found");
    }
  } catch (error) {
    res.json("error", {
      eventCategory: error.eventCategory,
      error: error,
    });
  }
};

// search event category
exports.searchData = async (req, res, next) => {
  try {
    const { search } = req.body;
    let list = [];
    if (!search) {
      list = await eventCategoryModel.find();
      console.log("!search");
    } else {
      list = await eventCategoryModel.find({
        $or: [
          { eventCategoryName: { $regex: search, $options: "i" } },
          { eventCategoryDescription: { $regex: search, $options: "i" } },
        ],
      });
      console.log("search");
    }
    console.log(list);
    if (list.length > 0) {
      res.status(200).json(list);
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

// add event category
exports.addData = async (req, res, next) => {
  try {
    const { eventCategoryName, eventCategoryDescription, createdBy } = req.body;
    if (
      req.body.eventCategoryName !== undefined ||
      req.body.eventCategoryDescription !== undefined ||
      req.body.createdBy !== undefined
    ) {
      const existingEventCategory = await eventCategoryModel.findOne({
        eventCategoryName,
      });
      if (!existingEventCategory) {
        const eventCategory = new eventCategoryModel({
          eventCategoryName: eventCategoryName,
          eventCategoryDescription: eventCategoryDescription,
          createdBy: createdBy,
        });
        eventCategory.save();
        res.json(eventCategory._id);
      } else {
        res.status(500).json({ error: "Event category already exists" });
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

// update eventCategory

exports.updateData = async function (req, res, next) {
  try {
    const { id } = req.params;
    const dbEventCategory = await eventCategoryModel.findById({ _id: id });
    if (dbEventCategory) {
      // eventCategoryName
      let eventCategoryName = req.body.eventCategoryName;
      if (req.body.eventCategoryName === undefined) {
        eventCategoryName = dbEventCategory.eventCategoryName;
      }
      // eventCategoryDescription
      let eventCategoryDescription = req.body.eventCategoryDescription;
      if (req.body.eventCategoryDescription === undefined) {
        eventCategoryDescription = dbEventCategory.eventCategoryDescription;
      }
      if (
        req.body.eventCategoryName !== undefined ||
        req.body.eventCategoryDescription !== undefined
      ) {
        if (
          (req.body.eventCategoryName !== dbEventCategory.eventCategoryName &&
            req.body.eventCategoryName !== undefined) ||
          (req.body.eventCategoryDescription !==
            dbEventCategory.eventCategoryDescription &&
            req.body.eventCategoryDescription !== undefined)
        ) {
          const existingEventCategory = await eventCategoryModel.findOne({
            eventCategoryName: req.body.eventCategoryName,
            _id: { $ne: id },
          });
          if (!existingEventCategory) {
            const updatedEventCategory = {
              eventCategoryName: eventCategoryName,
              eventCategoryDescription: eventCategoryDescription,
            };
            const eventCategory = await eventCategoryModel.findByIdAndUpdate(
              id,
              {
                $set: updatedEventCategory,
              }
            );
            if (!eventCategory) {
              res
                .status(500)
                .json({ error: "Error while updating event category" });
            } else {
              res.json(await eventCategoryModel.findById({ _id: id }));
            }
          } else {
            res
              .status(409)
              .json({ error: "CONFLICT : Event Category already exists" });
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
      res
        .status(404)
        .json({ error: "NOT FOUND : Event Category doesn't exist" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete event category

exports.deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingEventCategory = await eventCategoryModel.findOne({
      isDeleted: false,
      _id: id,
    });
    if (existingEventCategory) {
      const eventCategory = await eventCategoryModel.findByIdAndUpdate(id, {
        $set: { isDeleted: true },
      });
      if (eventCategory) {
        res.status(200).json("Event category deleted successfully");
      } else {
        res.json({ error: "Error while deleting the event category" });
      }
    } else {
      res.status(404).json({ error: "Event Category doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};

// restore event category

exports.restoreData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingEventCategory = await eventCategoryModel.findOne({
      isDeleted: true,
      _id: id,
    });
    if (existingEventCategory) {
      const eventCategory = await eventCategoryModel.findByIdAndUpdate(id, {
        $set: { isDeleted: false },
      });
      if (eventCategory) {
        res.status(200).json("Event category restored successfully");
      } else {
        res.json({ error: "Error while restoring the event category" });
      }
    } else {
      res.status(404).json({ error: "Event Category doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};
