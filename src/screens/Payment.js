import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,Button, Text,Image , View ,TextInput,KeyboardAvoidingView, Platform,TouchableOpacity} from 'react-native';
import {Component} from 'react';
import { useNavigation ,useRoute} from '@react-navigation/native';
import  { useState } from 'react';
import { AntDesign,FontAwesome,Ionicons  } from '@expo/vector-icons';
import renderIf from 'render-if';
export default function Payment() {
    const route = useRoute();
    var total=route.params.total;
    var dataSource=route.params.dataSource;
    const navigation = useNavigation();

    function navigateToList() {
        navigation.navigate("Home");
    }
    
    function gotosignup() {
      navigation.navigate("Sign Up");
  }
  function forget() {
      navigation.navigate("Forget");
  }
  
  const [mno, setMob] = useState("")
  const [pass, setPass] = useState("")
  const [flag, setFlag] = useState(true)
  const [flag1, setFlag1] = useState(true)
  const [flag2, setFlag2] = useState(false)
  const [flag3, setFlag3] = useState(true)
  var total=route.params.total;
  var dataSource=route.params.dataSource;
  var Name=route.params.Name;
  var phone=route.params.phone;
  

  var date = new Date().getDate();
  var month = new Date().getMonth()+1 ;
  var year = new Date().getFullYear();

 //var totalq=0;
var date2= (date + '-' + month + '-' + year);



  const savedata=()=>{

    fetch("http://aa29cf7dceb5.ngrok.io/savebill", {
        method: "POST",
        headers:{
       
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          "CustomerName":Name,
          "MobileNumber":phone,
          "Date":date2,
          "TotalPayment":total,
         "Products":dataSource 
        })
        

    })

  }
 const hide=()=>{
   if(flag)
   {
    setFlag(false)
    setFlag1(true)
   
   }
   else{
    setFlag(true) 
    setFlag1(false)
   
   }
 }
    const redirect=()=>{
      setFlag3(false)
      setTimeout(function(){ 
       navigation.navigate('Bill',{'dataSource':dataSource,'total':total,'Name':route.params.Name,'phone':route.params.phone});
      }, 4000);
      savedata();

      setTimeout(function(){
         setFlag3(true);
       
       }, 4000);
    }
  return (
  //   <KeyboardAvoidingView
  //   behavior={Platform.android === "android" ? "padding" : "height" }
  //   style={styles.container}
  // >
    
        <View style={styles.container} >
          {renderIf(flag3)( <>
          <Text style={styles.header1}>Confirm Order To Pay</Text>
         <Text style={styles.lbl}>Please make the payment, before leaving store!</Text>
          <View style={styles.img}>
          {renderIf(flag2)(
        <Ionicons name="md-arrow-back-circle-outline" style={{marginRight:30}} size={30} color="#BEBEBE" onPress={()=>{setFlag(true);setFlag1(true);setFlag2(false);}} />)}
          {renderIf(flag)(
            <TouchableOpacity onPress={()=>{setFlag1(false); setFlag2(true)}}>
         
          <Image
        style={{height:35,width:90, marginRight:20}}
         source = {require('./img/gp.png')}
       />
       
      </TouchableOpacity>
  )}
        {renderIf(flag1)(
       <TouchableOpacity onPress={()=>{setFlag(false); setFlag2(true)}}>
       
       <Image
        style={{height:40,width:90,marginLeft:20,backgroundColor:'#fff',borderRadius:10}}
         source = {require('./img/ap3.png')}
 
      /></TouchableOpacity>
        )}  

        
          </View>
          
          {renderIf(flag2)(<>
          <View style={styles.txt} > 
          <Text style={{color:'#BEBEBE',fontSize:22, textAlign:'center'}}>Total Amount : {total} </Text>
          <FontAwesome style={{paddingTop:6}} name="rupee" size={24} color="#BEBEBE" />
       </View>
         <TouchableOpacity style={styles.btn1} onPress={redirect}>
           <Text style={{fontSize:22,textAlign:'center'}} > Proceed To Pay </Text>
           </TouchableOpacity> 
           </>
        )}
        </>
          )}

          {renderIf(!flag3)( <><Image style={{width:100,height:80}} source={require('../../assets/loading3.gif')}/>
          <Text style={{fontSize:18,color:"#fff"}}>Redirecting to UPI </Text>
          </>)}
         
 
        </View>

        // </KeyboardAvoidingView>
      
       
         
        
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
      fontSize:25,
      marginBottom:20,
      borderWidth:1,
      borderRadius:12,
      borderColor:"#9CDCFE",
      padding:2, 
      alignItems:'center' ,
      textAlign:'center',
    },
    img:{
      marginTop:50,
      alignItems:'center',
      flexDirection:'row',
      justifyContent:'center'

    },
    header1:{
      textAlign:'center',
      // justifyContent:'flex-start',
      color:"#fff",
      fontSize:30,
      marginTop:10,
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
         padding:5,
         marginTop:50,
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
      flex:0.5,
       flexDirection:"row"
      },
      bor:{
        borderWidth:1,
        borderRadius:15,
        padding:10,
        borderColor:"#2196F3",
        marginBottom:10,
        
      }
      
  });



