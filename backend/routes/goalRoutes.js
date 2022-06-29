const express = require("express");
const router = express.Router();
const {
  getGoals,
  showGoal,
  storeGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, storeGoal);

router
  .route("/:id")
  .get(protect, showGoal)
  .put(protect, updateGoal)
  .delete(protect, deleteGoal);

module.exports = router;
