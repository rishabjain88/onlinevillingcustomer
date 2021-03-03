import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,Button, Text,Image ,FlatList, View ,TextInput,KeyboardAvoidingView, Platform,TouchableOpacity} from 'react-native';
import {Component} from 'react';
import { useNavigation ,useRoute} from '@react-navigation/native';
import  { useState } from 'react';
import { AntDesign,FontAwesome,Ionicons ,Feather } from '@expo/vector-icons';
import renderIf from 'render-if';
import { TouchableHighlight } from 'react-native-gesture-handler';
 var dataSource=[[]];
export default function History() {
    const route = useRoute();
    var Name= route.params.Name;
    var phone= route.params.phone;
   
 const navigation = useNavigation();
  const [flag, setFlag] = useState(false)
  const [flag1, setFlag1] = useState(true)
  const [flag2, setFlag2] = useState(false)
  var date = new Date().getDate();
  var month = new Date().getMonth()+1 ;
  var year = new Date().getFullYear();
 var total=0;
 var totalq=0;

 const purchaseDetail=(_id)=>{
     setFlag(false);
     
 }

 const Item1 = ({ProductName,Price,Quantity}) => (
    <View style={styles.item} >
     
     <Text style={styles.title}>{ProductName}</Text> 
     <Text style={styles.title}>{Quantity}</Text>
       <Text style={styles.title}>{Price}</Text>
      
       </View>
)
 const renderItem1 = ({ item }) => (
    <>
        
    <Item1  ProductName={item.ProductName} Price={item.TotalPrice}  Quantity={item.Quantity}/>
    
  </>
 )
 const Item = ({_id,Date,TotalPayment,Products}) => (
     <View style={{marginVertical:7, borderRadius:5}}>
    <View style={styles.item} >
     
   
       <Text style={styles.title2}>Shopping Date: {Date}</Text>
       <Text style={styles.title2}>Total Bill: {TotalPayment} Rs.</Text>
   
       </View>
       <View style={styles.item1} >
           <View style={{flexDirection:'row'}}>
       <Text style={styles.title}>Products</Text>
       <Text style={styles.title}>Quantity</Text>
       <Text style={styles.title}>Price</Text>
       </View>
       <FlatList 
    data={Products}
    renderItem={renderItem1}
keyExtractor={(item)=> item._id}
// extraData={Item}

refreshing={true}
//onRefresh={handlerefresh}
      />
     </View>

    </View>
  )
  const renderItem = ({ item }) => (
   <>
       
   <Item  _id={item._id} Date={item.Date} TotalPayment={item.TotalPayment} Products={item.Products} />
   
 </>
  )
 

    fetch("http://aa29cf7dceb5.ngrok.io/History", {
        method: "POST",
        headers:{
       
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          
          "MobileNumber":phone,
         
        })
        

    }).then(data=>data.json())
    .then((data)=>{
dataSource=data;
setFlag(true);
    })

  
  return (
 <View style={styles.container} >

    
    {
  renderIf(flag)(
  
    <FlatList 
    data={dataSource}
    renderItem={renderItem}
keyExtractor={(item)=> item._id}
// extraData={Item}

refreshing={true}
//onRefresh={handlerefresh}
      />
  )}
    

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
    header:{
      color:"#fff",
      fontSize:20,
      marginBottom:10,
   marginRight:30,

  // paddingRight:20,
      borderColor:"#9CDCFE",
      //borderRightWidth:1,
      alignItems:'center' ,
      textAlign:'center',
    },
    img:{
      marginTop:50,
      alignItems:'center',
      flexDirection:'row',
      justifyContent:'center'

    },

    item: {
      backgroundColor: '#2196F3',
width:"90%",
borderBottomWidth:1,
   borderRadius:5,
   alignItems:'center',
   justifyContent:'flex-start',
   marginLeft:20,
   paddingLeft:2,
      flexDirection:'row',
    },
    item1: {
        backgroundColor: '#2196F3',
  width:"90%",
//   borderBottomWidth:1,
  borderRadius:8,
     alignItems:'center',
     justifyContent:'flex-start',
     marginLeft:20,
     paddingLeft:2,
        flexDirection:'column',
      },
    title: {
      fontSize: 17,
      width:100,
      color:'#fff',
      marginVertical:4,
marginHorizontal:5,
borderRightWidth:1,
borderRadius:5,
    },
    title2: {
      fontSize: 17,
      width:150,
      color:'#fff',
      marginVertical:4,
marginHorizontal:5,
borderRightWidth:1,
    },
    header1:{
      textAlign:'left',
      // justifyContent:'flex-start',
      color:"#fff",
      fontSize:20,
      marginTop:10,
    },
    header2:{
      height:30,
      textAlign:'center',
      // justifyContent:'flex-start',
      backgroundColor: '#2196F3',
      color:"#fff",
      fontSize:18,
      marginTop:10,
      paddingLeft:4,
       marginHorizontal:10,
      paddingRight:12,
      borderRadius:6,
    },
    lbl:{
      color:"#BEBEBE",
      fontSize:15,
      flexDirection:"row",
      marginHorizontal:50,
      textAlign:'center'

    },
    forg:{
      
        height: 30,
          width :300,
          fontSize:15,
         color:"#2196F3",
           margin:0,
          textAlign:'center',
          textDecorationLine:'underline',
    },
            
    txt: {
      
     
      
      fontSize:28,
       color:"#fff",
        //borderColor: 'gray',
        flexDirection:"row",
         //borderWidth: 2,
         textAlign:'center',
         justifyContent:'center',
         //alignItems:'center',
        // borderRadius:50,
         
         
      // borderWidth:1,
    },
    btn: {
      margin:0,
      
    },
    btn1: {
     // marginBottom:5,
     alignContent:'flex-end',
     height:40,
      justifyContent:'center',
      marginTop:150,
   
      backfaceVisibility:'visible',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#2196F3",
      width:220,
     
    },
    
    roww:{
     justifyContent:'flex-start',
     
       flexDirection:"row",
       borderWidth:1,
        borderColor:'#2196F3',

       
      },
      bor:{
        borderWidth:1,
        borderRadius:15,
        padding:10,
        borderColor:"#2196F3",
        marginBottom:10,
        
      }
      
  });



