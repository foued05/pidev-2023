const eventCommentModel = require("./event-comment.model");
const blackWord = require("../BlackWord/black-word.model");
// list event Comments
exports.listData = async (req, res, next) => {
  try {
    const list = await eventCommentModel.find();
    if (list.length > 0) {
      res.status(200).json(list);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      eventComment: error.eventComment,
      error: error,
    });
  }
};

// get event Comment by _id
exports.getData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventComment = await eventCommentModel.findOne({ _id: id });
    if (eventComment) {
      res.status(200).json(eventComment);
    } else {
      res.status(404).json("Event Comment doesn't exist Found");
    }
  } catch (error) {
    res.json({
      eventComment: error.eventComment,
      error: error,
    });
  }
};

// list event Comment by user
exports.listDataByUser = async (req, res, next) => {
  try {
    const { user } = req.params;
    const eventCommentList = await eventCommentModel.find({
      user: user,
    });
    if (eventCommentList) {
      res.status(200).json(eventCommentList);
    } else {
      res.status(404).json("Event Comment doesn't exist");
    }
  } catch (error) {
    res.json("error", {
      eventComment: error.eventComment,
      error: error,
    });
  }
};

// list event Comment by event
exports.listDataByEvent = async (req, res, next) => {
  try {
    const { event } = req.params;
    const eventCommentList = await eventCommentModel.find({
      event: event,
    });
    if (eventCommentList) {
      res.status(200).json(eventCommentList);
    } else {
      res.status(404).json("Event Comment doesn't exist");
    }
  } catch (error) {
    res.json("error", {
      eventComment: error.eventComment,
      error: error,
    });
  }
};

// search event comment
exports.searchData = async (req, res, next) => {
  try {
    const { search } = req.body;
    let list = [];
    if (!search) {
      list = await eventCommentModel.find();
      console.log("!search");
    } else {
      list = await eventCommentModel.find({
        $or: [
          { eventComment: { $regex: search, $options: "i" } },
          { approvedBy: { $regex: search, $options: "i" } },
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

// add event Comment
exports.addData = async (req, res, next) => {
  try {
    if (
      req.body.event !== undefined ||
      req.body.user !== undefined ||
      req.body.eventComment !== undefined ||
      req.body.isApproved !== undefined ||
      req.body.approvedBy !== undefined ||
      req.body.createdBy !== undefined
    ) {
      const blackWordList = await blackWord.find();
      console.log(blackWordList)
      const matchedKeywords = blackWordList.filter((black) =>
        req.body.eventComment.includes(black.blackWord)
      );
      if (matchedKeywords.length > 0) {
        req.body.isApproved = false;
        req.body.approvedBy = "system blacklist";
      }
      console.log(req.body)
      const eventComment = new eventCommentModel({
        ...req.body,
      });
      console.log(eventComment)
      eventComment.save();
      res.json(eventComment._id);
      // if(await ){}
    } else {
      res
        .status(400)
        .json({ error: "BAD REQUEST : No Data has been inserted " });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateData = async function (req, res, next) {
  try {
    const { id } = req.params;
    const dbEventComment = await eventCommentModel.findById({ _id: id });
    if (dbEventComment) {
      // eventComment
      let eventComment = req.body.eventComment;
      if (req.body.eventComment === undefined) {
        eventComment = dbEventComment.eventComment;
      }
      // isApproved
      let isApproved = req.body.isApproved;
      if (req.body.isApproved === undefined) {
        isApproved = dbEventComment.isApproved;
      }
      // approvedBy
      let approvedBy = req.body.approvedBy;
      if (req.body.approvedBy === undefined) {
        approvedBy = dbEventComment.approvedBy;
      }
      if (
        req.body.eventComment !== undefined ||
        req.body.isApproved !== undefined ||
        req.body.approvedBy !== undefined
      ) {
        if (
          (req.body.eventComment !== dbEventComment.eventComment &&
            req.body.eventComment !== undefined) ||
          (req.body.isApproved !== dbEventComment.isApproved &&
            req.body.isApproved !== undefined) ||
          (req.body.approvedBy !== dbEventComment.approvedBy &&
            req.body.approvedBy !== undefined)
        ) {
          const blackWordList = await blackWord.find();
          const matchedKeywords = blackWordList.filter((black) =>
            req.body.eventComment.includes(black)
          );
          if (matchedKeywords.length > 0) {
            req.body.isApproved = false;
            req.body.approvedBy = "system blacklist";
          } else {
            const updatedEventComment = {
              ...req.body,
            };
            const eventComment = await eventCommentModel.findByIdAndUpdate(id, {
              $set: updatedEventComment,
            });
            if (!eventComment) {
              res
                .status(500)
                .json({ error: "Error while updating event Comment" });
            } else {
              res.json(await eventCommentModel.findById({ _id: id }));
            }
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
        .json({ error: "NOT FOUND : Event Comment doesn't exist" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete event Comment

exports.deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingEventComment = await eventCommentModel.findOne({
      isDeleted: false,
      _id: id,
    });
    if (existingEventComment) {
      const eventComment = await eventCommentModel.findByIdAndUpdate(id, {
        $set: { isDeleted: true },
      });
      if (eventComment) {
        res.status(200).json("Event Comment deleted successfully");
      } else {
        res.json({ error: "Error while deleting the event Comment" });
      }
    } else {
      res.status(404).json({ error: "Event Comment doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};

// restore event Comment

exports.restoreData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingEventComment = await eventCommentModel.findOne({
      isDeleted: true,
      _id: id,
    });
    if (existingEventComment) {
      const eventComment = await eventCommentModel.findByIdAndUpdate(id, {
        $set: { isDeleted: false },
      });
      if (eventComment) {
        res.status(200).json("Event Comment restored successfully");
      } else {
        res.json({ error: "Error while restoring the event Comment" });
      }
    } else {
      res.status(404).json({ error: "Event Comment doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};
