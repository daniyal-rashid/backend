const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    result: {
      type: Array,
    },
    Date: {
      type: Date,
    },

    // teacherId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "teacher",
    // },
    // date: {
    //   type: Date,
    //   required: true,
    // },
    // status: {
    //   type: String,
    //   enum: ["Present", "Absent", "LateIn"],
    //   required: true,
  },
  { timestamps: true }
);

const TeacherAttendance = mongoose.model("teacherAttendance", attendanceSchema);

module.exports = TeacherAttendance;
