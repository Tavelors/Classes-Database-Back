const express = require("express");
const router = express.Router();
const {
  createStudent,
  getStudents,
  updateStudent,
  getStudentById,
  getStudentQuery,
  deleteStudent,
} = require("../controllers/studentController");
const { protect } = require("../errors/auth");
router.get("/sortstudents/", protect, getStudentQuery);
router.post("/create", protect, createStudent);
router.put("/update/:student_id", protect, updateStudent);
router.get("/students", protect, getStudents);
router.get("/:student_id", protect, getStudentById);
router.delete("/:student_id", protect, deleteStudent);
module.exports = router;
