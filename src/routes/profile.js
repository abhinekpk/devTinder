const express = require("express") ;
const profileRouter = express.Router() ;

const { userAuth } =require("../middlewares/auth.js") ;


profileRouter.get("/profile", userAuth, async (req,res,next) => {
    try{
        const user = req.user ;
        
        res.send(user) ;
    }
    catch(err){
        res.status(400).send("Error: "+err) ;
    }
}) ;

module.exports = {
    profileRouter ,
}