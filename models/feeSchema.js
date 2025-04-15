const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
    },
    month: {
      type: String,
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ["PAID", "UNPAID"],
      required: true,
    },
  },
  { timestamps: true }
);

const Fee = mongoose.model("fee", feeSchema);

module.exports = Fee;
