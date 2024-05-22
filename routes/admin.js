const express = require("express");
const router = express.Router();

const { adminHomePage } = require("../controllers/adminController");

const {
  handleCreateNotice,
  handleUpdateNotice,
  handleDeleteNotice,
  getAllNotice,
} = require("../controllers/noticeController");

const authenticationMiddleware = require("../middleware/auth");
const {
  handleStudentRegister,
  handleStudentDelete,
  handleStudentUpdate,
  getAllStudents,
} = require("../controllers/student_controller");

// ADMIN ROUTES
router.route("/dashboard").get(authenticationMiddleware, adminHomePage);

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

module.exports = router;
