const Student = require("../models/studentSchema.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const handleStudentRegister = async (req, res) => {
  const {
    studentName,
    fatherName,
    gender,
    sClass,
    section,
    studentId,
    password,
  } = req.body;

  if (
    !studentName ||
    !fatherName ||
    !gender ||
    !sClass ||
    !section ||
    !studentId ||
    !password
  ) {
    return res.json({
      status: "failed",
      msg: "please provide all requires information",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const student = await Student.create({
      studentName: studentName,
      fatherName: fatherName,
      gender: gender,
      sClass: sClass,
      section: section,
      studentId: studentId,
      password: hashedPassword,
    });
    res.json({ status: "success", msg: "Student Registered Successfully" });
  } catch (error) {
    res.json({ status: "failed", err: error });
  }
};

const handleStudentDelete = async (req, res) => {
  res.send("student deletion");
};

const handleStudentUpdate = async (req, res) => {
  res.send("student update");
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    res.json({ status: "failed", msg: error });
  }
};

const getStudent = async (req, res) => {
  res.send("Single student");
};

module.exports = {
  handleStudentRegister,
  handleStudentDelete,
  handleStudentUpdate,
  getAllStudents,
  getStudent,
};
