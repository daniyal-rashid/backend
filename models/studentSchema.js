const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    requirec: true,
  },
  sClass: {
    type: String,
    required: true,
    enum: [
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
    ],
  },
  section: {
    type: String,
    required: true,
    enum: ["A", "B", "C", "D", "E"],
  },
  role: {
    type: String,
    default: "student",
  },
  studentId: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const Student = mongoose.model("student", studentSchema);

module.exports = Student;
