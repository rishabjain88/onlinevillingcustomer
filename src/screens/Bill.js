import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,Button, Text,Image ,FlatList, View ,TextInput,KeyboardAvoidingView, Platform,TouchableOpacity} from 'react-native';
import {Component} from 'react';
import { useNavigation ,useRoute} from '@react-navigation/native';
import  { useState } from 'react';
import { AntDesign,FontAwesome,Ionicons ,Feather } from '@expo/vector-icons';
import renderIf from 'render-if';

export default function Bill() {
    const route = useRoute();
    var total1=route.params.total;
    var dataSource=route.params.dataSource;
    var Name=route.params.Name;
    var phone=route.params.phone;
    var date=new Date();
  
  //alert(Name+phone)
    const navigation = useNavigation();
  const [mno, setMob] = useState("")
  const [pass, setPass] = useState("")
  const [flag, setFlag] = useState(true)
  const [flag1, setFlag1] = useState(true)
  const [flag2, setFlag2] = useState(false)
  var date = new Date().getDate();
  var month = new Date().getMonth()+1 ;
  var year = new Date().getFullYear();
 var total=0;
 var totalq=0;
// var date2= (date + '-' + month + '-' + year);
// const savedata=()=>{

//     fetch("http://aa29cf7dceb5.ngrok.io/savebill", {
//         method: "POST",
//         headers:{
       
//           'Content-Type': 'application/json'
//         },
//         body:JSON.stringify({
//           "CustomerName":Name,
//           "MobileNumber":phone,
//           "Date":date2,
//           "TotalPayment":total,
//          "Products":dataSource 
//         })
        

//     })
  
//   }
  
  
  total=0;
  totalq=0;
 for(var i=0;i<dataSource.length;i++)
 {
      total=total+dataSource[i].TotalPrice;
      totalq=totalq+dataSource[i].Quantity;

 }


  
  const Item = ({Barcode,ProductName,TotalPrice,Quantity}) => (
    <View style={styles.item}>
     
   
       <Text style={styles.title2}>{ProductName}</Text>
       <Text style={styles.title}>{Quantity}</Text>
       
       <Text style={styles.title}> {TotalPrice}</Text>
       
     
</View>
    
  )




 
   setTimeout(function(){ 
   setFlag(false);
   }, 2000);




   const renderItem = ({ item }) => (
    <>
        
    <Item Barcode={item.Barcode} ProductName={item.ProductName}  TotalPrice={item.TotalPrice} Quantity={item.Quantity}  />
    
  </>
  )
  return (
 <View style={styles.container} >
    
    {renderIf(flag)(<View style={{flexDirection:'row'}}  >
     <Text style={styles.txt}> Payment successfull  </Text>
     <Feather style={{paddingTop:7}} name="check-circle" size={25} color="#00ff00" />
     </View>)}


 {renderIf(!flag)(
   <>
   <View style={{height:"90%"}}>
   <View style={{alignItems:'flex-start',marginTop:20,marginBottom:20,paddingLeft:20}}>
   <Text style={styles.header1}>Customer Name: {Name}</Text>
   <Text style={styles.header1}>Mobile Number: {phone}</Text>
   <Text style={styles.header1}>Date: {date + '-' + month + '-' + year}</Text>
   </View>
   <View style={styles.roww}>
   <Text style={styles.header}>ProductName</Text><Text style={styles.header}>Quantity</Text><Text style={styles.header}>TotalPrice</Text>
   </View>
  
 <FlatList 
    data={dataSource}
    renderItem={renderItem}
keyExtractor={(item)=> item.Barcode}
extraData={Item}

refreshing={true}
//onRefresh={handlerefresh}
      />
      </View>
      <View style={{height:"10%",flexDirection:'row',alignItems:'center',justifyContent:'center',}}>
      <Text style={styles.header2}>Total Quantity: {totalq}</Text>
      <Text style={styles.header2}>Total Amount: {total}</Text>
      </View>
 </>
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
   
   alignItems:'center',
   justifyContent:'flex-start',
   marginLeft:20,
   paddingLeft:2,
      flexDirection:'row',
    },
    title: {
      fontSize: 17,
      width:100,
      color:'#fff',
      marginVertical:4,
marginHorizontal:5,
borderRightWidth:1,

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
     width:'90%',
       flexDirection:"row",
       borderWidth:1,
        borderColor:'#2196F3',
marginLeft:15,
        paddingLeft:2
      },
      bor:{
        borderWidth:1,
        borderRadius:15,
        padding:10,
        borderColor:"#2196F3",
        marginBottom:10,
        
      }
      
  });



