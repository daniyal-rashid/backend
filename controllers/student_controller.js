const Student = require("../models/studentSchema.js");
const StudentAttendance = require("../models/studentAttendance.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const CryptoJS = require("crypto-js");
const Teacher = require("../models/teacherSchema.js");

const handleStudentRegister = async (req, res) => {
  const {
    studentName,
    fatherName,
    gender,
    sClass,
    section,
    rollNo,
    password,
    role,
  } = req.body;

  if (
    !studentName ||
    !fatherName ||
    !gender ||
    !sClass ||
    !section ||
    !rollNo ||
    !password ||
    !role
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
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY
    ).toString();

    const studentId = `${sClass}-${section}-${rollNo}`;

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
      password: {
        hashed: hashedPassword,
        encrypted: encryptedPassword,
      },
      role: role,
    });

    res.json({
      msg: "Student Registered Successfully",
      data: { studentId: studentId, password: password, role: role },
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
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token provided" });

    const verify = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = verify;

    const students = await Student.find({ schoolId: _id });

    const decryptedPassword = (encryptedPassword) => {
      try {
        const bytes = CryptoJS.AES.decrypt(
          encryptedPassword,
          process.env.SECRET_KEY
        );
        return bytes.toString(CryptoJS.enc.Utf8);
      } catch (e) {
        console.error("Decryption error:", e);
        return "Error";
      }
    };

    const studentsList = students.map((student) => {
      return {
        id: student._id,
        name: student.studentName,
        std_id: student.studentId,
        password: decryptedPassword(student.password?.encrypted),
        fatherName: student.fatherName,
        sClass: student.sClass,
        section: student.section,
      };
    });

    res.json(studentsList);
  } catch (error) {
    console.error("Get All Students Error:", error);
    res.status(500).json({ status: "failed", msg: error.message });
  }
};

const handleStudentLogin = async (req, res) => {
  const { studentId, password } = req.body;

  try {
    const student = await Student.findOne({ studentId: studentId });
    if (student) {
      const validated = await bcrypt.compare(password, student.password.hashed);

      const { _id, schoolName, schoolId, role } = student;
      if (validated) {
        const token = jwt.sign(
          { _id, schoolName, schoolId, role },
          process.env.JWT_SECRET,
          {
            expiresIn: "30d",
          }
        );
        return res.json({ status: "success", token: token });
      } else {
        return res.json({
          status: "failed",
          msg: "ID or password is incorrect",
        });
      }
    } else {
      return res.json({ status: "failed", msg: "Student Not Found" });
    }
  } catch (error) {
    res.json({ status: "faield", err: error.message });
  }
};

const handleStudentDashboard = async (req, res) => {
  res.send("This is student dashboard");
};

const handleStudentAttendance = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  const { schoolId, _id } = verify;
  const { attendance, date } = req.body;

  try {
    const teacher = await Teacher.findOne({ _id: _id });
    const { sClass, section } = teacher;

    const studentAttendance = await StudentAttendance.create({
      attendance: attendance,
      date: date,
      schoolId: schoolId,
      sClass: sClass,
      section: section,
    });

    res.json({ status: "success", data: studentAttendance });
  } catch (error) {
    res.json({ msg: "failed", err: error });
  }
};

const handleStudentAttendenceReport = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  const { _id } = verify;

  try {
    const attendanceReport = await StudentAttendance.find(
      {
        "attendance.id": _id,
      },
      { "attendance.$": 1, date: 1 }
    ).exec();

    res.json({ msg: "success", data: attendanceReport });
  } catch (error) {
    res.json({ msg: "failed", err: error.message });
  }
};

const handleFees = async (req, res) => {
  try {
    const { studentID, month, status } = req.body;

    const student = await Student.findOne({ _id: studentID });

    if (student) {
      await Student.findOneAndUpdate(
        { _id: student._id },
        { $push: { feeDetails: { month: month, status: status } } },
        { new: true }
      );

      return res.json({ status: "success", msg: "Successfully Submitted Fee" });
    } else {
      return res.json({ msg: "STUDENT NOT FOUND" });
    }
  } catch (error) {
    res.json({ msg: "failed", err: error.message });
  }
};

// Show Fee Details on Student Portal

const showFeeDetailsToStudent = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  const { _id } = verify;
  try {
    const data = await Student.find({ _id: _id });
    const result = data[0].feeDetails;
    res.json({ feeDetails: result });
  } catch (error) {
    res.json({ msg: "failed", err: error.message });
  }
};

module.exports = {
  handleStudentRegister,
  handleStudentDelete,
  handleStudentUpdate,
  getAllStudents,
  handleStudentLogin,
  handleStudentDashboard,
  handleStudentAttendance,
  handleStudentAttendenceReport,
  handleFees,
  showFeeDetailsToStudent,
};
