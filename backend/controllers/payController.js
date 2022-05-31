const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Class = require("../models/classModel");
const Student = require("../models/studentModel");
const Pay = require("../models/payModel");
const Log = require("../models/logModel");

const putPay = asyncHandler(async (req, res) => {
  const { pay_id } = req.params;
  const { paid, logNote } = req.body;

  const log = await Log.find({});
  if (log.length >= 50) {
    await Log.findByIdAndDelete(log[0]._id);
  }
  if (logNote) {
    await Log.create({
      logNote: logNote,
      created: new Date(),
    });
  }
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
  const payments = await Pay.find({ student_id: findPay.student_id });
  let falseCounter = 0;
  for (let i = 0; i < payments.length; i++) {
    if (!payments[i].paid) {
      falseCounter++;
    }
  }
  let paidBool = false;
  if (falseCounter === 0) {
    paidBool = true;
  }
  await Student.findByIdAndUpdate(
    findPay.student_id,
    {
      paymentStatus: paidBool,
    },
    {
      new: true,
      upsert: true,
      timestamps: { createdAt: false, updatedAt: true },
    }
  );

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

const getPayByClassId = asyncHandler(async (req, res) => {
  const { class_id } = req.params;
  const pay = await Pay.find({ class_id: class_id });
  if (!pay) {
    res.status(400);
    throw new Error("No Payment");
  }
  res.status(200).json(pay);
});

const postPayment = asyncHandler(async (req, res) => {
  const { student_id } = req.params;
  const student = await Student.findById(student_id);
  const pay = await Pay.create({
    firstName: student.firstName,
    lastName: student.lastName,
    paymentType: false,
    paid: false,
    concluded: false,
    student_id: student_id,
    created: new Date(),
  });
  await Student.findByIdAndUpdate(
    student_id,
    {
      paymentStatus: false,
    },
    {
      new: true,
      upsert: true,
      timestamps: { createdAt: false, updatedAt: true },
    }
  );

  res.status(201).json(pay);
});

module.exports = {
  putPay,
  getPayByStudentId,
  getAllPay,
  getPayByClassId,
  postPayment,
};
