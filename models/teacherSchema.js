const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Teacher",
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    qualification: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    schoolName: {
      type: String,
      required: true,
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
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
    teachSubject: [
      {
        name: {
          type: String,
          required: true,
        },
        classes: [
          {
            class: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Teacher = mongoose.model("teacher", teacherSchema);

module.exports = Teacher;
