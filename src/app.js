const express = require("express") ;

const { adminAuth , userAuth } =require("./middlewares/auth.js") ;

const app = express() ;

app.get("/admin",(req,res,next)=>{
    throw new Error("Some problem") ;
    res.send("User data Sent") ;
});

app.use("/", (err , req, res , next)=>{
    if(err){
        res.status(500).send("Something went wrong") ;
    }
}) ;

app.listen(3000 , ()=>{
    console.log("server running on port 3000 of Abhinek") ;
}) ;