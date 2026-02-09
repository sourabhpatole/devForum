const express = require("express");
const { validateSignUpData } = require("../utils/validation");

const User = require("../models/user");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      // console.log(token);

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

module.exports = authRouter;
