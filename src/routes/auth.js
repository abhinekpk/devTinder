const express = require("express") ;
const authRouter = express.Router() ;

const { User }=require("../models/user.js") ;
const { validateSignUpData } = require("../utlis/validattion.js") ;
const bcrypt = require("bcrypt") ;

authRouter.post("/signup" , async (req , res ,next) =>{

    try{
        // Validation of data
        validateSignUpData(req) ;
        const { firstName ,lastName , emailId , password } = req.body ;

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password,10) ;
        // Create the new instance of user body

        const user = new User ({
            firstName ,
            lastName ,
            emailId ,
            password : passwordHash 
        }) ;

        await user.save() ;
        res.send("SignUp Succesfull !!") ;
    }
    catch(err){
        res.status(404).send("Error because of : " + err.message) ;
    }
} );

authRouter.post("/login" , async (req,res,next) =>{
    try{
        const { emailId , password } = req.body ;

        const user = await User.findOne({emailId : emailId}) ;
        if(!user){
            throw new Error("Invalid cridentials") ;
        }
        const isPasswordValid = await user.validatePassword(password) ;
        if(!isPasswordValid){
            throw new Error("Invalid cridentials") ;
        }
        else{
            // Creating JWT token 
            const token = await user.getJWT();
            
            //Add the token to the cookies and send the respose back the server
            res.cookie("token", token ,{
                expires : new Date(Date.now() + 7*24 * 3600000)
            }) ;
            res.send("User login succesfull") ;
        }
    }
    catch(err){
        res.status(400).send("Error: " + err.message) ;
    } 
}) ;

authRouter.post("/logout" , async (req,res,next) => {
    try{
        res.cookie("token","",{
            expires : new Date(Date.now())
        });
        res.send("User logOut Succesfull") ;
    }
    catch(err){
        res.status(400).send("Error: " + err.message) ;
    }
}) ;

module.exports = {
    authRouter ,
}