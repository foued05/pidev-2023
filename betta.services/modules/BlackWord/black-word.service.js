const blackWordModel = require("./black-word.model");

// list black words
exports.listData = async (req, res, next) => {
  try {
    const list = await blackWordModel.find();
    if (list.length > 0) {
      res.status(200).json(list);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      blackWord: error.blackWord,
      error: error,
    });
  }
};

// get black word by _id
exports.getData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blackWord = await blackWordModel.findOne({ _id: id });
    if (blackWord) {
      res.status(200).json(blackWord);
    } else {
      res.status(404).json("black word doesn't exist");
    }
  } catch (error) {
    res.json({
      blackWord: error.blackWord,
      error: error,
    });
  }
};

// get black word by word
exports.getDataByWord = async (req, res, next) => {
  try {
    const { word } = req.params;
    const blackWord = await blackWordModel.findOne({
      blackWord: { $regex: word, $options: "i" },
    });
    if (blackWord) {
      res.status(200).json(blackWord);
    } else {
      res.status(404).json("black word doesn't exist");
    }
  } catch (error) {
    res.json({
      blackWord: error.blackWord,
      error: error,
    });
  }
};

// add black word
exports.addData = async (req, res, next) => {
  try {
    if (req.body.blackWord !== undefined || req.body.createdBy !== undefined) {
      const existingblackWord = await blackWordModel.findOne({
        blackWord: req.body.blackWord,
      });
      if (!existingblackWord) {
        const blackWord = new blackWordModel({
          blackWord: req.body.blackWord,
          createdBy: req.body.createdBy,
        });
        blackWord.save();
        res.json(blackWord._id);
      } else {
        res.status(500).json({ error: "black word already exists" });
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

// delete black word

exports.deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingblackWord = await blackWordModel.findOne({
      isDeleted: false,
      _id: id,
    });
    if (existingblackWord) {
      const blackWord = await blackWordModel.findByIdAndUpdate(id, {
        $set: { isDeleted: true },
      });
      if (blackWord) {
        res.status(200).json("black word deleted successfully");
      } else {
        res.json({ error: "Error while deleting the black word" });
      }
    } else {
      res.status(404).json({ error: "black word doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};

// restore black word

exports.restoreData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingblackWord = await blackWordModel.findOne({
      isDeleted: true,
      _id: id,
    });
    if (existingblackWord) {
      const blackWord = await blackWordModel.findByIdAndUpdate(id, {
        $set: { isDeleted: false },
      });
      if (blackWord) {
        res.status(200).json("black word restored successfully");
      } else {
        res.json({ error: "Error while restoring the black word" });
      }
    } else {
      res.status(404).json({ error: "black word doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};
