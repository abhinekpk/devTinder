const express = require("express");
const app = express();

const { connectDB } = require("./config/database.js");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./routes/auth.js");
const { profileRouter } = require("./routes/profile.js");
const { requestRouter } = require("./routes/request.js");
const { userRouter } = require("./routes/user.js");

app.use(express.json(), cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established ... ");
    app.listen(3000, () => {
      console.log("server running on port 3000 of Abhinek");
    });
  })
  .catch((err) => {
    console.error("Database connection can't be established ... ");
  });

//     const data = req.body ;
//     const userId = req.params?.userId ;
//     try{

//         const ALLOWED_UPDATES =["gender", "age" , "photoURL" , "about" ,"skills" ] ;

//         const isALLOWED = Object.keys(data).every( (k) =>{
//             return ALLOWED_UPDATES.includes(k)
//         } ) ;

//         if(!isALLOWED){
//             throw new Error("Upate not allowed") ;
//         }

//         if(data?.skills.length >10){
//             throw new Error("user cannot add more than 10 skills") ;
//         }

//         await userModel.findByIdAndUpdate(userId,data, {
//             runValidators  : true ,
//         }) ;
//         res.send("User data succesfully updated" ) ;
//     }
//     catch(err){
//         res.status(400).send("Something went wrong: " + err.message) ;
//     }
// }) ;

// app.get("/profile", userAuth, async (req,res,next) => {
//     try{
//         const user = req.body ;

//         res.send(user) ;
//     }
//     catch(err){
//         res.status(400).send("Error: "+err) ;
//     }
// }) ;

// app.get("/user" , async (req , res ,next) =>{

//     try{
//         const user = await userModel.findOne({emailId : req.body.emailId }) ;
//         if(!user){
//             res.status(404).send("User not found") ;
//         }
//         else{
//             console.log("User Succefully found") ;
//             res.send(user) ;
//         }
//     }
//     catch(err){
//         res.status(400).send("Something went wrong") ;
//     }

// } );

// app.get("/feed" , async (req , res ,next) =>{

//     try{
//         const user = await userModel.find({}) ;
//         if(!user){
//             res.status(404).send("User not found") ;
//         }
//         else{
//             console.log("User Succefully found") ;
//             res.send(user) ;
//         }
//     }
//     catch(err){
//         res.status(400).send("Something went wrong") ;
//     }

// } );

// app.delete("/user" , async (req , res ,next) =>{
//     const userId = req.body.userId ;
//     try{
//         const user = await userModel.findByIdAndDelete(userId) ;
//         res.send("User deleted succefully") ;
//     }
//     catch(err){
//         res.status(400).send("Something went wrong") ;
//     }

// } );
