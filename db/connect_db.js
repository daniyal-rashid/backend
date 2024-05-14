const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("database connecteed successfully");
    })
    .catch(() => {
      console.log("database Error");
    });
};

module.exports = connectDB;
