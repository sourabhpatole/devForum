const express = require("express");

const requestRouter = express.Router();

const { userAuth } = require("../middleware/auth");
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  // sending a connection request

  const user = req.user;
  console.log("sending connection request");
  res.send(user.firstName + " send the connection requrest");
});
module.exports = requestRouter;
