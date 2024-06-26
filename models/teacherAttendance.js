const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    attendance: [
      {
        name: {
          type: String,
          required: true,
        },
        id: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["Present", "Absent", "LateIn"],
          required: true,
        },
      },
    ],
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const TeacherAttendance = mongoose.model("teacherAttendance", attendanceSchema);

module.exports = TeacherAttendance;
