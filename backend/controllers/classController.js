const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Class = require("../models/classModel");
const Student = require("../models/studentModel");
const Pay = require("../models/payModel");
const Log = require("../models/logModel");
const createClass = asyncHandler(async (req, res) => {
  const { student_id } = req.params;
  const { rescheduledPresence } = req.body;
  const student = await Student.findById(student_id);
  const { logNote } = req.body;
  if (!student) {
    res.status(400);
    throw new Error(`Student not found`);
  }
  console.log(logNote);
  const log = await Log.find({});
  if (log.length >= 50) {
    await Log.findByIdAndDelete(log[0]._id);
  }
  if (logNote) {
    console.log("hi");
    await Log.create({
      logNote: logNote,
      created: new Date(),
    });
  }
  const findClassLength = await Class.find({ student_id: student.id });
  let classNum = 1;
  console.log(findClassLength);
  if (findClassLength.length !== 0) {
    classNum = findClassLength[findClassLength.length - 1].classNumber + 1;
  }
  let lesson;

  if (rescheduledPresence) {
    lesson = await Class.create({
      firstName: student.firstName,
      lastName: student.lastName,
      student_id: student_id,
      created: new Date(),
      presence: false,
      absence: false,
      rescheduled: false,
      colorChange: false,
      lockButton: false,
      rescheduledPresence: rescheduledPresence,
      classNumber: classNum,
      description: "",
    });
  } else {
    lesson = await Class.create({
      firstName: student.firstName,
      lastName: student.lastName,
      student_id: student_id,
      created: new Date(),
      presence: false,
      absence: false,
      rescheduled: false,
      colorChange: false,
      lockButton: false,
      rescheduledPresence: false,
      classNumber: classNum,
      description: "",
    });
  }

  // const pay = await Pay.create({
  //   firstName: lesson.firstName,
  //   lastName: lesson.lastName,
  //   upFront: false,
  //   afterMonth: false,
  //   paid: false,
  //   concluded: false,
  //   student_id: student_id,
  //   class_id: lesson._id,
  // });

  if (student) {
    res.status(200).json({ class: lesson });
  }
});

const createTenClass = asyncHandler(async (req, res) => {
  const { student_id } = req.params;
  const { logNote } = req.body;
  const student = await Student.findById(student_id);
  if (!student) {
    res.status(400);
    throw new Error(`Student not found`);
  }
  console.log(logNote);
  const log = await Log.find({});
  if (log.length >= 50) {
    await Log.findByIdAndDelete(log[0]._id);
  }
  if (logNote) {
    console.log("hi");
    await Log.create({
      logNote: logNote,
      created: new Date(),
    });
  }
  const findClassLength = await Class.find({ student_id: student.id });
  let classNum = 1;
  if (findClassLength.length !== 0) {
    classNum = findClassLength[findClassLength.length - 1].classNumber + 1;
  }
  const classOne = await Class.create({
    firstName: student.firstName,
    lastName: student.lastName,
    student_id: student_id,
    created: new Date(),
    presence: false,
    absence: false,
    rescheduled: false,
    colorChange: false,
    lockButton: false,
    rescheduledPresence: false,
    classNumber: classNum,
    description: "",
  });
  const classTwo = await Class.create({
    firstName: student.firstName,
    lastName: student.lastName,
    student_id: student_id,
    created: new Date(),
    presence: false,
    absence: false,
    rescheduled: false,
    colorChange: false,
    lockButton: false,
    rescheduledPresence: false,
    classNumber: classNum + 1,
    description: "",
  });
  const classThree = await Class.create({
    firstName: student.firstName,
    lastName: student.lastName,
    student_id: student_id,
    created: new Date(),
    presence: false,
    absence: false,
    rescheduled: false,
    colorChange: false,
    lockButton: false,
    rescheduledPresence: false,
    classNumber: classNum + 2,
    description: "",
  });
  const classFour = await Class.create({
    firstName: student.firstName,
    lastName: student.lastName,
    student_id: student_id,
    created: new Date(),
    presence: false,
    absence: false,
    rescheduled: false,
    colorChange: false,
    lockButton: false,
    rescheduledPresence: false,
    classNumber: classNum + 3,
    description: "",
  });
  const classFive = await Class.create({
    firstName: student.firstName,
    lastName: student.lastName,
    student_id: student_id,
    created: new Date(),
    presence: false,
    absence: false,
    rescheduled: false,
    colorChange: false,
    lockButton: false,
    rescheduledPresence: false,
    classNumber: classNum + 4,
    description: "",
  });
  const classSix = await Class.create({
    firstName: student.firstName,
    lastName: student.lastName,
    student_id: student_id,
    created: new Date(),
    presence: false,
    absence: false,
    rescheduled: false,
    colorChange: false,
    lockButton: false,
    rescheduledPresence: false,
    classNumber: classNum + 5,
    description: "",
  });
  const classSeven = await Class.create({
    firstName: student.firstName,
    lastName: student.lastName,
    student_id: student_id,
    created: new Date(),
    presence: false,
    absence: false,
    rescheduled: false,
    colorChange: false,
    lockButton: false,
    rescheduledPresence: false,
    classNumber: classNum + 6,
    description: "",
  });
  const classEight = await Class.create({
    firstName: student.firstName,
    lastName: student.lastName,
    student_id: student_id,
    created: new Date(),
    presence: false,
    absence: false,
    rescheduled: false,
    colorChange: false,
    lockButton: false,
    rescheduledPresence: false,
    classNumber: classNum + 7,
    description: "",
  });
  const classNine = await Class.create({
    firstName: student.firstName,
    lastName: student.lastName,
    student_id: student_id,
    created: new Date(),
    presence: false,
    absence: false,
    rescheduled: false,
    colorChange: false,
    lockButton: false,
    rescheduledPresence: false,
    classNumber: classNum + 8,
    description: "",
  });
  const classTen = await Class.create({
    firstName: student.firstName,
    lastName: student.lastName,
    student_id: student_id,
    created: new Date(),
    presence: false,
    absence: false,
    rescheduled: false,
    colorChange: false,
    lockButton: false,
    rescheduledPresence: false,
    classNumber: classNum + 9,
    description: "",
  });
  res.status(200).json({
    classOne: classOne,
    classTwo: classTwo,
    classThree: classThree,
    classFour: classFour,
    classFive: classFive,
    classSix: classSix,
    classSeven: classSeven,
    classEight: classEight,
    classNine: classNine,
    classTen: classTen,
  });
});

const updateClass = asyncHandler(async (req, res) => {
  const { class_id } = req.params;
  const { logNote } = req.body;
  const log = await Log.find({});
  console.log(logNote);
  if (log.length >= 50) {
    await Log.findByIdAndDelete(log[0]._id);
  }
  if (logNote) {
    await Log.create({
      logNote: logNote,
      created: new Date(),
    });
  }
  const lesson = await Class.findById(class_id);
  if (lesson) {
    const update = await Class.findByIdAndUpdate(class_id, req.body, {
      new: true,
      upsert: true,
      timestamps: { createdAt: false, updatedAt: true },
    });
    console.log(update);
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
  const lesson = await Class.find({ student_id: student_id }).sort({ _id: -1 });
  if (!lesson) {
    res.status(400);
    throw new Error("Lesson doesn't exist");
  }

  res.status(200).json(lesson);
});

const deleteClass = asyncHandler(async (req, res) => {
  console.log(req.body, "bod");
  const { class_id } = req.params;
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
  const lesson = await Class.findById(class_id);

  if (!lesson) {
    res.status(400);
    throw new Error("Class doesn't exist");
  } else {
    const student = await Student.findById(lesson.student_id);
    if (lesson.absence) {
      await Student.findByIdAndUpdate(lesson.student_id, {
        bank: student.bank - 1,
      });
    }
    if (lesson.presence) {
      await Student.findByIdAndUpdate(lesson.student_id, {
        presence: student.presence - 1,
      });
    }
    if (lesson.rescheduledPresence) {
      await Student.findByIdAndUpdate(lesson.student_id, {
        presence: student.presence - 1,
        bank: student.bank + 1,
      });
    }

    await Class.findByIdAndDelete(class_id);
    res.status(204).json({ Msg: "Deleted" });
  }
});

const getRecent = asyncHandler(async (req, res) => {
  const lesson = await Class.find({
    absence: false,
    presence: false,
    rescheduled: false,
  }).sort({ classDate: "asc" });
  res.status(200).json(lesson);
});

module.exports = {
  createClass,
  updateClass,
  getClassById,
  getClass,
  getStudentClass,
  deleteClass,
  getRecent,
  createTenClass,
};
