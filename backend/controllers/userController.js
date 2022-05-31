const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log("here");
  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  //   const token = jwt.sign({
  //     email: email,
  //   });
  const userExists = await User.findOne({ email });
  console.log(userExists);
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const newPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: newPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    res.status(400); //
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const validPassword = await bcrypt.compare(password, user.password);
  if (user.email === "sl.instituto.de.idiomas@gmail.com") {
    if (!validPassword) {
      res.status(400);
      throw new Error("Invalid credentials");
    } else {
      res.status(200).json({
        token: generateToken(user._id),
        user_id: user.id,
      });
    }
  }

  if (!validPassword) {
    res.status(400);
    throw new Error("Invalid credentials");
  } else {
    res.status(200).json({
      user_id: user.id,
    });
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find({});
  res.status(200).json(user);
});

const getUserById = asyncHandler(async (req, res) => {
  const { user_id } = req.params;
  const user = await User.findById(user_id);
  if (!user) {
    res.status(400);
    throw new Error("User doesn't exist");
  }

  res.status(200).json(user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getUsers, getUserById };
