const router = require("express").Router();
const bcrypt = require("bcrypt");
const user = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const verify = require("../../middleware/verifyToken");
const multer = require("multer");
const path = require("path");

const {
  getUserInfo,
  createUser,
  loginUser,
} = require("../../services/users.services");

//Set up multer
const allowedFileTypes = /jpeg|jpg|png|jfif/;
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, callback) => {
    callback(
      null,
      "profile_picture-" + req.body.name + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const extname = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedFileTypes.test(file.mimetype);
    if (mimetype && extname) {
      return callback(null, true);
    } else {
      return callback("Only images allowed");
    }
  },
}).single("profile_picture");

//to get logged in users info
router.route("/myInfo").get(verify, async (req, res) => {
  try {
    email = req.user.email;
    const myInfo = await getUserInfo(email);
    if (myInfo.success) {
      res.status(200).send({ message: myInfo.doc, success: true });
    } else {
      res
        .status(404)
        .send({ message: "Given user does not exists", success: false });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error occurred check your internet", success: false });
  }
});

//signup route
router.route("/add").post(upload, async (req, res) => {
  try {
    let responseData = await createUser(req);
    if (responseData.success) {
      res.status(201).send(responseData);
    } else {
      res.status(400).send(responseData);
    }
  } catch (err) {
    return res
      .status(400)
      .send({ message: "Error occurred check your internet", success: false });
  }
});

//login route
router.route("/login").post(async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const responseData = await loginUser(email, password);
    if (responseData.success) {
      res.status(200).send(responseData);
    } else {
      res.status(400).send(responseData);
    }
  } catch (err) {
    return res
      .status(400)
      .send({ message: "Error occurred check your internet", success: false });
  }
});

module.exports = router;
