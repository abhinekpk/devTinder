const validator = require("validator") ;

const validateSignUpData = (req) =>{
    const { firstName , lastName , emailId , password } = req.body ;

    if(!firstName || !lastName){
        throw new Error("Name is not Valid") ;
    }
    if(!validator.isEmail(emailId)){
        throw new Error("Invalid email address") ;
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password") ;
    }

}

module.exports = {
    validateSignUpData ,
}