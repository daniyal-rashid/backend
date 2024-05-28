const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
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
  },
  { timestamps: true }
);

const Notice = mongoose.model("notice", noticeSchema);

module.exports = Notice;
