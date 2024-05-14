const Student = require("../models/studentSchema.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "kashdkasgsd";

const handleStudentLogin = async (req, res) => {
  const { studentId, password } = req.body;
  if (!studentId || !password) {
    return res.json({ msg: "Id or password are required" });
  }
  try {
    const student = await Student.findOne({
      studentId: studentId,
      password: password,
    });
    if (!student) {
      return res.json({ msg: "Student not found" });
    }
    const token = jwt.sign({ studentId }, JWT_SECRET, { expiresIn: "30d" });
    return res.json({ status: "success", token: token });
  } catch (error) {
    res.redirect("/");
  }
};

const handleHomePage = async (req, res) => {
  await res.send("this is home page after login");
};

module.exports = {
  handleStudentLogin,
  handleHomePage,
};
