
const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    
    Name:String,
    Dateofbirth:String,
    MobileNumber:String,
    Password:String

});

 const user= mongoose.model("Customer",userschema);
 module.exports=user;