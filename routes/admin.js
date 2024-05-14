const express = require("express");
const router = express.Router();

const {
  handleAdminRegister,
  handleAdminLogin,
  adminHomePage,
} = require("../controllers/adminController");

const {
  handleCreateNotice,
  handleUpdateNotice,
  handleDeleteNotice,
  getAllNotice,
  getNotice,
} = require("../controllers/noticeController");

const authenticationMiddleware = require("../middleware/auth");

// ADMIN ROUTES
router.route("/dashboard").get(authenticationMiddleware, adminHomePage);

// NOTICE ROUTES
router.route("/notice").get(getAllNotice).post(handleCreateNotice);
router
  .route("/notice/:id")
  .get(getNotice)
  .patch(handleUpdateNotice)
  .delete(handleDeleteNotice);

module.exports = router;
