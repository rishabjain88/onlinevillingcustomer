import { StatusBar } from 'expo-status-bar';
import React,{delay,useState} from 'react';
import { AntDesign,MaterialIcons,MaterialCommunityIcons,FontAwesome  ,Ionicons ,Feather } from '@expo/vector-icons'; 
import { StyleSheet,Button,Image, Platform,Text, View ,TextInput,
   TouchableHighlight, 
  TouchableOpacity,
  FlatList,Alert,
  ScrollView} from 'react-native';
import {Component} from 'react';
import NewAdmin from './NewAdmin';
import { useNavigation } from '@react-navigation/native';
import Table from 'react-native-simple-table';
import renderIf from 'render-if';
//import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

var dataSource=[];
var dataSource2=[];
export default function StockDetails() {
  const navigation = useNavigation();
const [flag3, setflag3] = useState(false)
const [flag2, setflag2] = useState(false)
const [flag, setflag] = useState(false)
const [toggle, setToggle] = useState(false)
const [toggle2, setToggle2] = useState(false)
const [Barcode1,setBarcode1] = useState("")
const [ProductName1,setProductName1] = useState("")
const [Barcode,setBarcode] = useState("")
const [ProductName,setProductName] = useState("")
const [Quantity,setQuantity] = useState("")
const [ReorderQuantity,setReorderQuantity] = useState("")
const [Price,setPrice] = useState("")
const [refres, setrefres] = useState(false);
const validate2=()=>{
  var letters = /^[A-Z a-z]+$/;
if((!isNaN(Barcode)) && (Barcode!="") && (Barcode.length>11))
{
 if((ProductName.match(letters)) && (ProductName!=""))
 {
   if((Quantity!="") && (!isNaN(Quantity)))
   {
     if(ReorderQuantity!="" && (!isNaN(ReorderQuantity)))
     {
       if((Price!="") && (!isNaN(Price)))
       {
         UpdateProduct();//this function will be called when all fields are validated.
       }
       else {setPrice("");alert("Enter Valid Price!")}
     }
     else{setReorderQuantity("");alert("Please enter valid ReorderQuantity!")}
   }else{setQuantity("");alert("Please enter a Valid Quantity!")}
 }else{setProductName("");alert("Please enter a valid Product Name!")}
}else{setBarcode("");alert("Please enter a valid Barcode!")}
}

function Item({Barcode1,ProductName1,Quantity,ReorderQuantity,Price}){
  return(<View style={styles.row2}>
    <TouchableOpacity onPress={() => gotopro(Barcode1)}style={styles.Listitems}>
      <Text style={styles.txt1}> {ProductName1} </Text>
      <Text style={styles.txt}> {Quantity} </Text>
      <Text style={styles.txt}> {ReorderQuantity} </Text>
      <Text style={styles.txt}> {Price} </Text>
     
    </TouchableOpacity>
     <TouchableOpacity onPress={() => deleted(Barcode1)}style={styles.txt3}>
     <MaterialCommunityIcons name="delete-circle-outline" size={24} color="red" />
    </TouchableOpacity> 
    </View>
  );
}
  const pro=()=>{
    dataSource2=[];
 
 setflag(false);
fetch("https://onlinebillingapi.herokuapp.com/product",{

  method:"POST",
  headers:{
   
    'Content-Type':'application/json'
  },  
    body:JSON.stringify({
    
    
   })
  
})
.then((res)=>res.json())
.then((res)=>{ 
 
  
     for(var i in res) 
       { dataSource.push({'Barcode1':res[i].Barcode,'ProductName1':res[i].ProductName,'Quantity':res[i].Quantity,'ReorderQuantity':res[i].ReorderQuantity,'Price':res[i].Price})
}
      setToggle(false)  
  setflag(true)
})
}
fetch("https://onlinebillingapi.herokuapp.com/productReorder",{

  method:"POST",
  headers:{
   
    'Content-Type':'application/json'
  },  
    body:JSON.stringify({
    
    
   })
  
})
.then((data)=>data.json())
.then((data)=>{ 
  dataSource2=[];
     for(var i in data) 
     {  if(data[i].Quantity < data[i].ReorderQuantity)
        dataSource2.push({'Barcode1':data[i].Barcode,'ProductName1':data[i].ProductName,'Quantity':data[i].Quantity,'ReorderQuantity':data[i].ReorderQuantity,'Price':data[i].Price})
     
     }
     


  dataSource=[];
})
const gotopro=(Barcode1)=>{
  // navigation.navigate("Product",{'barfromstock':Barcode})
setBarcode(Barcode1);

search2(Barcode1); 
  
 

setflag(false);
setflag2(false);
setflag3(true);


}

const search2=(Barcode1)=>{
  fetch("https://onlinebillingapi.herokuapp.com/searchProduct",{

    method:"POST",
      headers:{
        'Content-Type':'application/json'
      },  
        body:JSON.stringify({
        'Barcode': Barcode1
    })
      
    })
    .then(data=>data.json())
    .then(data=>{
      if(data.success==true)
     {
     setProductName(data.pname);
     setReorderQuantity(JSON.stringify(data.reorder));
     setQuantity(JSON.stringify(data.quan));
     setPrice(JSON.stringify(data.price));
    }
    
    })
}

const handlerefresh=()=>{
      
  setTimeout(function(){ 
    setrefres(true);
  }, 100);
  setrefres(false);
  pro();
  
}
const allert = () =>{
  Alert.alert(
    "Cofirmation!",
    "Are you 100% sure to Delete this Record!",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Yes i am sure", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );
  }
 
const deleted=(Barcode1)=>{

  
// allert();
  fetch("https://onlinebillingapi.herokuapp.com/delete2",{

    method:"POST",
    headers:{
     
      'Content-Type':'application/json'
    },  
      body:JSON.stringify({
      Barcode:Barcode1
      
     })
    
  }).then(data=>data.json())
  .then(data=>{
     handlerefresh(); 
   alert("Product Detail Deleted!");
  
   
  })
 
}
const reorder=()=>{
  if(flag)
  {
cancel();
setflag2(true);
setflag(false);

  }
  else{
    setToggle(true);
    cancel();
    window.dataSource=[];
    window.dataSource2=[];

    
    setflag(true);
    setflag2(false);
    pro();
  }
}


const UpdateProduct=()=>{
    
  fetch("https://onlinebillingapi.herokuapp.com/UpdateProduct",{

  method:"POST",
    headers:{
    
      'Content-Type':'application/json'
    },  
      body:JSON.stringify({
      'Barcode': Barcode,  
      'ProductName':ProductName ,
      'Quantity': Quantity,
      'ReorderQuantity':ReorderQuantity ,
      'Price': Price
  })
    
  })
  .then(data=>data.json())
  .then(data=>{
    if(data.success==false)
    alert("Product not found!, Add Before Updating!");
  else
  alert("Product "+ProductName +" is Updated Successfully!");
  })   
  
}

const search=()=>{
  setToggle2(true);
  dataSource=[];
  dataSource2=[];
  setflag(false);
  setflag2(false);
  fetch("https://onlinebillingapi.herokuapp.com/search2",{

    method:"POST",
    headers:{
     
      'Content-Type':'application/json'
    },  
      body:JSON.stringify({
      'ProductName':ProductName,
      
     })
    
  })
  .then(data=>data.json())
  .then((data)=>{ 
    if(data)
    {
      for(var i in data)
      {
        dataSource.push({'Barcode1':data[i].Barcode,'ProductName1':data[i].ProductName,'Quantity':data[i].Quantity,'ReorderQuantity':data[i].ReorderQuantity,'Price':data[i].Price})
      }
      setflag(true);
    }
    setToggle2(false);
  })

}
const cancel=()=>{
  setflag(false);
  setflag2(false);
  setflag3(false);
}
return (
    <View style={styles.container}>
    
    <View style={styles.row2}>
    <View style={styles.rowcol}>
    <TextInput name="search" placeholder="Product Name here"
     value={ProductName} onChangeText={text=>setProductName(text)}
          style={{
          borderRadius:10,
          color:'black',
          height:30,
          marginLeft:5,
          width:170,
          fontSize:15,
          textAlign:'center',
          backgroundColor:'#2196F3',
          }}
         />  
          <TouchableOpacity style={styles.btn} onPress={search}>
          {renderIf(!toggle2)(
      <Text>SEARCH</Text>)}
      {renderIf(toggle2)(
      <Image style={{height:25, width:25}} source={require('../../assets/loading.gif')}/>)}
         </TouchableOpacity>
         <TouchableOpacity style={styles.btn} onPress={reorder}>
         
         {renderIf(!toggle)(
      <Text>Toggle Stocks</Text>)}
      {renderIf(toggle)(
      <Image style={{height:25, width:25}} source={require('../../assets/loading.gif')}/>)}
         </TouchableOpacity>
   </View>
   </View>
   { renderIf(flag)(
     <>
     <View style={styles.roww}>
     <Text style={styles.header}>ProductName</Text>
     <Text style={styles.header}>Quantity</Text>
     <Text style={styles.header}>ReorderQuantity</Text>
     <Text style={styles.header}>Price</Text>
     </View>
<FlatList
data={dataSource}
renderItem={({item})=>(
<Item Barcode1={item.Barcode1} ProductName1={item.ProductName1} Quantity={item.Quantity} ReorderQuantity={item.ReorderQuantity} Price={item.Price}/>
 
)}
keyExtractor={(item)=>item.Barcode1}
refreshing={true}
/>
</>
)}
{ renderIf(flag3)(
  <View style={styles.border}>
  <Text style={styles.header1}>Want to Update anything?</Text>
  <Text style={styles.lbl}>Enter Barcode number</Text>
          <View style={styles.serch}>
          <TextInput name="barcode" placeholder="Barcode No."
           value={Barcode} onChangeText={text=>setBarcode(text)}
           style={styles.txtupdate}
         />
        
         </View>
          <Text style={styles.lbl}>Enter Product name</Text>
          <TextInput name="proname" placeholder="Product Name"
     value={ProductName} onChangeText={text=>setProductName(text)}
          style={styles.txtupdate}
         />
          <Text style={styles.lbl}>Enter Quantity</Text>
          <TextInput placeholder="In Pcs" name="qty"
     value={Quantity} onChangeText={text=>setQuantity(text)}
          style={styles.txtupdate}
         />
        <Text style={styles.lbl}>Enter Reorder Quantity</Text>
          <TextInput placeholder="In Pcs" name="reorder"
     value={ReorderQuantity} onChangeText={text=>setReorderQuantity(text)}
          style={styles.txtupdate}
         />
              <Text style={styles.lbl}>Enter Price</Text>
          <TextInput placeholder="Enter Price"  name="price"
     value={Price} onChangeText={text=>setPrice(text)}
          style={styles.txtupdate}
          />
<View style={styles.row2}>
<TouchableOpacity style={styles.btn}onPress={validate2}>
         <Text>Update</Text>
         </TouchableOpacity>
           <TouchableOpacity style={styles.btn}onPress={cancel}>
         <Text>Cancel</Text>
         </TouchableOpacity>
          </View>
          </View>
)}

{ renderIf(flag2)(
     <>
     <Text style={styles.header}>Re-Order these things!</Text>
     <View style={styles.roww}>
     <Text style={styles.header}>ProductName</Text>
     <Text style={styles.header}>Quantity</Text>
     <Text style={styles.header}>ReorderQuantity</Text>
     <Text style={styles.header}>Price</Text>
     </View>
<FlatList
data={dataSource2}
renderItem={({item})=>(
<Item Barcode1={item.Barcode1} ProductName1={item.ProductName1} Quantity={item.Quantity} ReorderQuantity={item.ReorderQuantity} Price={item.Price}
/>
)}
keyExtractor={(item)=>item.Barcode1}
/>
</>
)}

    </View>
 );
}


const styles = StyleSheet.create({
  container: {
    borderWidth:2,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    ...Platform.select({
      ios: {
        flex:1,
        
      },
      android: {
        flex:1,
       flexDirection:'column'
        
      },
      default: {
        flexDirection:'column',
       flex:1,
      // flexDirection:'row '
      }
    }),
    
    backgroundColor: '#192531',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Listitems:{
    flexDirection:'row',
      borderRadius:15,
  },
  rowcol:{
    ...Platform.select({
      ios: {
       
        flexDirection:'column'
      },
      android: {
        marginTop:5,
       flexDirection:'column'
        
      },
      default: {
        flexDirection:'row',
    
      }
    }),
  },
  header:{
    color:"#fff",
   
    marginBottom:5,
    marginTop:15,

    borderColor:"#9CDCFE",
    padding:2,  
    ...Platform.select({
      ios: {
       fontSize:15,
      marginHorizontal:3,
      },
      android: {
        fontSize:15,
        marginHorizontal:3,
        
      },
      default: {
        flexDirection:'row',
        width:250,
     fontSize:25,
      },
    }),
    textAlign:'left'
  },
  header1:{
    color:"#fff",
    fontSize:25,
    marginBottom:15,
    borderWidth:1,
    borderRadius:12,
    borderColor:"#9CDCFE",
    padding:2,  
    width:"100%",
    flexDirection:"row"
  },

  row2:{flexDirection:'row'},
  lbl:{
    color:"#fff",
    fontSize:20,
    flexDirection:"row",
    marginHorizontal:25,
  },
  txtupdate:{

    height: 30,
    ...Platform.select({
      ios: {
       
        width:300
      },
      android: {
  
       width:300
        
      },
      default: {
        flexDirection:'row',
        width:200
    
      }
    }),
    marginBottom:5,
    fontSize:18,
     color:"#fff",
      textAlign:'center',
     backgroundColor:'#2196F3',
       padding:5,
     
  },
  txt:{

    height: 30,
    ...Platform.select({
      ios: {
       
        width:60
      },
      android: {
  
       width:60
        
      },
      default: {
        flexDirection:'row',
        width:200
    
      }
    }),
    marginBottom:5,
    fontSize:18,
     color:"#fff",
      textAlign:'left',
     backgroundColor:'#2196F3',
       padding:5,
     
  },
  txt1:{
    
    height: 30,
    ...Platform.select({
      ios: {
       
        width:150
      },
      android: {
  
       width:150
        
      },
      default: {
        flexDirection:'row',
        width:350
    
      }
    }),
    marginBottom:5,
    fontSize:18,
     color:"#fff",
      textAlign:'left',
     backgroundColor:'#2196F3',
       padding:5,
  
  },
  
    btn: {
      backfaceVisibility:'visible',
      backgroundColor:'#2196F3',
      borderRadius:10,
      alignItems:'center',
      justifyContent:'center',
       height:30,
      ...Platform.select({
        ios: {
          margin:5,
      width:170,
      height:30,
      padding:0,
        },
        android: {
         
          margin:5,
      width:170,
      height:30,
      padding:0,
        },
        default: {
         width:170,
         margin:5
        
        }
      }),
      
    },
  
  btn2:
  {
    marginHorizontal:15,
  },
  roww:{
    
     flexDirection:"row",
    //  width:"75%",
     paddingLeft:10,
     borderWidth:1,
     borderRadius:10,
     marginBottom:8,
     marginTop:15,
    
     borderColor:"#2196F8",
    },
    txt2:
    {
      height: 30,
      width :160,
      ...Platform.select({
        ios: {
         
         marginBottom:5
        },
        android: {
    
        marginBottom:5
          
        },
        default: {
        marginRight:10,
        }
      }),
      fontSize:15,
       color:"#fff",
        textAlign:'left',
       backgroundColor:'#2196F8',
         padding:5,
    },
    txt3:
    {
      height: 30,
      width :35,
     
      
       
        textAlign:'left',
       backgroundColor:'#2196F8',
         padding:5,
    },
    border:{
      borderWidth:1,
      borderRadius:15,
      padding:10,
      borderColor:"#2196F3",
      marginTop:20,

      alignItems:'center'
    },
    border2:{
      borderWidth:1,
      borderRadius:15,
      padding:10,
      borderColor:"red",
      marginTop:20,
      marginHorizontal:10,

    },
  bor:{
//flex:1,
flexDirection:"row",
marginHorizontal:10,
  },
  bor2:{
flexDirection:"row",
  },
  Text:{
    marginLeft:10,
  }
});
