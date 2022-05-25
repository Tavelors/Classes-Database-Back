const express = require("express");
require("colors");
const cors = require("cors");
require("dotenv").config();
const { connect } = require("mongoose");
const connectDB = require("./db/db");
const port = process.env.PORT || 6000;
const path = require("path");

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/class", require("./routes/classRoutes"));
app.use("/api/pay", require("./routes/payRoutes"));
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
