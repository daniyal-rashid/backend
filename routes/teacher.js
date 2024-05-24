const express = require("express");
const { handleTeacherDashboard } = require("../controllers/teacherControllers");
const { handleStudentRegister } = require("../controllers/student_controller");
const router = express.Router();

router.route("/dashboard").get(handleTeacherDashboard);

module.exports = router;
