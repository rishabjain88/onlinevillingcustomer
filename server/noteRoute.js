const express = require("express");
const router = express.Router();
const Note= require("./AdminUser");

router.route("/create").post((req,res)=>{
    const name= req.body.name;
    const password= req.body.password;
    const employeeid= req.body.employeeid;
    const role= req.body.role;
    const newnote = new Note({
        name,
        password,
        employeeid,
        role
    });
    newnote.save();
})
module.exports= router;