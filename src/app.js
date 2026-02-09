const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
// get user by email

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    console.log("database connecion established");
    app.listen(5000, () => {
      console.log("Server is running on the port 5000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });
