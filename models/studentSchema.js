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
    required: true,
  },
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },
  schoolName: {
    type: String,
    required: true,
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
    default: "Student",
  },
  rollNo: {
    type: Number,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    hashed: {
      type: String,
      required: true,
    },
    encrypted: {
      type: String,
      required: true,
    },
  },
  feeDetails: [
    {
      month: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
        enum: ["UNPAID", "PAID"],
      },
    },
  ],
});
const Student = mongoose.model("student", studentSchema);

module.exports = Student;
