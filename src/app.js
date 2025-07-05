const express = require("express") ;

const app = express() ;

app.get("/user" , (req,res)=>{
    res.send({Name: "Abhinek" , lastNmae : "Pandey"}) ;
}) ;

app.post("/user" , (req,res)=>{
    res.send("Data succesfully saved") ;
}) ;


app.listen(3000 , ()=>{
    console.log("server running on port 3000 of Abhinek") ;
}) ;