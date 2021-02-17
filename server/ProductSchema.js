const mongoose = require('mongoose')

const ProductSchema=new mongoose.Schema({

    Barcode:String,
    ProductName:String,
    Quantity:Number,
    ReorderQuantity:Number,
    Price:Number
})
const Pro= mongoose.model("product",ProductSchema);

module.exports=Pro;     