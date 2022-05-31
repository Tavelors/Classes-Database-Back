const express = require("express");
const router = express.Router();
const {
  putPay,
  getPayByStudentId,
  getAllPay,
  getPayByClassId,
  postPayment,
} = require("../controllers/payController");
const { protect } = require("../errors/auth");
router.put("/update/:pay_id", protect, putPay);
router.get("/class/:class_id", getPayByClassId);
router.get("/student/:student_id", getPayByStudentId);
router.get("/payment/", getAllPay);
router.post("/create/:student_id", protect, postPayment);
// router.get("/studentclass/:student_id", getStudentClass);

module.exports = router;
