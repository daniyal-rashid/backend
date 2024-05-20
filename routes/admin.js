const express = require("express");
const router = express.Router();

const { adminHomePage } = require("../controllers/adminController");

const {
  handleCreateNotice,
  handleUpdateNotice,
  handleDeleteNotice,
  getAllNotice,
  getNotice,
} = require("../controllers/noticeController");

const authenticationMiddleware = require("../middleware/auth");
const {
  handleStudentRegister,
  getStudent,
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
  .get(getNotice)
  .patch(handleUpdateNotice)
  .delete(handleDeleteNotice);

// STUDENT ROUTES
router.route("/student").post(handleStudentRegister).get(getAllStudents);
router
  .route("/student/:id")
  .get(getStudent)
  .delete(handleStudentDelete)
  .patch(handleStudentUpdate);

module.exports = router;
