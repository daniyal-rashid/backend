const express = require("express");
const router = express.Router();

const { handleStudentDashboard } = require("../controllers/student_controller");
const { showAllNotices } = require("../controllers/noticeController");

router.route("/dashboard").get(handleStudentDashboard);
router.route("/notices").get(showAllNotices);

module.exports = router;
