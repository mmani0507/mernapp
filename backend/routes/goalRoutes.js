const express = require("express");
const router = express.Router();
const {
  getGoals,
  showGoal,
  storeGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

router.route("/").get(getGoals).post(storeGoal);

router.route("/:id").get(showGoal).put(updateGoal).delete(deleteGoal);

module.exports = router;
