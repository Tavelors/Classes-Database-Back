const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");
const Class = require("../models/classModel");
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
  });
  if (student) {
    res.status(200).json(student);
  }
});

const updateStudent = asyncHandler(async (req, res) => {
  const { student_id } = req.params;
  const {
    firstName,
    lastName,
    created,
    booked,
    presence,
    bank,
    paymentStatus,
  } = req.body;
  const student = await Student.findById(student_id);
  let studentUpdate = {
    firstName: firstName,
    lastName: lastName,
    created: created,
    booked: booked,
    presence: presence,
    bank: bank,
    paymentStatus: paymentStatus,
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
  const student = await Student.find({});
  //   let array = [];
  //   let counter = 0;
  //   for (let i = 0; i < student.length; i++) {
  //     counter = 0;
  //     const lesson = await Class.find({ student_id: student[i]._id });
  //     for (let j = 0; j < lesson.length; j++) {
  //       if (
  //         lesson[j].student_id.equals(student[i]._id) &&
  //         lesson[j].presence === true
  //       )
  //         counter++;

  //       if (j === lesson.length - 1) array.push(counter);
  //     }
  //   }
  //   for (let i = 0; i < student.length; i++) {
  //     student[i].presence = array[i];
  //   }

  //   const doc = await Student.find({});
  //   console.log(doc);
  //   await student.save();
  //   console.log(newStudent);
  //   console.log(student);
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

module.exports = { createStudent, getStudents, updateStudent, getStudentById };
