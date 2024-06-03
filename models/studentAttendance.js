const mongoose = require("mongoose");

const studentAttendacnceSchema = new mongoose.Schema(
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
          required: true,
          enum: ["Present", "Absent"],
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

const StudentAttendacnce = mongoose.model(
  "studentAttendance",
  studentAttendacnceSchema
);

module.exports = StudentAttendacnce;
