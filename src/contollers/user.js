const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { firstName, lastName, email, password, phone } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        msg: "User Already Exists",
      });
    }
    user = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).send(user);
  } catch (err) {
    //console.log(err);
    res.status(500).send({ status: false, message: "Error in Saving" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send({ status: false, message: "Error in Fetching User" });
    //console.log(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send({ status: false, message: "Error in Fetching User" });
    //console.log(error);
  }
};
