const express = require("express");
const router = express.Router();

const {
  handleStudentDashboard,
  handleStudentAttendenceReport,
  showFeeDetailsToStudent,
} = require("../controllers/student_controller");
const { showAllNotices } = require("../controllers/noticeController");

router.route("/dashboard").get(handleStudentDashboard);
router.route("/notices").get(showAllNotices);
router.route("/attendanceReport").get(handleStudentAttendenceReport);
router.route("/feeDetails").get(showFeeDetailsToStudent);

module.exports = router;
