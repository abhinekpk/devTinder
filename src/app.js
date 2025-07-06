const express = require("express") ;

const { adminAuth , userAuth } =require("./middlewares/auth.js") ;

const app = express() ;

app.use("/admin",adminAuth) ;

app.get("/admin",(req,res,next)=>{
    res.send("User data Sent") ;
});

app.listen(3000 , ()=>{
    console.log("server running on port 3000 of Abhinek") ;
}) ;