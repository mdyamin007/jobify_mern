const express = require("express");
const {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
} = require("../controllers/userController");
const { verifyToken, isSuperAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes
router.post("/", verifyToken, isSuperAdmin, createUser); // Create a new user (admin)
router.put("/:id", verifyToken, isSuperAdmin, updateUser); // Update a user by ID
router.delete("/:id", verifyToken, isSuperAdmin, deleteUser); // Delete a user by ID
router.get("/", verifyToken, isSuperAdmin, getUsers); // Get all users
router.get("/:id", verifyToken, isSuperAdmin, getUserById); // Get a specific user by ID

module.exports = router;
