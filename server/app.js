const express=require('express')
const app= express()
const bodyParser= require ('body-parser')
const mongoose=require('mongoose')
const cors = require("cors")
require('./AdminUser')
require('./user')
require('./ProductSchema')
require('./SalesSchema')
// require('bcryptjs');
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

const AdminUser= mongoose.model("admin")
const AddProduct =mongoose.model("product")
const add =mongoose.model("Customer")
const Sales =mongoose.model("Sales")
const mongoUri="mongodb+srv://rishi:12345@cluster0.00f3y.mongodb.net/OnlineBilling";
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
app.use("/", require("./noteRoute"))
mongoose.connection.on("connected",()=> {
    console.log("connected to mongoose !!!")
})



app.get('/',(req,res)=>{
    add.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    
})
app.get('/product',(req,res)=>{
    AddProduct.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    
})
app.get('/admin',(req,res)=>{
    AdminUser.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    
})
app.post('/product',(req,res)=>{
    AddProduct.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    
})
app.post('/productReorder',(req,res)=>{
   AddProduct.find({})
    .then(data1=>{
        res.send(data1)
    }).catch(err=>{
        console.log(err)
    })
    
})


app.post('/send-data',(req,res)=> {
    console.log(req.body)
    add.findOne({'MobileNumber':req.body.MobileNumber} )
    .then(data=>{
        console.log(data)
        if(data){
    
            res.send({'success':true})

        }
        else{
            res.send({'success':false})
    const Add= new add({
        Name:req.body.Name,
        Dateofbirth:req.body.Dateofbirth,
        MobileNumber:req.body.MobileNumber,
        Password:req.body.Password
    })  
    Add.save()
    .then(data=>{
        console.log(data)
        
    }).catch(err=>{
        console.log(err)
    })
 } 
})



app.post('/send-dataA',(req,res)=> {
    console.log(req.body)

    AdminUser.findOne({'EmployeeId':req.body.EmployeeId})
    .then(data=>{
        console.log(data)
        if(data){
            res.send({'success':true})
        }
        else
        {res.send({'success':false})
    const adminuser= new AdminUser({
        Name:req.body.Name,
        Password:req.body.Password,
        EmployeeId:req.body.EmployeeId,
        Role:req.body.Role
    })
    adminuser.save()
    .then(data=>{
        console.log(data)
        
    }).catch(err=>{
        console.log(err)
    })
    }
})
})

// res.send("posted")
})


app.post('/searchProduct',(req,res)=> {

    
    var Barcode=req.body.Barcode;
    
AddProduct.findOne({'Barcode':Barcode} )
 .then(data=>{
     console.log(data)
     if(data){
         res.send({'success':true,'pname':data.ProductName,'quan':data.Quantity,'price':data.Price,'reorder':data.ReorderQuantity})
     }
     else
     {
         res.send({'success':false ,'message':'Employee not found!'})
     }
     
 }).catch(err=>{
     console.log(err)
 })

})
/////changing name in app.js
app.post('/searchallinadmin',(req,res)=>{
    console.log(req.body)
    //const ProductName=req.body.ProductName;
AddProduct.find({'ProductName':{$regex:req.body.ProductName,$options:"i"},})
   .then(data=>{
    if(data){
        res.send(data);

        
    //res.end();
    }
    else{
                
       res.send({'message':'s'})
    
    }
    })
    .catch(err=>{
        console.log(err)
    })

})

app.post('/UpdateProduct',(req,res)=> {
    console.log(req.body)
    const filter={Barcode:req.body.Barcode};
const update={
    Barcode:req.body.Barcode,
        ProductName:req.body.ProductName,
        Quantity:req.body.Quantity,
        ReorderQuantity:req.body.ReorderQuantity,
        Price:req.body.Price
};
AddProduct.findOne({'Barcode':req.body.Barcode})
.then(data=>{
    console.log(data)
    if(!data){
        res.send({'success':false})
    }
    else
    {res.send({'success':true})
    AddProduct.findOneAndUpdate(filter,update)  

    .then(data=>{
        console.log(data)
        
    }).catch(err=>{
        console.log(err)
    })
}
})
    
})

app.post('/search2',(req,res)=>{
    console.log(req.body)
    //const ProductName=req.body.ProductName;
AddProduct.find({'ProductName':{$regex:req.body.ProductName,$options:"i"},})
   .then(data=>{
    if(data){
        res.send(data);

        
    //res.end();
    }
    else{
                
       res.send({'message':'s'})
    
    }
    })
    .catch(err=>{
        console.log(err)
    })

})
app.post('/login',(req,res)=> {

       var Password=req.body.Password;
       var EmployeeId=req.body.EmployeeId;
       
   AdminUser.findOne({$and: [{'EmployeeId':EmployeeId} , {'Password':Password} ] } )
    .then(data=>{
        console.log(data)
        if(data){
            res.send({'success':true,'user':data.Name,'empid':data.EmployeeId,'role':data.Role})
        }
        else
        {
            res.send({'success':false ,'message':'Employee not found!'})
        }
        
    }).catch(err=>{
        console.log(err)
    })

})

app.post('/savebill',(req,res)=> {
    console.log(req.body)
   
            
    const sales= new Sales({
        CustomerName:req.body.CustomerName,
        MobileNumber:req.body.MobileNumber,
        Date:req.body.Date,
        TotalPayment:req.body.TotalPayment,
        Products:req.body.Products
           
        
    })  
    sales.save()
    .then(data=>{
        console.log(data)
        res.send({'invoice':data._id})
    }).catch(err=>{
        console.log(err)
    })
 
})


app.post('/History',(req,res)=>{
    console.log(req.body)
    //const ProductName=req.body.ProductName;
Sales.find({'MobileNumber':req.body.MobileNumber})
   .then(data=>{
    if(data){
        res.send(data);


    }
    else{
                
       res.send({'message':'You havent did any shopping yet!'})
    
    }
    })
    .catch(err=>{
        console.log(err)
    })

})
app.post('/sign-in',(req,res)=> {
    console.log(req.body)
       var MobileNumber=req.body.MobileNumber;
       var  Password=req.body.Password;

        add.findOne({$and:[{'MobileNumber':MobileNumber},{'Password':Password} ] } )
        .then(data=>{
            console.log(data)
            if(data){
        
                res.send({'success':true,'Name':data.Name,'MobileNumber':data.MobileNumber})

            }
            else{
                
                res.send({'success':false,'message':'Customer not found, Check your login credentials'})
                
    
            }
    
    }).catch(err=>{
        console.log(err)
    })

  
})

app.post('/UpdateStock',(req,res)=>{
    const filter={Barcode:req.body.Barcode};
   
    
    var result=0;
AddProduct.findOne({Barcode:req.body.Barcode})
.then(data=>{
result=data.Quantity-req.body.Quantity;
console.log(result)


 const update={
        Quantity:result, 
    };
    AddProduct.findOneAndUpdate(filter,update)  

    .then(data=>{
        console.log(data)
        
    }).catch(err=>{
        console.log(err)
    })


})
})

app.post('/AddProduct',(req,res)=> {
    console.log(req.body)
    AddProduct.findOne({'Barcode':req.body.Barcode})
    .then(data=>{
        console.log(data)
        if(data){
            res.send({'success':true})
        }
        else
        {res.send({'success':false})
    const addpro= new AddProduct({
        Barcode:req.body.Barcode,
        ProductName:req.body.ProductName,
        Quantity:req.body.Quantity,
        ReorderQuantity:req.body.ReorderQuantity,
        Price:req.body.Price

    })  
    addpro.save()
    .then(data=>{
        console.log(data)
        
    }).catch(err=>{
        console.log(err)
    })
}
})

    
})

/////changing name in app.js//////////////////////////////
app.post('/delete2',(req,res)=> {
AddProduct.findOneAndDelete({'Barcode':req.body.Barcode})
.then(data=>{


    res.send(data)
})
.catch(err=>{
    console.log(err)
})



})

app.post('/delete',(req,res)=> {
AdminUser.findByIdAndRemove(req.body.id)
.then(data=>{

    console.log(data)
    res.send("Deleted")
})
.catch(err=>{
    console.log(err)
})



})
app.post('/search',(req,res)=>{
    console.log(req.body)
    //const ProductName=req.body.ProductName;
AddProduct.find({'ProductName':{$regex:req.body.ProductName,$options:"i"},})
   .then(data=>{
    if(data){
        res.send(data);


    }
    else{
                
       res.send({'message':'s'})
    
    }
    })
    .catch(err=>{
        console.log(err)
    })

})
app.post('/forgotpassword',(req,res)=> {
    console.log(req.body)
   
add.findOne({$and:[{'MobileNumber':req.body.MobileNumber},{'Dateofbirth':req.body.Dateofbirth} ] })
.then(data=>{
    console.log(data)
    if(data==null){
        res.send({'success':false}) 
    }
    else
    {res.send({'success':true })
   
}
})
    
})
app.post('/passUpdate',(req,res)=>{
    const filter={MobileNumber:req.body.MobileNumber};
    const update={
        Password:req.body.Password, 
    };
    add.findOneAndUpdate(filter,update)  

    .then(data=>{
        console.log(data)
        
    }).catch(err=>{
        console.log(err)
    })


})
app.post('/scan',(req,res)=>{
    console.log(req.body)
    const ProductName=req.body.ProductName;
   AddProduct.findOne({'Barcode':req.body.Barcode})
   
   .then(data=>{
    if(data){
    res.send({'success':true,'pname':data.ProductName,'price':data.Price,'quan':data.Quantity})
    }
    else{
                
        res.send({'success':false,'message':'Product not found '})
        

    }
    })
    .catch(err=>{
        console.log(err)
    })

})

app.post('/update',(req,res)=> {
    AdminUser.findByIdAndUpdate(req.body.id,{
        Name:req.body.name,
        Password:req.body.password,
        EmployeeId:req.body.employeeid,
        Role:req.body.role

    })
    .then(data=>{
    
        console.log(data)
        res.send("Updated!")
    })
    .catch(err=>{
        console.log(err)
    })
    })
app.listen(process.env.PORT || 3000);   
// app.listen(3000,()=>{
//     console.log("server running")
// })





