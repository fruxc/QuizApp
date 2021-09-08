const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUserInfo = async (email) => {
  try {
    const doc = await user.findOne({ email });
    if (doc) {
      let myInfo = {
        name: doc.name,
        email: doc.email,
        id: doc._id,
        phone: doc.phone,
        role: doc.role,
        profile_picture: doc.profile_picture,
      };
      return { doc: myInfo, success: true };
    } else {
      return { doc: "Given user does not exists", success: false };
    }
  } catch (err) {
    return { doc: "Error connecting to the database", success: false };
  }
};

const createUser = async (req) => {
  try {
    const name = req.body.name;
    const email = req.body.email.toLowerCase();
    const password = await bcrypt.hash(req.body.password, 10);
    const doc = await user.findOne({ email }).exec();
    if (doc) {
      return {
        message: "Account already exists!",
        success: false,
      };
    }
    let newUser;
    if (req.body.phone) {
      const phone = req.body.phone;
      if (req.file) {
        let profile_picture = req.file.filename;
        newUser = new user({ name, email, password, phone, profile_picture });
      } else {
        newUser = new user({ name, email, password, phone });
      }
    } else {
      if (req.file) {
        let profile_picture = req.file.filename;
        newUser = new user({ name, email, password, profile_picture });
      } else {
        newUser = new user({ name, email, password });
      }
    }

    let ans = await newUser.save();
    if (ans) {
      return { message: "user added!", success: true };
    } else {
      return { message: "Error while saving the new user", success: false };
    }
  } catch (err) {
    return { message: "Error occurred!!", success: false };
  }
};

const loginUser = async (email, password) => {
  try {
    const doc = await user.findOne({ email }).exec();
    if (!doc) {
      return { message: "Incorrect password/email", success: false };
    }
    const passwordCheck = bcrypt.compareSync(password, doc.password);
    if (!passwordCheck) {
      return { message: "Incorrect password", success: false };
    } else {
      const token = jwt.sign(
        { id: doc._id, email: doc.email },
        process.env.ACCESS_TOKEN_SECRET
      );
      return {
        message: { role: doc.role, name: doc.name, token: token },
        success: true,
      };
    }
  } catch (err) {
    return { message: err, success: false };
  }
};

module.exports = {
  getUserInfo,
  createUser,
  loginUser,
};
