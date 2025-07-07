const mongoose = require("mongoose") ;

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
    } ,
    password : {
        type : String ,
        required : true ,
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

const userModel = mongoose.model("User" , userSchema) ;

module.exports= {
    userModel ,
} ;