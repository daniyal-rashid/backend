const express = require("express");
const {
  handleTeacherDashboard,
  teacherAttendanceReport,
} = require("../controllers/teacherControllers");
const TeacherAttendance = require("../models/teacherAttendance");
const router = express.Router();

router.route("/dashboard").get(handleTeacherDashboard);
router.route("/attendanceReport/").get(teacherAttendanceReport);

module.exports = router;
