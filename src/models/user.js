const mongoose = require("mongoose") ;
const validator =require("validator") ;
const jwt = require("jsonwebtoken") ;
const bcrypt= require("bcrypt") ;

const userSchema = mongoose.Schema({
    firstName : {
        type : String ,
        required : true ,
        minLength : 3 ,
        maxLength : 50 ,
    } ,
    lastName : {
        type : String ,
    } ,
    emailId : {
        type : String ,
        required : true ,
        unique : true ,
        lowercase : true ,
        trim : true ,
        validate(val) {
            if(!validator.isEmail(val)){
                throw new Error("User email address is not valid") ;
            }
        }
    } ,
    password : {
        type : String ,
        required : true ,
        validate(val) {
            if(!validator.isStrongPassword(val)){
                throw new Error("User Password is not strong") ;
            }
        }
    } ,
    gender : {
        type : String ,
    } ,
    age : {
        type : Number ,
        min : 18 ,
    } ,
    photoURL : {
        type : String ,
        default : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" ,
        validate(val) {
            if(!validator.isURL(val)){
                throw new Error("User photo URL is not valid") ;
            }
        }
    } ,
    about : {
        type : String ,
        default : "This is deafult discription for every user" ,
    } ,
    skills : {
        type: [String] ,
    } ,
},
{
    timestamps : true 
}
) ;

userSchema.methods.getJWT = async function () {
    const user =this ;
    const token = await jwt.sign({_id : user._id},"Some@kindofsecret@123" , {
         expiresIn: "7d" 
        }) ;
    return token ;
} ;

userSchema.methods.validatePassword =  async function(passwordInputByUser){
    const passwordHash =this.password ;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser , passwordHash) ;
    return isPasswordValid ;
}

const userModel = mongoose.model("User" , userSchema) ;

module.exports= {
    userModel ,
} ;