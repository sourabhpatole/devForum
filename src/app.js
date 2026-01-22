const express = require("express");
const app = express();

// this will only handle get call from user
app.get("/user", (req, res) => {
  res.send({ firstName: "Sourabh", lastName: "Patole" });
});
app.post("/user", (req, res) => {
  console.log("Save data to the database");
  res.send("Data successfully saved to the document");
});
app.listen(5000, () => {
  console.log("Server is running on the port 5000");
});
