const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  // const userObj = {
  //   firstName: "MS",
  //   lastName: "Dhoni",
  //   emailId: "msdhoni@outlook.com",
  //   password: "dhoni@123",
  // };
  // creating a new Instance of the user model

  const user = new User(req.body);
  try {
    // creating new instance of the User model
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("error create user " + error.message);
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
app.patch("/user", async (req, res) => {
  let email = req.body.emailId;
  let data = req.body;
  res.send("data update successful");
  try {
    let user = await User.findOneAndUpdate({ emailId: email }, data);
    console.log(user);
  } catch (error) {
    res.status(400).send("Something went wrong!");
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
