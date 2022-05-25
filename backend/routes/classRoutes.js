const express = require("express");
const router = express.Router();
const {
  createClass,
  updateClass,
  getClassById,
  getClass,
  getStudentClass,
  deleteClass,
} = require("../controllers/classController");
router.post("/:student_id", createClass);
router.put("/update/:class_id", updateClass);
router.delete("/delete/:class_id", deleteClass);
router.get("/singleclass/:class_id", getClassById);
router.get("/multipleclass/", getClass);
router.get("/studentclass/:student_id", getStudentClass);

module.exports = router;
