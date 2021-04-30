import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { Platform,StyleSheet,Button, Image,Text, View ,TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';
import {Component} from 'react';
import NewAdmin from './NewAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useNavigation,useRoute,useFocusEffect  } from '@react-navigation/native';
import renderIf from 'render-if';
// import ImagePicker from 'react-native-image-picker';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { AntDesign,MaterialIcons,MaterialCommunityIcons,FontAwesome  ,Ionicons ,Feather } from '@expo/vector-icons'; 

export default function Product() {
  const navigation = useNavigation();
  var c=0;
  const [flag1,setFlag1]=useState(false);
  const [toggle,setToggle]=useState(false);
  const [toggle2,setToggle2]=useState(false);
   const route= useRoute()
  const pressHandler=() => {
    
    navigation.navigate("NewAdmin");
  }
  const [Barcode,setBarcode] = useState("")
  const [ProductName,setProductName] = useState("")
  const [Quantity,setQuantity] = useState("")
  const [ReorderQuantity,setReorderQuantity] = useState("")
  const [Price,setPrice] = useState("")
 
  const validate=()=>{
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
           AddProduct()//this function will be called when all fields are validated.
         }
         else {setPrice("");alert("Enter Valid Price!")}
       }
       else{setReorderQuantity("");alert("Please enter valid ReorderQuantity!")}
     }else{setQuantity("");alert("Please enter a Valid Quantity!")}
   }else{setProductName("");alert("Please enter a valid Product Name!")}
  }else{setBarcode("");alert("Please enter a valid Barcode!")}
}
// const onScreenLoad = () => {
//   if(route.params.barfromstock!=null)
//   {
//   setBarcode(route.params.barfromstock);
//   gotosearch;
//   }
// // }
// useEffect(() => {

//   onScreenLoad();

// }, [])
 
const gotosearch=()=>{
  search();
}
useFocusEffect(
  React.useCallback(() => {
    if(route.params.barfromstock!=null)
    {
      
      if(!flag1){
   
      }
      else
      {
        setBarcode(route.params.barfromstock);
      }
  setFlag1(true);
    }
  })
)
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
  const AddProduct=()=>{
    setToggle2(true);

    fetch("https://onlinebillingapi.herokuapp.com/AddProduct",{

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
    .then(res=>res.json())
    .then(data=>{
      if(data.success==true)
      alert("This Product is already Added, You can now only update it.!");
    else
      alert("Product "+ProductName+" is Added successfully!");
      setToggle2(false);
    })   
   // alert("Product "+ProductName +" is added Successfully!")
  }


  const UpdateProduct=()=>{
    setToggle(true);
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

    setToggle(false);
    })   
    
  }
  const search=()=>{
    fetch("https://onlinebillingapi.herokuapp.com/searchProduct",{

      method:"POST",
        headers:{
          'Content-Type':'application/json'
        },  
          body:JSON.stringify({
          'Barcode': Barcode
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
      else
      alert("No Product found!");
      })
  }

  const searchfromstock=()=>{
    fetch("https://onlinebillingapi.herokuapp.com/searchProduct",{

      method:"POST",
        headers:{
          'Content-Type':'application/json'
        },  
          body:JSON.stringify({
          'Barcode': Barcode
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
// const imgupload=()=>{
//   const options= {
//     noData: true,
//   };
// launchImageLibrary(options, response =>{
//   console.log("response",response);
// });
// };
const clear=()=>{
  setBarcode("")
  setProductName("")
  setQuantity("")
  setReorderQuantity("")
  setPrice("")
}
  const gotostock=() => {
  //  navigation.goBack();
    navigation.navigate("StockDetails");
  }

  const goback=() => {
    navigation.pop();
  
  }

  return (
        <View style={styles.container}>
        <View style={styles.roww}>
       
        {/* <Ionicons style={styles.ico1}name="person-circle-outline" size={20} color="#2196F3" /> */}
<Text style={styles.head}> {route.params.role}: {route.params.Name}</Text>

<View style={styles.coll}>

<TouchableOpacity style={styles.btnleft} onPress={()=>goback()} >
<AntDesign style={{marginVertical:5}} name="logout" size={24} color="#192531" /> 
<Text >Logout</Text>  
         </TouchableOpacity>
         <TouchableOpacity style={styles.btnleft} onPress={gotostock}>
         <MaterialIcons style={{marginVertical:5}} name="storage" size={20} color="#192531" /> 
         <Text>Stock Details</Text>  
         </TouchableOpacity>
         </View>
</View>
        <View style={styles.bor}>
       
          <Text style={styles.header}>Add new Product Details</Text>
          <View style={styles.roww2}>
          <AntDesign name="barcode" size={24} color="#fff" />
          <Text style={styles.lbl}> Enter Barcode number</Text></View>
          <View style={styles.serch}>
          
          <TextInput name="barcode" placeholder="Barcode No."
           value={Barcode} onChangeText={text=>setBarcode(text)}
           style={styles.txt}
         />
         { renderIf(Barcode.length>11)(<Button title="Search" onPress={search}/>)} 
         </View>
         <View style={styles.roww2}>
         <Feather name="package" size={24} color="#fff" />
          <Text style={styles.lbl}> Enter Product name</Text>
          </View>
          <TextInput name="proname" placeholder="Product Name"
     value={ProductName} onChangeText={text=>setProductName(text)}
          style={styles.txt}
         />
         <View style={styles.roww2}>
         <Ionicons name="ios-add-circle-outline" size={24} color="#fff" />
          <Text style={styles.lbl}> Enter Quantity</Text>
          </View>
          <TextInput placeholder="In Pcs" name="qty"
     value={Quantity} onChangeText={text=>setQuantity(text)}
          style={styles.txt}
         /><View style={styles.roww2}>
         <MaterialCommunityIcons name="less-than-or-equal" size={24} color="#fff" />
         
        <Text style={styles.lbl}> Enter Reorder Quantity</Text></View>
          <TextInput placeholder="In Pcs" name="reorder"
     value={ReorderQuantity} onChangeText={text=>setReorderQuantity(text)}
          style={styles.txt}
         />

<View style={styles.roww2}>
<FontAwesome name="rupee" style={{marginLeft:5}} size={24} color="#fff" />
              <Text style={styles.lbl}> Enter Price</Text>
              </View>
          <TextInput placeholder="Enter Price"  name="price"
     value={Price} onChangeText={text=>setPrice(text)}
          style={styles.txt}
          />
           <View style={styles.btns}>
         
             <View style={styles.roww2}>
         <TouchableOpacity style={styles.btn} onPress={validate}>
         <MaterialIcons name="add-box" size={24} color="#192531" />
         {renderIf(!toggle2)(
          
      <Text style={styles.label}>Add Product</Text>)}
      {renderIf(toggle2)(
      <Image style={{height:25, width:25}} source={require('../../assets/loading.gif')}/>)}
         
         </TouchableOpacity>
    
         <TouchableOpacity style={styles.btn}onPress={clear}>
         <Feather name="delete" size={24} color="#192531" />
         <Text style={styles.label}>Clear all</Text> 
         </TouchableOpacity>
         </View>
         <View style={styles.roww2}>

{
         renderIf(route.params.role==='SuperAdmin')(<TouchableOpacity style={styles.btn}  onPress={pressHandler}>
          <MaterialIcons name="admin-panel-settings" size={24} color="#192531" />
          <Text style={styles.label}>Add Employee</Text>
         </TouchableOpacity>)

}
         <TouchableOpacity style={styles.btn}onPress={validate2}>
         <MaterialIcons name="update" size={24} color="#192531" />
         {renderIf(!toggle)(
      <Text style={styles.label}>Update</Text>)}
      {renderIf(toggle)(
      <Image style={{height:25, width:25}} source={require('../../assets/loading.gif')}/>)}
         </TouchableOpacity>
        </View>
       
        

</View>

        </View>
      
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#192531',
      alignItems: 'center',
      
      justifyContent: 'center',
    },
    label:{
      marginLeft:10
    },
    serch:{
      
      ...Platform.select({
        ios: {
          width:340,
          flexDirection:'column',
        },
        android: {
         width:'100%',
          flexDirection:'column',
        },
        default: {
          // other platforms, web for example
         width:480,
         flexDirection:'row',
        }
      }),
    },
    coll:{
      flexDirection:'column',
    },
    header:{
    
      fontSize:25,
      marginBottom:20,
      borderWidth:1,
      borderRadius:12,
      borderColor:"#9CDCFE",
      padding:2,  
      textAlign:'center',
      color:"#fff"
    },
    lbl:{
     
      fontSize:18,
      flexDirection:"row",
      color:"#fff"
      
    },btnleft:{
      flexDirection:'row',
      backgroundColor:'#2196F3',
      backfaceVisibility:'visible',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      height:30,
      ...Platform.select({
        ios: {
          marginLeft:262,
          marginBottom:5,
          width:140,
        },
        android: {
          marginLeft:262,
          marginBottom:5,
          width:130,
          
        },
        default: {
          // other platforms, web for example
         marginLeft:950,
         marginBottom:5,
         marginRight:5,
         width:150
        }
      })
    },
    ico1:{
paddingTop:8,
paddingLeft:8,
    },
    head:{
      color:"#fff",
      fontSize:16,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      ...Platform.select({
        ios: {
         
        },
        android: {
          color:"#2196F3",
        },
        default: {
       
        }
      }),
      width:'100%',
      paddingTop:8,
      paddingLeft:5,
      marginBottom:5
    },
   
    txt: {
      
      height: 30,
      ...Platform.select({
        ios: {
          width:"100%"
        },
        android: {
         width:360

        },
        default: {
          // other platforms, web for example
         width:"100%"
        }
      }),
      fontSize:18,
       color:"#fff",
        borderColor: 'gray',
        flexDirection:"row",
         borderWidth: 2,
         textAlign:'left',
         borderRadius:10,
         padding:5,
         marginBottom:5,
       
    },
    btn: {
      backfaceVisibility:'visible',
      backgroundColor:'#2196F3',
      borderRadius:10,
      alignItems:'center',
      justifyContent:'center',
       height:30,
       flexDirection:'row',
      ...Platform.select({
        ios: {
          margin:5,
      width:10,
      height:30
        },
        android: {
         
          margin:5,
      width:170,
      height:30,
      padding:0,
        },
        default: {
         width:225,
         margin:5
        
        }
      }),
      
    },
    btns:{
     alignItems:'center', 
    },
    roww:{
     // alignItem:'center',
     ...Platform.select({
      ios: {
        flexDirection:"column"
      },
      android: {
        flexDirection:"column",
        alignItems:'flex-end',
        justifyContent:'center',
        paddingRight:22

      },
      default: {
        flexDirection:"row",
        
      }
    }),
  },
    roww2:{
      // alignItem:'center',
      ...Platform.select({
       ios: {
         flexDirection:"row"
       },
       android: {
         flexDirection:"row"
       },
       default: {
         flexDirection:"row"
       }
     })
       
      },
      bor:{
        borderWidth:1,
        borderRadius:15,
        padding:10,
        borderColor:"#2196F3",
        justifyContent:'center',
        
        ...Platform.select({
          ios: {
            alignItems:'stretch',
          },
          android: {
            alignItems:'stretch',
          },
          default: {
           alignItems:'stretch'
          }
        })
      }
      
  });

