const express = require("express") ;

const { adminAuth , userAuth } =require("./middlewares/auth.js") ;

const app = express() ;

const {connectDB}=require("./config/database.js") ;

const {userModel}=require("./models/user.js") ;

app.post("/signup" , async (req , res ,next) =>{
    const user = new userModel ({
        firstName : "Abhinek" ,
        lastName : "Pandey" ,
        emailId : "abhinekpk@gmail.com" ,
        password : "abhinek@123"
    })
    try{
        await user.save() ;
        res.send("SignUp Succesfull !!") ;
    }
    catch(err){
        res.status(404).send("Error because of : " + err) ;
    }
} );

connectDB().then(() => {
    console.log("Database connection established ... ") ;
    app.listen(3000 , ()=>{
        console.log("server running on port 3000 of Abhinek") ;
    }) ;
}).catch( err => {
    console.error("Database connection can't be established ... ") ;
})

