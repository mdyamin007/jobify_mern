const express = require("express");
const multer = require("multer");
const {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/",
  verifyToken,
  checkRole(["admin"]),
  upload.single("logo"),
  createCompany
);
router.get("/", verifyToken, getCompanies);
router.put(
  "/:id",
  verifyToken,
  checkRole(["admin"]),
  upload.single("logo"),
  updateCompany
);
router.delete("/:id", verifyToken, checkRole(["admin"]), deleteCompany);

module.exports = router;
