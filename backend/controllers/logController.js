const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Class = require("../models/classModel");
const Student = require("../models/studentModel");
const Pay = require("../models/payModel");
const Log = require("../models/logModel");

const getLog = asyncHandler(async (req, res) => {
  const log = await Log.find({}).sort({ _id: -1 });

  if (!log) {
    res.status(400);
    throw new Error("Class doesn't exist");
  } else {
    res.status(200).json(log);
  }
});

const postLog = asyncHandler(async (req, res) => {
  const { logNote } = req.body;
  if (!logNote) {
    res.status(400);
    throw new Error("No Note");
  }
  const log = await Log.create({
    logNote: logNote,
    created: new Date(),
  });
  res.status(201).json(log);
});

module.exports = {
  getLog,
  postLog,
};
