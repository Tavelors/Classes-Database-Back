const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    student_id: {
      type: Schema.Types.ObjectId,
    },
    created: {
      type: Date,
    },
    classDate: {
      type: Date,
    },
    AbsenceDate: {
      type: Date,
    },
    presence: {
      type: Boolean,
    },
    absence: {
      type: Boolean,
    },
    rescheduled: {
      type: Boolean,
    },
    rescheduledPresence: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Class", classSchema);
