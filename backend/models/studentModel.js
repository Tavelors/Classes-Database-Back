const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
    },
    booked: {
      type: Number,
    },
    presence: {
      type: Number,
    },
    bank: {
      type: Number,
    },
    paymentStatus: {
      type: Boolean,
    },
    concluded: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
