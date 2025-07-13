const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth.js");
const { ConnectionRequest } = require("../models/connectionRequest.js");
const USER_SAFE_DATA = "firstName lastName photoURL gender age about skills" ;

userRouter.get("/user/request/received", userAuth, async (req, res, next) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
        toUserId : loggedInUser._id ,
        status : "interested" ,
    }).populate(
        "fromUserId" ,
        USER_SAFE_DATA
    ) ;

    const data = connectionRequest.map(row => row.fromUserId ) ;
    res.json({
        message : "data feteched succesfully" ,
        data : data ,
    })

  } catch (err) {
    res.status(400).send("Error : " + err.message) ;
  }
});



module.exports= {
    userRouter
}
