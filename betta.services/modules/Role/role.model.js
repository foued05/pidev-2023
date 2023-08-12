const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { collection: "Role" },
  { timestamps: true }
);

const role = mongoose.model("Role", roleSchema);
module.exports = role;
