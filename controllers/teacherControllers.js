const Teacher = require("../models/teacherSchema");
const Student = require("../models/studentSchema");
const TeacherAttendance = require("../models/teacherAttendance");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const handleTeacherRegistration = async (req, res) => {
  const {
    name,
    email,
    password,
    gender,
    qualification,
    salary,
    sClass,
    section,
    role,
  } = req.body;

  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  const { schoolName, _id } = verify;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const teacher = await Teacher.create({
      name: name,
      email: email,
      password: hashedPassword,
      gender: gender,
      salary: salary,
      qualification: qualification,
      sClass: sClass,
      section: section,
      schoolName: schoolName,
      schoolId: _id,
      role: role,
    });
    res.json({
      msg: "Teacher Registered Successfully",
      data: { email: email, password: password, role: role },
    });
  } catch (error) {
    res.json({ status: "failed", err: error });
  }
};

const getAllTeachers = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  const { _id } = verify;
  try {
    const teachers = await Teacher.find({ schoolId: _id });
    res.json({ data: teachers });
  } catch (error) {
    res.json({ status: "failed", err: error });
  }
};

const handleTeacherDelete = async (req, res) => {
  try {
    await Teacher.deleteOne({ _id: req.params.id });
    res.json({ msg: "Teacher deleted successfully" });
  } catch (error) {
    res.json({ status: "failed", err: error });
  }
};

const handleTeacherUpdate = async (req, res) => {
  try {
    await Teacher.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        salary: req.body.salary,
        qualification: req.body.qualification,
        sClass: req.body.sClass,
      }
    );
    res.json({ msg: "Successfully Updated" });
  } catch (error) {
    res.json({ status: "failed", err: error });
  }
};

const handleTeacherLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const teacher = await Teacher.findOne({ email: email, role: "Teacher" });
    if (teacher) {
      const validated = await bcrypt.compare(password, teacher.password);
      const { _id, schoolId, role } = teacher;
      if (validated) {
        const token = jwt.sign({ _id, schoolId, role }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        return res.json({ status: "success", token: token });
      } else {
        return res.json({
          status: "failed",
          msg: "email or password is incorrect",
        });
      }
    } else {
      return res.json({ status: "failed", msg: "NOT FOUND" });
    }
  } catch (error) {
    res, json({ status: "failed", err: error });
  }
};

const handleTeacherDashboard = async (req, res) => {
  res.send("this is teacher dashboard");
};

const handleTeacherAttendance = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  const { _id } = verify;
  const { attendance, date } = req.body;

  try {
    const teacherAttendance = await TeacherAttendance.create({
      attendance: attendance,
      date: date,
      schoolId: _id,
    });

    res.json({ status: "success", data: teacherAttendance });
  } catch (error) {
    res.json({ msg: "failed", err: error });
  }
};

const teacherAttendanceReport = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  const { _id } = verify;

  try {
    const attendanceReport = await TeacherAttendance.find(
      {
        "attendance.id": _id,
      },
      { "attendance.$": 1, date: 1 }
    ).exec();

    res.json({ msg: "success", data: attendanceReport });
  } catch (error) {
    res.json({ msg: "failed", err: error });
  }
};

const showStudents = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  const { _id } = verify;

  const teacher = await Teacher.findOne({ _id: _id });

  const students = await Student.find({
    schoolId: teacher.schoolId,
    sClass: teacher.sClass,
    section: teacher.section,
  });

  res.json({
    msg: "success",
    data: { students },
  });
};

module.exports = {
  handleTeacherRegistration,
  getAllTeachers,
  handleTeacherDelete,
  handleTeacherUpdate,
  handleTeacherLogin,
  handleTeacherDashboard,
  handleTeacherAttendance,
  teacherAttendanceReport,
  showStudents,
};
