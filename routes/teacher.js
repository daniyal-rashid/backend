const express = require("express");
const {
  handleTeacherDashboard,
  teacherAttendanceReport,
  showStudents,
} = require("../controllers/teacherControllers");
const TeacherAttendance = require("../models/teacherAttendance");
const { showAllNotices } = require("../controllers/noticeController");
const {
  handleStudentAttendance,
} = require("../controllers/student_controller");
const router = express.Router();

router.route("/dashboard").get(handleTeacherDashboard);
router.route("/attendanceReport").get(teacherAttendanceReport);
router.route("/notices").get(showAllNotices);
router.route("/showStudents").get(showStudents);
router.route("/studentAttendence").post(handleStudentAttendance);

module.exports = router;
