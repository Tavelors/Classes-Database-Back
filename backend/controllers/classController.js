const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Class = require("../models/classModel");
const Student = require("../models/studentModel");
const Pay = require("../models/payModel");
const createClass = asyncHandler(async (req, res) => {
  const { student_id } = req.params;
  const { rescheduledPresence } = req.body;
  const student = await Student.findById(student_id);

  if (!student) {
    res.status(400);
    throw new Error(`Student not found`);
  }

  let lesson;

  if (rescheduledPresence) {
    lesson = await Class.create({
      firstName: student.firstName,
      lastName: student.lastName,
      student_id: student_id,
      created: new Date(),
      booked: student.booked++,
      presence: false,
      absence: false,
      rescheduled: false,
      rescheduledPresence: rescheduledPresence,
    });
  } else {
    lesson = await Class.create({
      firstName: student.firstName,
      lastName: student.lastName,
      student_id: student_id,
      created: new Date(),
      booked: student.booked++,
      presence: false,
      absence: false,
      rescheduled: false,
      rescheduledPresence: false,
    });
  }

  const pay = await Pay.create({
    firstName: lesson.firstName,
    lastName: lesson.lastName,
    upFront: false,
    afterMonth: false,
    paid: false,
    concluded: false,
    student_id: student_id,
    class_id: lesson._id,
  });
  console.log(lesson);
  if (student) {
    res.status(200).json({ class: lesson });
  }
});

const updateClass = asyncHandler(async (req, res) => {
  const { class_id } = req.params;
  const lesson = await Class.findById(class_id);
  if (lesson) {
    const update = await Class.findByIdAndUpdate(class_id, req.body, {
      new: true,
      upsert: true,
      timestamps: { createdAt: false, updatedAt: true },
    });
    res.status(200).json(update);
  }
});

const getClassById = asyncHandler(async (req, res) => {
  const { class_id } = req.params;
  const lesson = await Class.findById(class_id);
  if (!lesson) {
    res.status(400);
    throw new Error("Class doesn't exist");
  } else {
    res.status(200).json(lesson);
  }
});

const getClass = asyncHandler(async (req, res) => {
  const lesson = await Class.find({});
  if (!lesson) {
    res.status(400);
    throw new Error("Class doesn't exist");
  } else {
    res.status(200).json(lesson);
  }
});
//
const getStudentClass = asyncHandler(async (req, res) => {
  const { student_id } = req.params;
  const lesson = await Class.find({ student_id: student_id });
  if (!lesson) {
    console.log("inside");
    res.status(400);
    throw new Error("Lesson doesn't exist");
  }

  console.log("here");
  //   console.log(lesson);
  res.status(200).json(lesson);
});

const deleteClass = asyncHandler(async (req, res) => {
  const { class_id } = req.params;
  const lesson = await Class.findById(class_id);
  if (!lesson) {
    res.status(400);
    throw new Error("Class doesn't exist");
  }
  const findPay = await Pay.find({ class_id: class_id });
  //   console.log(findPay._id.ObjectId().valueOf());
  await Pay.deleteOne({ findPay });
  await Class.findByIdAndDelete(class_id);
  res.status(204).json({ Msg: "Deleted" });
});

module.exports = {
  createClass,
  updateClass,
  getClassById,
  getClass,
  getStudentClass,
  deleteClass,
};
