const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const validate = require("validator");
const jwt = require("jsonwebtoken");
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
      const token = await jwt.sign({ _id: user._id }, "DEV@Forum");
      console.log(token);

      res.cookie("token", token);
      res.send("Login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});
app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid token");
    }
    // validate token

    const decodedValue = await jwt.verify(token, "DEV@Forum");

    console.log(decodedValue);
    const { _id } = decodedValue;
    console.log("the logged in user is " + _id);
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User does not exist");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
// get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length == 0) {
      res.send(400).send("User not found");
      return;
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});
// Feed API - GET /feed and POST - get all the user from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});
// delete user
app.delete("/user", async (req, res) => {
  let userId = req.body.userId;
  try {
    let user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(401).send("User not found");
      return;
    } else {
      res.status(200).send("User successfully deleted");
    }
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
});
// update data of the user
// app.patch("/user", async (req, res) => {
//   let userId = req.body.userId;
//   let data = req.body;
//   console.log(JSON.stringify(data));

//   try {
//     const user = await User.findByIdAndUpdate(userId, data);
//     console.log(user);

//     res.status(200).send("User update successfully");
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });
app.patch("/user/:userId", async (req, res) => {
  let userId = req.params?.userId;
  let data = req.body;
  try {
    const ALLOWED_UPDATES = [
      // "firstName",
      // "lastName",
      "password",
      "age",
      "gender",
      "photoUrl",
      "about",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(data).every((update) => {
      return ALLOWED_UPDATES.includes(update);
    });

    if (!isUpdateAllowed) {
      return res.status(400).send("Invalid updates!");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills not be more than 10");
    }
    let user = await User.findByIdAndUpdate(userId, data, {
      // to check each call validator will run
      returnDocument: "after",
      runValidators: true,
    });
    res.send("data update successful");

    console.log(user);
  } catch (error) {
    res.status(400).send("Update Failed " + error.message);
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
