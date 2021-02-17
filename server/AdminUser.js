const mongoose = require('mongoose')

const AdminSchema=new mongoose.Schema({

    Name:String,
    Password:String,
    EmployeeId:String,
    Role:String,
})
const Note= mongoose.model("admin",AdminSchema);

module.exports=Note;