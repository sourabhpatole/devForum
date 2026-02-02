const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const validate = require("validator");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { validateSignUpData } = require("./utils/validation");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.post("/signup", async (req, res) => {
  try {
    // validation data
    validateSignUpData(req);
    // encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    // console.log(req.body);
    // const userObj = {
    //   firstName: "MS",
    //   lastName: "Dhoni",
    //   emailId: "msdhoni@outlook.com",
    //   password: "dhoni@123",
    // };
    // creating a new Instance of the user model

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    // creating new instance of the User model
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("ERR : " + error.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "DEV@Forum", {
        expiresIn: "1d",
      });
      console.log(token);

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
// get user by email
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  // sending a connection request

  const user = req.user;
  console.log("sending connection request");
  res.send(user.firstName + " send the connection requrest");
});
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
