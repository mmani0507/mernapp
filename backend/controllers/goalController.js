const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

// @desc    get all goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc    get single goal
// @route   GET /api/goals/:id
// @access  Private
const showGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Cannot find goal");
  }
  if (goal.user.toString() != req.user.id) {
    res.status(401);
    throw new Error("not authorised");
  }
  res.status(200).json(goal);
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const storeGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add valid text");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

// @desc    update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Cannot find goal");
  }

  if (goal.user.toString() != req.user.id) {
    res.status(401);
    throw new Error("not authorised");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// @desc    Set goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Cannot find goal");
  }
  if (goal.user.toString() != req.user.id) {
    res.status(401);
    throw new Error("not authorised");
  }
  await goal.remove();
  res.json({ id: req.params.id });
});

module.exports = {
  getGoals,
  showGoal,
  storeGoal,
  updateGoal,
  deleteGoal,
};
