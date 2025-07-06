const mongoose = require("mongoose") ;

const connectDB = async ()=> {
    await mongoose.connect("mongodb+srv://abhinekabhinek:BzwmHzyjg93rI9Sg@abhinek.8rxbo3p.mongodb.net/devTinder") ;
} ;

module.exports = {
    connectDB ,
}

