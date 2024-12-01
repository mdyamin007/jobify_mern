const express = require("express");
const { generateJobDescription } = require("../controllers/aiController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/generate",
  verifyToken,
  checkRole(["admin"]),
  generateJobDescription
);

module.exports = router;
