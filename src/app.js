const express = require("express") ;

const app = express() ;

app.get("/user" , 
    (req,res,next)=>{
        console.log("handling 1st route") ;
        //res.send("!!Respose") ;
        next() ;
    },
    (req,res,next)=>{
        console.log("handling 2nd route") ;
        //res.send("2nd !!Respose") ;
        next() ;
    },
    (req,res,next)=>{
        console.log("handling 3rd route") ;
        //res.send("3rd !!Respose") ;
        next() ;
    },
    (req,res,next)=>{
        console.log("handling 4th route") ;
        res.send("4th !!Respose") ;
    },
) ;

app.post("/user" , (req,res)=>{
    res.send("Data succesfully saved") ;
}) ;


app.listen(3000 , ()=>{
    console.log("server running on port 3000 of Abhinek") ;
}) ;