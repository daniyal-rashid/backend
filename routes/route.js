const express = require("express");
const {
  handleAdminRegister,
  handleAdminLogin,
} = require("../controllers/adminController");
const router = express.Router();

router.route("/register").post(handleAdminRegister);
router.route("/login").post(handleAdminLogin);

module.exports = router;
