const express = require("express");
const router = express.Router();
const {
  createStudent,
  getStudents,
  updateStudent,
  getStudentById,
} = require("../controllers/studentController");
const { protect } = require("../errors/auth");
router.post("/create", createStudent);
router.put("/update/:student_id", updateStudent);
router.get("/students", getStudents);
router.get("/:student_id", getStudentById);
// router.get("/:student_id", getStudentById);
module.exports = router;
