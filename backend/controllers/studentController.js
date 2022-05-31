const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");
const Class = require("../models/classModel");
const Pay = require("../models/payModel");
const Log = require("../models/logModel");
// POST /api/student
const createStudent = asyncHandler(async (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName && !lastName) {
    res.status(400);
    throw new Error("Include all fields");
  }

  const student = await Student.create({
    firstName,
    lastName,
    booked: 0,
    created: new Date(),
    presence: 0,
    bank: 0,
    paymentStatus: false,
    concluded: false,
  });

  await Pay.create({
    firstName: student.firstName,
    lastName: student.lastName,
    paymentType: false,
    paid: false,
    concluded: false,
    student_id: student._id,
  });

  if (student) {
    res.status(200).json(student);
  }
});

const updateStudent = asyncHandler(async (req, res) => {
  const { student_id } = req.params;

  const {
    logNote,
    firstName,
    lastName,
    created,
    booked,
    presence,
    bank,
    paymentStatus,
    concluded,
  } = req.body;
  const log = await Log.find({});
  if (log.length >= 50) {
    await Log.findByIdAndDelete(log[0]._id);
  }
  console.log(logNote);
  if (logNote) {
    await Log.create({
      logNote: logNote,
      created: new Date(),
    });
  }
  const student = await Student.findById(student_id);
  let studentUpdate = {
    firstName: firstName,
    lastName: lastName,
    created: created,
    booked: booked,
    presence: presence,
    bank: bank,
    paymentStatus: paymentStatus,
    concluded: concluded,
  };
  //   console.log(presenceCheck);
  if (bank !== undefined && presence !== undefined) {
    studentUpdate = {
      firstName: firstName,
      lastName: lastName,
      created: created,
      booked: booked,
      presence: student.presence + presence,
      bank: student.bank + bank,
      paymentStatus: paymentStatus,
      concluded: concluded,
    };
  }
  if (presence !== undefined && bank === undefined) {
    studentUpdate = {
      firstName: firstName,
      lastName: lastName,
      created: created,
      booked: booked,
      presence: student.presence + presence,
      bank: bank,
      paymentStatus: paymentStatus,
      concluded: concluded,
    };
  }
  if (bank !== undefined && presence === undefined) {
    studentUpdate = {
      firstName: firstName,
      lastName: lastName,
      created: created,
      booked: booked,
      presence: presence,
      bank: student.bank + bank,
      paymentStatus: paymentStatus,
      concluded: concluded,
    };
  }

  if (student) {
    const update = await Student.findByIdAndUpdate(
      student_id,
      studentUpdate,

      {
        new: true,
        upsert: true,
        timestamps: { createdAt: false, updatedAt: true },
      }
    );
    res.status(200).json(update);
  }
});

const getStudents = asyncHandler(async (req, res) => {
  const student = await Student.find({}).sort({ _id: -1 });
  const pay = await Pay.find({}).sort();

  res.status(200).json(student);
});

const getStudentById = asyncHandler(async (req, res) => {
  const { student_id } = req.params;
  const student = await Student.findById(student_id);
  if (!student) {
    res.status(400);
    throw new Error("Student doesn't exist");
  }

  res.status(200).json(student);
});

const getStudentQuery = asyncHandler(async (req, res) => {
  console.log(req.body);
  console.log(req.query);
  let firstQuery = req.query.sort_by.split(",")[0];
  let secondQuery = req.query.sort_by.split(",")[1];
  let thirdQuery = req.query.sort_by.split(",")[2];
  //   const fourthQuery = req.query.sort_by.split(",")[3];
  if (secondQuery === "Select" || secondQuery === "Default") {
    secondQuery = "";
  }
  if (firstQuery === "Select") {
    firstQuery = "";
  }
  if (thirdQuery === "Select") {
    thirdQuery = "";
  }
  console.log(firstQuery);
  console.log(secondQuery);
  console.log(thirdQuery);

  let student;

  if (firstQuery && !thirdQuery && !secondQuery) {
    if (!thirdQuery) {
      thirdQuery = "asc";
    }
    console.log(secondQuery, "in 3");
    student = await Student.find({}).sort({
      [firstQuery]: thirdQuery,
    });
  }
  if (!firstQuery && !thirdQuery && secondQuery) {
    console.log(secondQuery, "in 4");
    student = await Student.find({ concluded: secondQuery });
  }
  if (!firstQuery && !thirdQuery && !secondQuery) {
    console.log(secondQuery, "in 5");
    student = await Student.find({});
  }
  if (!thirdQuery) {
    thirdQuery = "asc";
  }
  if (firstQuery && secondQuery && thirdQuery) {
    console.log(secondQuery, "in 1");
    student = await Student.find({ concluded: secondQuery }).sort({
      [firstQuery]: thirdQuery,
    });
  }
  if (!firstQuery && !secondQuery && thirdQuery) {
    console.log(secondQuery, "in 1");
    student = await Student.find();
  }
  if (!firstQuery && secondQuery && thirdQuery) {
    console.log(secondQuery, "in 1");
    student = await Student.find({ concluded: secondQuery });
  }
  if (firstQuery && thirdQuery && !secondQuery) {
    console.log(secondQuery, "in 2");
    student = await Student.find({}).sort({
      [firstQuery]: thirdQuery,
    });
  }

  res.status(200).json(student);
});

const deleteStudent = asyncHandler(async (req, res) => {
  const { student_id } = req.params;
  const { logNote } = req.body;
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
  await Class.deleteMany({ student_id: student_id });
  await Student.findByIdAndDelete(student_id);
  res.status(204).json({ msg: "Deleted" });
});
module.exports = {
  createStudent,
  getStudents,
  updateStudent,
  getStudentById,
  getStudentQuery,
  deleteStudent,
};
