const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth.js");
const { validateEditProfile } = require("../utlis/validattion.js");

profileRouter.get("/profile", userAuth, async (req, res, next) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res, next) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("Invalid Edit reques");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save() ;
    res.json({
        message : `${loggedInUser.firstName} has updated the profile succefully !!` ,
        data : loggedInUser ,
    }) ;

  } catch (err){
    res.status(400).send("Error: " + err);
  }
});

module.exports = {
  profileRouter,
};
