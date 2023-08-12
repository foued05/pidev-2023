const { ObjectId } = require("mongodb");
const userModel = require("./user.model");
const roleModel = require("../Role/role.model");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localStorage');
const bcrypt = require('bcrypt');
const { json } = require("express");

// list eventCategories
exports.listData = async (req, res, next) => {
  try {
    const list = await userModel.find({isDeleted: false});
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
    const user = await userModel.findOne({ _id: id, isDeleted: false });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("User doesn't exist Found");
    }
  } catch (error) {
    res.json({
      user: error.user,
      error: error,
    });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email, isDeleted: false});

    if(user){
      bcrypt.compare(password, user.password, async function(err, result) {
        if (err) {
          console.error(err);
        } else if (result) {
          const role = await roleModel.findOne({ _id: user.roleId});
          console.log(role);
          
          const secretKey = 'your-secret-key';
          const payload = {
            id: user._id,
            userName: user.userName,
            email: user.email,
            role: role.name
          };
  
          const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
          res.json({
            status: 200,
            data: token
          });
        } else {
          res.json({
            status: 500,
            data: false
          })
        }
      });
    }else{
      res.json({
        status: 500,
        data: false
      })
    }
  } catch (error) {
    res.json(error)
  }
};

// add User
exports.addData = async (req, res, next) => {
  try {
    const { userName, createdBy, email, password, roleId } = req.body;
    const saltRounds = 10; 
    if (req.body.userName !== undefined || req.body.createdBy !== undefined) {
      const existingUser = await userModel.findOne({
        $or: [
          { userName: userName, isDeleted: false },
          { email: email, isDeleted: false }
        ]
      });
      
      if (!existingUser) {

        bcrypt.hash(password, saltRounds, function(err, hash) {
          if (err) {
            res.status(500).json({ error: "error bcrypt" });
          } else {
            console.log('Mot de passe crypté :', hash);
            const user = new userModel({
              userName: userName,
              createdBy: createdBy,
              email: email,
              password: hash,
              roleId: roleId
            });
            
            user.save();
            res.json({
              status: 200,
              data: true
            });
          }
        });

      } else {
        res.json({
          status: 500,
          data: false
        });
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

exports.improveAccount = async (req, res, next) => {
  const idString = req.params;

  const id = new mongoose.Types.ObjectId(idString);

  userModel.updateOne({ _id: id }, { $set: { improved: true } })
  .then(result => {
    res.json({ id: id });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while updating the document.' });
  });
}

exports.superAdmin = async (req, res, next) => {
  const idString = req.params;

  const id = new mongoose.Types.ObjectId(idString);

  userModel.updateOne({ _id: id }, { $set: { improved: true, roleId: "64995d4944043f6482446e68" } })
  .then(result => {
    res.json({ id: id });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while updating the document.' });
  });
}

exports.deleteLogic = async (req, res, next) => {
  const idString = req.params;

  const id = new mongoose.Types.ObjectId(idString);

  userModel.updateOne({ _id: id }, { $set: { isDeleted: true } })
  .then(result => {
    res.json({ id: id });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while updating the document.' });
  });
}

exports.sendEmail = async (req, res, next) => {
  const {email} = req.params;

  const existinguser = await userModel.findOne({
    email:email,
  });

  if (existinguser) {

    const randomNumber = Math.floor(Math.random() * 9000) + 1000;

    localStorage.setItem('key', randomNumber);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: "465",
      secure: true,
      auth: {
        user: "amamifoued8@gmail.com",
        pass: "tereldlpmahzdtyf"
      }
    });

    let info = await transporter.sendMail({
      from: '"Foued Amami" <amamifoued8@gmail.com>',
      to: email,
      subject: "BETTA: Forgot Password",
      html: `
      <h1>Hello there</h1>
      <p>Your code is ${randomNumber}</p>
      `,
    });

    console.log(info.messageId);

    res.json(true)
  }else{
    res.json(false);
  }
}

exports.verifyForgotPassword = async (req, res, next) => {
  const storedValue = localStorage.getItem('key');
  console.log(storedValue);

  const {key} = req.params;

  if(key === storedValue){
    res.json(true);
  }else{
    res.json(false);
  }
}

exports.deleteUser = async (req, res, next) => {
  const {id} = req.params;

  const deletedDoc = await userModel.findOneAndDelete({ _id: id });

  res.json(id)
}

exports.updatePasswordByEmail = async (req, res, next) => {
  const {email, password} = req.body;

  const existinguser = await userModel.findOne({
    email:email, isDeleted: false
  });

  const saltRounds = 10; 
  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
      res.status(500).json({ error: "error bcrypt" });
    } else {
      console.log('Mot de passe crypté :', hash);
      userModel.updateOne({ _id: existinguser._id }, { $set: { password: hash } })
      .then(result => {
        res.json({ id: email });
      }) 
    }
  }); 
}

exports.resetPassword = async (req, res, next) => {
  const {oldPassword, newPassword, newPassword2, userId} = req.body;
  console.log(userId)

  const id = new mongoose.Types.ObjectId(userId);

  const user = await userModel.findOne({ _id: id, isDeleted: false });
  console.log(user)

  bcrypt.compare(oldPassword, user.password, async function(err, result) {
    if (err) {
      console.error(err);
    } else if (result) {

      const saltRounds = 10; 
      bcrypt.hash(newPassword, saltRounds, function(err, hash) {
        if (err) {
          res.status(500).json({ error: "error bcrypt" });
        } else {
          console.log('Mot de passe crypté :', hash);
          userModel.updateOne({ _id: user._id }, { $set: { password: hash } })
          .then(result => {
            res.json({
              status: 200, 
              data: user._id 
            });
          }) 
        }
      });
    } else {
      res.json({
        status: 500,
        data: false
      })
    }
  });

  // if(user.password == oldPassword){
  //   userModel.updateOne({ _id: user._id }, { $set: { password: password } })
  // .then(result => {
  //   res.json({ id: email });
  // })  
  // }else{
  //   res.status(500).json({error: "password invalid"})
  // }
}
