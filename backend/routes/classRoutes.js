const express = require("express");
const router = express.Router();
const {
  createClass,
  updateClass,
  getClassById,
  getClass,
  getStudentClass,
  deleteClass,
  getRecent,
  createTenClass,
} = require("../controllers/classController");
const { protect } = require("../errors/auth");
router.post("/:student_id", protect, createClass);
router.post("/ten/:student_id", protect, createTenClass);
router.put("/update/:class_id", protect, updateClass);
router.delete("/delete/:class_id", protect, deleteClass);
router.get("/singleclass/:class_id", protect, getClassById);
router.get("/recent/", protect, getRecent);
router.get("/multipleclass/", protect, getClass);
router.get("/studentclass/:student_id", protect, getStudentClass);

module.exports = router;
