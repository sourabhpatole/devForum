const express = require("express");
const app = express();

// app.get("/abc", (req, res) => {
//   res.send({ firstName: "Sourabh", lastName: "Patole" });
// });

app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling the route user 1!!");
    // res.send("Response!!");
    next();
  },
  (req, res) => {
    console.log("Handling the route user 2!!");
    res.send("2nd Response!!");
  },
);

app.listen(5000, () => {
  console.log("Server is running on the port 5000");
});
