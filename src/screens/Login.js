import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,Button,Image, Text, View ,TextInput,KeyboardAvoidingView, Platform,TouchableHighlight, TouchableOpacity} from 'react-native';
import {Component} from 'react';
import { useNavigation } from '@react-navigation/native';
import  { useState } from 'react';
import renderIf from 'render-if';
import { AntDesign } from '@expo/vector-icons';
export default function Login() {
    
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
  const [toggle, setToggle] = useState(false)
   const validation=()=>
   {
    if ((!mno=="") && (!pass=="")){
      login_data()
    }else{
      alert("enter mobile number and password")
    }
   }

  
  const login_data=()=> {
   
  setToggle(true)
   
    fetch("http://aa29cf7dceb5.ngrok.io/sign-in", {
      method: "POST",
      headers:{
     
        'Content-Type': 'application/json'
      },

      body:JSON.stringify({
         
        'MobileNumber': mno,
        'Password': pass
      })

    })
      .then(res => res.json())
      .then(res=>{
        if(res.success == true){
          //alert('welcome'+"  "+res.Name)
          navigation.navigate("Home",{'Name':res.Name,'phone':res.MobileNumber});
          

          clear()
        }
        else{
          alert(res.message)
          
         
        }
      setToggle(false)
      });
    }
    const clear=()=> 
    {
      
      setMob("");
      setPass(""); 
    }
   

    
  return (
    <KeyboardAvoidingView
    behavior={Platform.android === "android" ? "padding" : "height"}
    style={styles.container}
  >
    
        <View style={styles.container} >
        <View style={styles.bor}>
       <View style={styles.header}>
       <AntDesign name="user" size={30} color="#2196F3" marginTop={10} />
          <Text style={styles.header1}  >SIGN IN</Text>
       </View>
          <Text style={styles.lbl}  >Enter Mobile number</Text>
          <TextInput keyboardType='numeric' name="mob" placeholder="Mobile Number" placeholderTextColor='#2196F3' value={mno}
           onChangeText={text => setMob(text)}
    
          style={styles.txt}
         />

        
              <Text style={styles.lbl}>Enter Password</Text>
          <TextInput placeholder="Enter password"  name="pass" placeholderTextColor='#2196F3' value={pass}
           onChangeText={text =>setPass(text)}
    
          style={styles.txt}
          secureTextEntry={true}
         />
         <TouchableOpacity style={styles.btn1}  onPress= {()=>validation()}>
           {renderIf(!toggle)( <AntDesign name="login" size={20} color="black" style={{marginVertical:5}} />)}
           {renderIf(toggle)( <Image style={{width:40,height:30}} source={require('../../assets/loading2.gif')}/>)}
   
         {/* <Button title="search"  onPress= {()=>Search()}/>   */}
         </TouchableOpacity>
       
    
         <TouchableOpacity onPress= {()=>gotosignup()} style={styles.btn}>
         <Text style={styles.forg}>Dont have an Account ?, Create One..</Text> 
         </TouchableOpacity>
         <TouchableOpacity>
          <Text style={styles.forg} onPress={()=>forget()}>Forgot Password</Text></TouchableOpacity>
        </View>
      
        </View>
        </KeyboardAvoidingView>
      
       
         
        
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
    header1:{
      textAlign:'auto',
      color:"#fff",
      fontSize:20
    },
    lbl:{
      color:"#fff",
      fontSize:18,
      flexDirection:"row",

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
      
      height: 30,
      width :300,
      fontSize:18,
       color:"#fff",
        borderColor: 'gray',
        flexDirection:"row",
         borderWidth: 2,
         textAlign:'left',
         borderRadius:50,
         padding:5,
         marginBottom:5,
       
    },
    btn: {
      margin:0,
      
    },
    btn1: {
      marginBottom:5,
      margin:30,
      marginTop:5,
      marginLeft:20,
      backfaceVisibility:'visible',
      alignItems:'center',
      borderRadius:50,
      backgroundColor:"#2196F3",
      width:255,
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



