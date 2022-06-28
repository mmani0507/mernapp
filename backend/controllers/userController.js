const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Register Users
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Store user" });
});

// @desc    Authenticate a user
// @route   POST /api/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "authenticate user" });
});

// @desc    get user details
// @route   POST /api/users/me
// @access  Public
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get user" });
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
