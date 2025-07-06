const adminAuth= (req,res,next) =>{
    console.log("admin auth  is getting checked") ;
    const token = "xyzab" ;
    const isAuthorised = token==="xyz" ;
    if(!isAuthorised){
        res.status(404).send("Admin is not Authorised") ;
    } 
    else{
        next() ;
    }
}

const userAuth= (req,res,next) =>{
    console.log("User auth  is getting checked") ;
    const token = "xyz" ;
    const isAuthorised = token==="xyz" ;
    if(!isAuthorised){
        res.status(404).send("User is not Authorised") ;
    } 
    else{
        next() ;
    }
}

module.exports = {
    adminAuth ,
    userAuth 
} ;

