const eventLocationModel = require("./event-location.model");

// list event Locations
exports.listData = async (req, res, next) => {
  try {
    const list = await eventLocationModel.find();
    if (list.length > 0) {
      res.status(200).json(list);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      eventLocation: error.eventLocation,
      error: error,
    });
  }
};

// get event Location by _id
exports.getData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventLocation = await eventLocationModel.findOne({ _id: id });
    if (eventLocation) {
      res.status(200).json(eventLocation);
    } else {
      res.status(404).json("Event Location doesn't exist Found");
    }
  } catch (error) {
    res.json({
      eventLocation: error.eventLocation,
      error: error,
    });
  }
};

// list event Location by country
exports.listDataByCountry = async (req, res, next) => {
  try {
    const { country } = req.params;
    const eventLocationList = await eventLocationModel.find({
      eventCountry: country,
    });
    if (eventLocationList) {
      res.status(200).json(eventLocationList);
    } else {
      res.status(404).json("Event Location doesn't exist");
    }
  } catch (error) {
    res.json("error", {
      eventLocation: error.eventLocation,
      error: error,
    });
  }
};

// list event Location by City
exports.listDataByCity = async (req, res, next) => {
  try {
    const { city } = req.params;
    const eventLocationList = await eventLocationModel.find({
      eventCity: city,
    });
    if (eventLocationList) {
      res.status(200).json(eventLocationList);
    } else {
      res.status(404).json("No events for this city");
    }
  } catch (error) {
    res.json("error", {
      eventLocation: error.eventLocation,
      error: error,
    });
  }
};

// list event Location by region
exports.listDataByRegion = async (req, res, next) => {
  try {
    const { region } = req.params;
    const eventLocationList = await eventLocationModel.find({
      eventRegion: region,
    });
    if (eventLocationList) {
      res.status(200).json(eventLocationList);
    } else {
      res.status(404).json("ENo events in this region");
    }
  } catch (error) {
    res.json("error", {
      eventLocation: error.eventLocation,
      error: error,
    });
  }
};

// add event Location
exports.addData = async (req, res, next) => {
  try {
    if (
      req.body.event !== undefined ||
      req.body.eventAddress !== undefined ||
      req.body.eventCountry !== undefined ||
      req.body.eventCity !== undefined ||
      req.body.eventRegion !== undefined ||
      req.body.createdBy !== undefined
    ) {
      const existingEventLocation = await eventLocationModel.findOne({
        event: req.body.event,
      });
      if (!existingEventLocation) {
        const eventLocation = new eventLocationModel({
          ...req.body,
        });
        eventLocation.save();
        res.json(eventLocation._id);
      } else {
        res.status(500).json({ error: "Event Location already exists" });
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

// update event location
exports.updateData = async function (req, res, next) {
  try {
    const { id } = req.params;
    const dbEventLocation = await eventLocationModel.findById({ _id: id });
    if (dbEventLocation) {
      // eventLocationLatitude
      let eventLocationLatitude = req.body.eventLocationLatitude;
      if (req.body.eventLocationLatitude === undefined) {
        eventLocationLatitude = dbEventLocation.eventLocationLatitude;
      }
      // eventLocationLongitude
      let eventLocationLongitude = req.body.eventLocationLongitude;
      if (req.body.eventLocationLongitude === undefined) {
        eventLocationLongitude = dbEventLocation.eventLocationLongitude;
      }
      // eventAddress
      let eventAddress = req.body.eventAddress;
      if (req.body.eventAddress === undefined) {
        eventAddress = dbEventLocation.eventAddress;
      }

      // eventCountry
      let eventCountry = req.body.eventCountry;
      if (req.body.eventCountry === undefined) {
        eventCountry = dbEventLocation.eventCountry;
      }

      // eventCity
      let eventCity = req.body.eventCity;
      if (req.body.eventCity === undefined) {
        eventCity = dbEventLocation.eventCity;
      }

      // eventRegion
      let eventRegion = req.body.eventRegion;
      if (req.body.eventRegion === undefined) {
        eventRegion = dbEventLocation.eventRegion;
      }

      // eventLocationImage
      let eventLocationImage = req.body.eventLocationImage;
      if (req.body.eventLocationImage === undefined) {
        eventLocationImage = dbEventLocation.eventLocationImage;
      }

      if (
        req.body.eventLocationLatitude !== undefined ||
        req.body.eventLocationLongitude !== undefined ||
        req.body.eventAddress !== undefined ||
        req.body.eventCountry !== undefined ||
        req.body.eventCity !== undefined ||
        req.body.eventRegion !== undefined ||
        req.body.eventLocationImage !== undefined
      ) {
        if (
          (req.body.eventLocationLatitude !==
            dbEventLocation.eventLocationLatitude &&
            req.body.eventLocationLatitude !== undefined) ||
          (req.body.eventLocationLongitude !==
            dbEventLocation.eventLocationLongitude &&
            req.body.eventLocationLongitude !== undefined) ||
          (req.body.eventAddress !== dbEventLocation.eventAddress &&
            req.body.eventAddress !== undefined) ||
          (req.body.eventCountry !== dbEventLocation.eventCountry &&
            req.body.eventCountry !== undefined) ||
          (req.body.eventCity !== dbEventLocation.eventCity &&
            req.body.eventCity !== undefined) ||
          (req.body.eventRegion !== dbEventLocation.eventRegion &&
            req.body.eventRegion !== undefined) ||
          (req.body.eventLocationImage !== dbEventLocation.eventLocationImage &&
            req.body.eventLocationImage !== undefined)
        ) {
          const updatedEvent = {
            eventLocationLatitude: eventLocationLatitude,
            eventLocationLongitude: eventLocationLongitude,
            eventAddress: eventAddress,
            eventCountry: eventCountry,
            eventCity: eventCity,
            eventRegion: eventRegion,
            eventLocationImage: eventLocationImage,
          };
          const eventLocation = await eventLocationModel.findByIdAndUpdate(id, {
            $set: updatedEvent,
          });
          if (!eventLocation) {
            res.status(500).json({ error: "Error while updating location " });
          } else {
            res.json(await eventLocationModel.findById({ _id: id }));
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

// delete event Location
exports.deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingEventLocation = await eventLocationModel.findOne({
      isDeleted: false,
      _id: id,
    });
    if (existingEventLocation) {
      const eventLocation = await eventLocationModel.findByIdAndUpdate(id, {
        $set: { isDeleted: true },
      });
      if (eventLocation) {
        res.status(200).json("Event Location deleted successfully");
      } else {
        res.json({ error: "Error while deleting the event Location" });
      }
    } else {
      res.status(404).json({ error: "Event Location doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};

// restore event Location

exports.restoreData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingEventLocation = await eventLocationModel.findOne({
      isDeleted: true,
      _id: id,
    });
    if (existingEventLocation) {
      const eventLocation = await eventLocationModel.findByIdAndUpdate(id, {
        $set: { isDeleted: false },
      });
      if (eventLocation) {
        res.status(200).json("Event Location restored successfully");
      } else {
        res.json({ error: "Error while restoring the event Location" });
      }
    } else {
      res.status(404).json({ error: "Event Location doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};
