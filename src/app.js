const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Sourabh",
    lastName: "Patole",
    emailId: "sourabhpatole@outlook.com",
    password: "sourabh@123",
  };
  // creating a new Instance of the user model

  try {
    const user = new User(userObj);
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("error create user " + error.message);
  }
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
