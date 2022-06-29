const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc    Register Users
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //validate required field
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please input valid  field");
  }
  //check user exist in db

  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User already exist");
  }

  //encrypt passwords

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //store in database

  const newUser = await User.create({ name, email, password: hashedPassword });
  if (!newUser) {
    res.status(400);

    throw new Error("Invalid data");
  }

  res.status(201).json({
    _id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    token: generateToken(newUser.id),
  });
});

// @desc    Authenticate a user
// @route   POST /api/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //validate input

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter valid inputs");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not registered");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  });
});

// @desc    get user details
// @route   POST /api/users/me
// @access  Public
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//generate Token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
