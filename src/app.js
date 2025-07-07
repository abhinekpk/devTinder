const express = require("express") ;

const { adminAuth , userAuth } =require("./middlewares/auth.js") ;

const app = express() ;

const {connectDB}=require("./config/database.js") ;

const {userModel}=require("./models/user.js") ;

app.use( express.json() ) ;

app.post("/signup" , async (req , res ,next) =>{
    const user = new userModel (req.body) ;
    try{
        await user.save() ;
        res.send("SignUp Succesfull !!") ;
    }
    catch(err){
        res.status(404).send("Error because of : " + err) ;
    }
} );

app.patch("/user" , async (req,res,next) =>{
    try{
        await userModel.findByIdAndUpdate(req.body.userId,req.body) ;
        res.send("User data succesfully updated" ) ;
    }
    catch{
        res.status(400).send("Something went wrong") ;  
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
    
    try{
        const user = await userModel.findByIdAndDelete(req.body.userId) ;
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

