const express = require("express");
const router = express.Router();
const {
  putPay,
  getPayByStudentId,
  getAllPay,
  getPayByClassId,
} = require("../controllers/payController");
router.put("/update/:pay_id", putPay);
router.get("/class/:class_id", getPayByClassId);
router.get("/student/:student_id", getPayByStudentId);
router.get("/payment/", getAllPay);
// router.get("/studentclass/:student_id", getStudentClass);

module.exports = router;
