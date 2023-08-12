const roleModel = require("./role.model");
const jwt = require('jsonwebtoken');

// list eventCategories
exports.listData = async (req, res, next) => {
  try {
    const list = await roleModel.find();
    if (list.length > 0) {
      res.status(200).json(list);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      user: error.user,
      error: error,
    });
  }
};

// get User by _id
exports.getData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await roleModel.findOne({ _id: id });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("Role doesn't exist Found");
    }
  } catch (error) {
    res.json({
      user: error.user,
      error: error,
    });
  }
};

// add User
exports.addData = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log(req.body)
    if (req.body.name !== undefined) {
      const existinguser = await roleModel.findOne({
        name:name,
      });
      if (!existinguser) {
        const role = new roleModel({
          name: name
        });
        role.save();
        res.json(role._id);
      } else {
        res.status(500).json({ error: "Role already exists" });
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
