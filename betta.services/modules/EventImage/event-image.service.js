const eventImageModel = require("./event-image.model");
const path = require("path");

// list event images
exports.listData = async (req, res, next) => {
  try {
    const list = await eventImageModel.find();
    if (list.length > 0) {
      res.status(200).json(list);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      eventImage: error.eventImage,
      error: error,
    });
  }
};

// get event Image by _id
exports.getData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventImage = await eventImageModel.findOne({ _id: id });
    if (eventImage) {
      res.status(200).json(eventImage);
    } else {
      res.status(404).json("Event Image doesn't exist Found");
    }
  } catch (error) {
    res.json({
      eventImage: error.eventImage,
      error: error,
    });
  }
};

// list event Image by Event
exports.listDataByEvent = async (req, res, next) => {
  try {
    const { event } = req.params;
    const eventImageList = await eventImageModel.find({
      event: event,
    });
    if (eventImageList) {
      res.status(200).json(eventImageList);
    } else {
      res.status(404).json("Event Image doesn't exist for this event");
    }
  } catch (error) {
    res.json("error", {
      eventImage: error.eventImage,
      error: error,
    });
  }
};

// list event Image by Main
exports.listDataByMain = async (req, res, next) => {
  try {
    const eventImageList = await eventImageModel.find({
      isMain: true,
    });
    if (eventImageList) {
      res.status(200).json(eventImageList);
    } else {
      res.status(404).json("No events for this Main");
    }
  } catch (error) {
    res.json({
      eventImage: error.eventImage,
      error: error,
    });
  }
};

// add event Image
exports.addData = async (req, res, next) => {
  try {
    if (
      req.body.event !== undefined ||
      req.body.eventImageAlt !== undefined ||
      req.body.createdBy !== undefined
    ) {
      const existingEventImage = await eventImageModel.findOne({
        eventImageName: req.file.filename,
      });
      if (!existingEventImage) {
        const eventImage = new eventImageModel({
          eventImagePath: req.file.path,
          eventImageName: req.file.filename,
          ...req.body,
        });
        eventImage.save();
        res.json(eventImage._id);
      } else {
        res.status(520).json({ error: "Event Image already exists" });
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
    const eventImage = await eventImageModel.findOne({
      eventImageName: filename,
    });

    if (!eventImage) {
      return res.status(404).json({ message: "Event image not found" });
    }

    const filePath = path.join(
      __dirname,
      "../../public/images/event",
      filename
    );
    res.set("Content-Disposition", `attachment; filename="${filename}"`);
    res.set("Cache-Control", "no-store"); // Prevent caching
    res.sendFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update event Image
exports.updateData = async function (req, res, next) {
  try {
    const { id } = req.params;
    const dbEventImage = await eventImageModel.findById({ _id: id });
    if (dbEventImage) {
      // eventImageAlt
      let eventImageAlt = req.body.eventImageAlt;
      if (req.body.eventImageAlt === undefined) {
        eventImageAlt = dbEventImage.eventImageAlt;
      }

      // isMain
      let isMain = req.body.isMain;
      if (req.body.isMain === undefined) {
        isMain = dbEventImage.isMain;
      }

      if (
        req.body.eventImageAlt !== undefined ||
        req.body.isMain !== undefined
      ) {
        if (
          (req.body.eventImageAlt !== dbEventImage.eventImageAlt &&
            req.body.eventImageAlt !== undefined) ||
          (req.body.isMain !== dbEventImage.isMain &&
            req.body.isMain !== undefined)
        ) {
          const updatedEventImage = {
            eventImageAlt: eventImageAlt,
            isMain: isMain,
          };
          const eventImage = await eventImageModel.findByIdAndUpdate(id, {
            $set: updatedEventImage,
          });
          if (!eventImage) {
            res.status(500).json({ error: "Error while updating Image " });
          } else {
            res.json(await eventImageModel.findById({ _id: id }));
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

// delete event Image
exports.deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingEventImage = await eventImageModel.findOne({
      isDeleted: false,
      _id: id,
    });
    if (existingEventImage) {
      const eventImage = await eventImageModel.findByIdAndUpdate(id, {
        $set: { isDeleted: true },
      });
      if (eventImage) {
        res.status(200).json("Event Image deleted successfully");
      } else {
        res.json({ error: "Error while deleting the event Image" });
      }
    } else {
      res.status(404).json({ error: "Event Image doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};

// restore event Image

exports.restoreData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingEventImage = await eventImageModel.findOne({
      isDeleted: true,
      _id: id,
    });
    if (existingEventImage) {
      const eventImage = await eventImageModel.findByIdAndUpdate(id, {
        $set: { isDeleted: false },
      });
      if (eventImage) {
        res.status(200).json("Event Image restored successfully");
      } else {
        res.json({ error: "Error while restoring the event Image" });
      }
    } else {
      res.status(404).json({ error: "Event Image doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};
