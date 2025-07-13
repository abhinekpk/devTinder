const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth.js");
const { ConnectionRequest } = require("../models/connectionRequest.js");
const { User } = require("../models/user.js");
const USER_SAFE_DATA = "firstName lastName photoURL gender age about skills";

userRouter.get("/user/request/received", userAuth, async (req, res, next) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => row.fromUserId);
    res.json({
      message: "data feteched succesfully",
      data: data,
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

userRouter.get("/user/connection", userAuth, async (req, res, next) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({
      message: `${loggedInUser.firstName} connection list`,
      data: data,
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res, next) => {
  try {
    const loggedInUser =req.user ;
    const page = parseInt(req.query.page) || 1 ;
    let limit = parseInt(req.query.limit) || 4 ;
    limit= limit>4 ? 4 : limit ;
    const skip = (page-1)*limit ;

    const connectionRequest = await ConnectionRequest.find({
        $or : [
            {fromUserId : loggedInUser._id } ,
            {toUserId : loggedInUser._id }
        ]
    }).select("fromUserId toUserId") ;

    const hideUserfeed = new Set() ;
    connectionRequest.forEach((val) => {
        hideUserfeed.add(val.fromUserId) ;
        hideUserfeed.add(val.toUserId) ;
    });
    
    const user =await User.find({
        _id : { $nin : Array.from(hideUserfeed) } 
    }).select(USER_SAFE_DATA)
    .skip(skip)
    .limit(limit) ;

    console.log(user.toString()) ;
    res.json({
        message : `This is ${loggedInUser.firstName} feed` ,
        data : user
    }) ;

  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = {
  userRouter,
};
