const express = require("express");
const app = express();

app.use("/", (red, res) => {
  res.send("Hello from the Node js server!!");
});
app.use("/hello", (req, res) => {
  res.send("Hello Hello , Hello!");
});
app.use("/test", (req, res) => {
  res.send("Hello from the server");
});
app.listen(5000, () => {
  console.log("Server is running on the port 5000");
});
