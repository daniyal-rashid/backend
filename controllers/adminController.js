const Admin = require("../models/adminSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const handleAdminRegister = async (req, res) => {
  const { name, email, password, schoolName } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (!name || !email || !password || !schoolName) {
      return res.json({ status: "fail", msg: "All fields are required" });
    }
    const admin = await Admin.create({
      name: name,
      email: email,
      password: hashedPassword,
      schoolName: schoolName,
    });
    if (admin) {
      const { _id, schoolName, role } = admin;
      const token = jwt.sign({ _id, schoolName, role }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.json({ msg: "success", token: token });
    }
  } catch (error) {
    res.json({ msg: "failed", err: error });
  }
};

const handleAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ msg: "email or password are required" });
    }
    const admin = await Admin.findOne({
      email: email,
    });

    const { _id, schoolName, role } = admin;
    if (admin) {
      const validated = await bcrypt.compare(password, admin.password);
      if (validated) {
        const token = jwt.sign({ _id, schoolName, role }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        return res.json({ msg: "success", token: token });
      } else {
        return res.json({
          status: "failed",
          msg: "eamil or apssword is incorrect",
        });
      }
    } else {
      return res.json({
        status: "failed",
        msg: "admin not found",
      });
    }
  } catch (error) {
    res.json({ msg: "failed", err: error.message });
  }
};

const adminHomePage = async (req, res) => {
  res.send("This is admin dashboard");
};

module.exports = {
  handleAdminRegister,
  handleAdminLogin,
  adminHomePage,
};
