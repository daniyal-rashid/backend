const Notice = require("../models/noticeSchema");

const handleCreateNotice = async (req, res) => {
  const { title, details, date } = req.body;
  try {
    const notice = await Notice.create({
      title: title,
      details: details,
      date: date,
    });
    res.status(201).json({ msg: "success", notice: notice });
  } catch (error) {
    res.status(500).json(error);
  }
};

const handleUpdateNotice = async (req, res) => {
  res.send("update notice route");
};

const handleDeleteNotice = async (req, res) => {
  res.send("delete notice route");
};

const getAllNotice = async (req, res) => {
  try {
    const notices = await Notice.find({});
    res.status(200).json(notices);
  } catch (error) {
    return res.json({ status: "failed", msg: "Invalid Token" });
  }
};
const getNotice = async (req, res) => {
  try {
    const notice = await Notice.findById({ _id: req.params.id });
    res.status(200).json(notice);
  } catch (error) {
    res.json({ msg: "not found" });
  }
};

module.exports = {
  handleCreateNotice,
  handleUpdateNotice,
  handleDeleteNotice,
  getAllNotice,
  getNotice,
};
