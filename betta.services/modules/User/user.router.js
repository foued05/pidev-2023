var express = require("express");
var router = express.Router();
const {
  listData,
  addData,
  getData,
  authenticate,
  improveAccount,
  sendEmail,
  verifyForgotPassword,
  deleteUser,
  updatePasswordByEmail,
  superAdmin,
  deleteLogic,
  resetPassword
} = require("./user.service");

// list users 
router.get("/list", listData);

// get user by _id
router.get("/:id", getData);

// create user
router.post("/add", addData);

router.post("/authenticate", authenticate);

router.post("/improveAccount/:id", improveAccount);

router.post("/superAdmin/:id", superAdmin);

router.post("/sendEmail/:email", sendEmail);

router.post("/deleteLogic/:id", deleteLogic);

router.get("/verifyForgotPassword/:key", verifyForgotPassword);

router.post("/deleteUser/:id", deleteUser);

router.post("/updatePasswordByEmail", updatePasswordByEmail);

router.post("/resetPassword", resetPassword);

module.exports = router;
