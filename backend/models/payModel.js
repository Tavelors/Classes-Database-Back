const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paySchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    paymentType: {
      type: Boolean,
    },

    paid: {
      type: Boolean,
    },
    concluded: {
      type: Boolean,
    },
    student_id: {
      type: Schema.Types.ObjectId,
    },
    created: {
      type: Date,
    },
    dateChange: {
      type: Date,
    },
    // class_id: {
    //   type: Schema.Types.ObjectId,
    // },
    // user_id: {
    //   type: Schema.Types.ObjectId,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pay", paySchema);
