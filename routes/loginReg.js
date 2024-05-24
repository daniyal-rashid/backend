const express = require("express");
const router = express.Router();

const {
  handleAdminRegister,
  handleAdminLogin,
} = require("../controllers/adminController");

const { handleTeacherLogin } = require("../controllers/teacherControllers");
const { handleStudentLogin } = require("../controllers/student_controller");

// admin
router.route("/adminRegister").post(handleAdminRegister);
router.route("/adminLogin").post(handleAdminLogin);

// Teacher
router.route("/teacherLogin").post(handleTeacherLogin);

// Student
router.route("/studentLogin").post(handleStudentLogin);

module.exports = router;
