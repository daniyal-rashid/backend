const express = require("express");
const router = express.Router();

const { adminHomePage } = require("../controllers/adminController");
const authenticationMiddleware = require("../middleware/auth");

// Notice
const {
  handleCreateNotice,
  handleUpdateNotice,
  handleDeleteNotice,
  getAllNotice,
} = require("../controllers/noticeController");

// Students
const {
  handleStudentRegister,
  handleStudentDelete,
  handleStudentUpdate,
  getAllStudents,
} = require("../controllers/student_controller");

//Teachers
const {
  handleTeacherRegistration,
  getAllTeachers,
  handleTeacherDelete,
  handleTeacherUpdate,
} = require("../controllers/teacherControllers");

// ADMIN ROUTES
router.route("/dashboard").get(adminHomePage);

// NOTICE ROUTES
router.route("/notice").get(getAllNotice).post(handleCreateNotice);
router
  .route("/notice/:id")
  .patch(handleUpdateNotice)
  .delete(handleDeleteNotice);

// STUDENT ROUTES
router.route("/studentReg").post(handleStudentRegister);
router.route("/students").get(getAllStudents);
router
  .route("/student/:id")
  .delete(handleStudentDelete)
  .patch(handleStudentUpdate);

// TEACHER ROUTES
router.route("/teacherReg").post(handleTeacherRegistration);
router.route("/teachers").get(getAllTeachers);
router
  .route("/teacher/:id")
  .delete(handleTeacherDelete)
  .patch(handleTeacherUpdate);

module.exports = router;
