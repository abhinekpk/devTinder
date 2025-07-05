const express = require("express") ;

const app = express() ;

app.use("/test" , (req,res)=>{
    res.send("Hello from the Abhinek") ;
}) ;

app.listen(3000 , ()=>{
    console.log("server running on port 3000 of Abhinek") ;
}) ;