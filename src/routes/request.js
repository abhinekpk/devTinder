const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth.js");
const { ConnectionRequest } = require("../models/connectionRequest.js");
const { User } = require("../models/user.js");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status type: " + status);
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("User not found");
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        throw new Error("Connection Request Already exist");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Status not allowed");
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id, // Ensure _id is the same type
        status: "interested",
      });

      if (!connectionRequest) {
        throw new Error("Connection request not found");
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.json({
        message: "Connection request " + status,
        data,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);
module.exports = {
  requestRouter,
};
