const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Class = require("../models/classModel");
const Student = require("../models/studentModel");
const Pay = require("../models/payModel");

const putPay = asyncHandler(async (req, res) => {
  const { pay_id } = req.params;

  const findPay = await Pay.findById(pay_id);
  if (!findPay) {
    res.status(400);
    throw new Error("Pay not found");
  }

  const update = await Pay.findByIdAndUpdate(pay_id, req.body, {
    new: true,
    upsert: true,
    timestamps: { createdAt: false, updatedAt: true },
  });

  res.status(201).json(update);
});

const getPayByStudentId = asyncHandler(async (req, res) => {
  const { student_id } = req.params;
  const pay = await Pay.find({ student_id: student_id });
  if (!pay) {
    res.status(400);
    throw new Error("pay doesn't exist");
  }
  res.status(200).json(pay);
});

const getAllPay = asyncHandler(async (req, res) => {
  const pay = await Pay.find({});
  res.status(200).json(pay);
});

module.exports = {
  putPay,
  getPayByStudentId,
  getAllPay,
};
