const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUser);
module.exports = router;
