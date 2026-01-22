const express = require("express");
const app = express();
app.get("admin/getAllData", (req, res) => {
  res.send("All data sent");
});
app.get("admin/deleteUser", (req, res) => {
  res.send("Deleted the user");
});
app.listen(5000, () => {
  console.log("Server is running on the port 5000");
});
