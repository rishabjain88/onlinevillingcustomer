const mongoose = require('mongoose')
const productsSchema = new mongoose.Schema({
    Barcode:String,
    ProductName:String,
    Quantity:Number,
    TotalPrice:Number 
  });
const SalesSchema=new mongoose.Schema({
CustomerName:String,
MobileNumber:String,
Date:String,
TotalPayment:Number,
Products:[ productsSchema ]
    
});
const Pro= mongoose.model("Sales",SalesSchema);

module.exports=Pro;     