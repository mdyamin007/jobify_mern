const express = require("express");
const {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, checkRole(["admin"]), createJob);
router.get("/", verifyToken, getJobs);
router.put("/:id", verifyToken, checkRole(["admin"]), updateJob);
router.delete("/:id", verifyToken, checkRole(["admin"]), deleteJob);

module.exports = router;
