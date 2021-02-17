import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,Button, Text, View ,TextInput,KeyboardAvoidingView, Platform,TouchableHighlight, TouchableOpacity} from 'react-native';
import {Component} from 'react';
import { useNavigation } from '@react-navigation/native';
import  { useState } from 'react';

export default function Login() {
    
    const navigation = useNavigation();

    function navigateToList() {
        navigation.navigate("Home");
    }
    
    function gotosignup() {
      navigation.navigate("NewCustomer");
  }
  const [mno, setMob] = useState("")
  const [pass, setPass] = useState("")
  
  const login_data=()=> {
   
   
   
    fetch("http://localhost:3000/sign-in", {
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
          navigation.navigate("Home",{'Name':res.Name});
          clear()
        }
        else{
          alert(res.message)
          clear()
         
        }
      
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
          <Text style={styles.header}>SIGN IN</Text>
          <Text style={styles.lbl}>Enter Mobile number</Text>
          <TextInput name="mob" placeholder="Mobile Number" value={mno}
           onChangeText={text => setMob(text)}
    
          style={styles.txt}
         />

        
              <Text style={styles.lbl}>Enter Password</Text>
          <TextInput placeholder="Enter password"  name="pass" value={pass}
           onChangeText={text =>setPass(text)}
    
          style={styles.txt}
          secureTextEntry={true}
         />
         <TouchableOpacity style={styles.btn}>
         
         <Button title="Login"  onPress= {()=>login_data()}/>  
         
         </TouchableOpacity>
        
    
         <TouchableOpacity style={styles.btn}>
         <Button title="Sign-up"  onPress= {()=>gotosignup()}/>  
         </TouchableOpacity>
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
      textAlign:'center',
    },
    lbl:{
      color:"#fff",
      fontSize:18,
      flexDirection:"row",

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
         borderRadius:10,
         padding:5,
         marginBottom:5,
       
    },
    btn: {
      margin:5,
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



