const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
} = require("../controllers/userController");
const { protect } = require("../errors/auth");
router.post("/login", loginUser);
router.post("/register", protect, registerUser);
router.get("/", protect, getUsers);
router.get("/:user_id", protect, getUserById);
module.exports = router;
