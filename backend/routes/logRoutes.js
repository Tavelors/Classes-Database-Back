const express = require("express");
const router = express.Router();
const { getLog, postLog } = require("../controllers/logController");
const { protect } = require("../errors/auth");
router.get("/", protect, getLog);
router.post("/", protect, postLog);
// router.get("/studentclass/:student_id", getStudentClass);

module.exports = router;
