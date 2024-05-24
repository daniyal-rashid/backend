const Student = require("../models/studentSchema.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const handleStudentRegister = async (req, res) => {
  const { studentName, fatherName, gender, sClass, section, rollNo, password } =
    req.body;

  if (
    !studentName ||
    !fatherName ||
    !gender ||
    !sClass ||
    !section ||
    !rollNo ||
    !password
  ) {
    return res.json({
      status: "failed",
      msg: "please provide all required information",
    });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  const { _id, schoolName } = verify;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const studentId = `${sClass}-${section}-${rollNo}`;
    console.log(studentId);
    console.log(typeof studentId);

    const student = await Student.create({
      studentName: studentName,
      fatherName: fatherName,
      gender: gender,
      schoolId: _id,
      schoolName: schoolName,
      sClass: sClass,
      section: section,
      rollNo: rollNo,
      studentId: studentId,
      password: hashedPassword,
    });

    res.json({
      msg: "Student Registered Successfully",
      data: { studentId: studentId, password: password },
    });
  } catch (error) {
    res.json({ status: "failed", err: error });
  }
};

const handleStudentDelete = async (req, res) => {
  try {
    await Student.deleteOne({ _id: req.params.id });
    res.json({ status: "success", msg: "Succesfully deleted" });
  } catch (error) {
    res.json({ status: "failed", err: error });
  }
};

const handleStudentUpdate = async (req, res) => {
  try {
    const studentId = `${req.body.sClass}-${req.body.section}-${req.body.rollNo}`;
    await Student.findByIdAndUpdate(
      { _id: req.params.id },
      {
        studentName: req.body.studentName,
        fatherName: req.body.fatherName,
        gender: req.body.gender,
        sClass: req.body.sClass,
        section: req.body.section,
        rollNo: req.body.rollNo,
        studentId: studentId,
      }
    );
    res.json({ msg: "student sccuessfully updated" });
  } catch (error) {
    res.json({ msg: "failed", err: error });
  }
};

const getAllStudents = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  const { _id } = verify;
  try {
    const students = await Student.find({ schoolId: _id });
    res.json(students);
  } catch (error) {
    res.json({ status: "failed", msg: error });
  }
};

const handleStudentLogin = async (req, res) => {
  res.send("student Login");
};

module.exports = {
  handleStudentRegister,
  handleStudentDelete,
  handleStudentUpdate,
  getAllStudents,
  handleStudentLogin,
};
