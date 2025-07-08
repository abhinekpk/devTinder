const jwt = require("jsonwebtoken") ;
const { userModel } = require("../models/user.js") ;


const userAuth = async (req,res,next)=>{
   try{
        const cookies= req.cookies ;
        const { token } =cookies ;
        if(!token){
            throw new Error("Invalid token") ;
        }

        const decodedMessage = await jwt.verify(token , "Some@kindofsecret@123") ;
        const { _id } =decodedMessage ;
        
        const user = await userModel.findById(_id);
        if(!user){
            throw new Error("User login again") ;
        }

        req.body= user ;
        next() ;
    }
    catch(err){ 
        res.status(400).send("Error: "+err) ;
    } 
} ;

module.exports={
    userAuth ,
}
