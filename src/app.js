const express = require("express") ;

const { adminAuth , userAuth } =require("./middlewares/auth.js") ;

const app = express() ;

const {connectDB}=require("./config/database.js") ;

const {userModel}=require("./models/user.js") ;

const { validateSignUpData } = require("./utlis/validattion.js") ;

const bcrypt = require("bcrypt") ;

app.use( express.json() ) ;

app.post("/signup" , async (req , res ,next) =>{

    try{
        // Validation of data
        validateSignUpData(req) ;
        const { firstName ,lastName , emailId , password } = req.body ;

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password,10) ;
        // Create the new instance of user body

        const user = new userModel ({
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

app.post("/login" , async (req,res,next) =>{
    try{
        const { emailId , password } = req.body ;

        const user = await userModel.findOne({emailId : emailId}) ;
        if(!user){
            throw new Error("Invalid cridentials") ;
        }
        const isPasswordValid = await bcrypt.compare(password , user.password) ;
        if(!isPasswordValid){
            throw new Error("Invalid cridentials") ;
        }

        res.send("User login succesfull") ;
    }
    catch(err){
        res.status(400).send("Error: " + err.message) ;
    } 
}) ;

app.patch("/user/:userId" , async (req,res,next) =>{
    
    const data = req.body ;
    const userId = req.params?.userId ;
    try{

        const ALLOWED_UPDATES =["gender", "age" , "photoURL" , "about" ,"skills" ] ;

        const isALLOWED = Object.keys(data).every( (k) =>{
            return ALLOWED_UPDATES.includes(k) 
        } ) ;

        if(!isALLOWED){
            throw new Error("Upate not allowed") ;
        }

        if(data?.skills.length >10){
            throw new Error("user cannot add more than 10 skills") ;
        }

        await userModel.findByIdAndUpdate(userId,data, {
            runValidators  : true ,
        }) ;
        res.send("User data succesfully updated" ) ;
    }
    catch(err){
        res.status(400).send("Something went wrong: " + err.message) ;  
    }
}) ;

app.get("/user" , async (req , res ,next) =>{
    
    try{
        const user = await userModel.findOne({emailId : req.body.emailId }) ;
        if(!user){
            res.status(404).send("User not found") ;
        }
        else{
            console.log("User Succefully found") ;
            res.send(user) ;
        }
    }
    catch(err){
        res.status(400).send("Something went wrong") ;
    }
    
} );

app.get("/feed" , async (req , res ,next) =>{
    
    try{
        const user = await userModel.find({}) ;
        if(!user){
            res.status(404).send("User not found") ;
        }
        else{
            console.log("User Succefully found") ;
            res.send(user) ;
        }
    }
    catch(err){
        res.status(400).send("Something went wrong") ;
    }
    
} );

app.delete("/user" , async (req , res ,next) =>{
    const userId = req.body.userId ;
    try{
        const user = await userModel.findByIdAndDelete(userId) ;
        res.send("User deleted succefully") ;
    }
    catch(err){
        res.status(400).send("Something went wrong") ;
    }
    
} );


connectDB()
.then(() => {
    console.log("Database connection established ... ") ;
    app.listen(3000 , ()=>{
        console.log("server running on port 3000 of Abhinek") ;
    }) ;
})
.catch( err => {
    console.error("Database connection can't be established ... ") ;
})

