const Notice = require("../models/noticeSchema");
const jwt = require("jsonwebtoken");

const handleCreateNotice = async (req, res) => {
  const { title, details, date } = req.body;
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  const { _id } = verify;
  try {
    const notice = await Notice.create({
      title: title,
      details: details,
      date: date,
      school: _id,
    });
    res.status(201).json({ msg: "success", notice: notice });
  } catch (error) {
    res.status(500).json({ msg: "failed", err: error });
  }
};

const handleUpdateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, details: req.body.details, date: req.body.date }
    );
    res.json({ msg: "successfully updated", notice: notice });
  } catch (error) {
    res.json({ status: "failed", err: error });
  }
};

const handleDeleteNotice = async (req, res) => {
  try {
    await Notice.deleteOne({ _id: req.params.id });
    res.json({ msg: "Deleted Successfully" });
  } catch (error) {
    res.json({ msg: "failed", err: error });
  }
};

const getAllNotice = async (req, res) => {
  const { title, details, date } = req.body;
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  const { _id } = verify;
  try {
    const notices = await Notice.find({ school: _id });
    res.status(200).json(notices);
  } catch (error) {
    return res.json({ status: "failed", msg: "Invalid Token" });
  }
};

module.exports = {
  handleCreateNotice,
  handleUpdateNotice,
  handleDeleteNotice,
  getAllNotice,
};
