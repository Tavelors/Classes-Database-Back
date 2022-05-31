const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema(
  {
    logNote: {
      type: String,
    },
    created: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Log", logSchema);
