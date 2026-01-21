const express = require("express");
const app = express();

app.use((redq, res) => {
  res.send("Hello from the Node js server!!");
});

app.listen(5000, () => {
  console.log("Server is running on the port 5000");
});
