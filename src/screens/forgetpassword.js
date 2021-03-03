import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,Button, Text, View ,TextInput,KeyboardAvoidingView, Platform,TouchableHighlight, TouchableOpacity} from 'react-native';
import {Component} from 'react';
import { useNavigation } from '@react-navigation/native';
import  { useState } from 'react';
import renderIf from 'render-if';
export default function Forget() {
  const [flag,setFlag]=useState(true);
  const [flag2,setFlag2]=useState(false);
  const [dob, setDob] = useState("")
  const [mno, setMno] = useState("")
  const [pass, setPass] = useState("")
  const [repass, setrePass] = useState("")

    const navigation = useNavigation();
   
    function navigateToList() {
        navigation.navigate("Home");
    }
    
    function gotologin() {
      navigation.goBack()
  }
  // const [mno, setMob] = useState("")
  // const [pass, setPass] = useState("")
  
   const login_data=()=> {
  
   
    fetch("http://aa29cf7dceb5.ngrok.io/forgotpassword", {
      method: "POST",
      headers:{
     
        'Content-Type': 'application/json'
      },

      body:JSON.stringify({
      
        'MobileNumber': mno,
        'Dateofbirth': dob,
      })

    })
      .then(data => data.json())
      .then(data=>{
        if(data.success){
          setFlag(false)
          setFlag2(true)

        }
        else{
          alert("customer not found")
        }
       
       
      
      });
    }
    const resetpass=()=>{
     
  
   
        fetch("http://aa29cf7dceb5.ngrok.io/passUpdate", {
          method: "POST",
          headers:{
         
            'Content-Type': 'application/json'
          },
    
          body:JSON.stringify({
          
            'MobileNumber': mno,
            'Password':pass
            
          })
    
        })
          .then(data => data.json())
          .then(data=>{
          
           
          
          });

    
  }
  const validate=()=>{
    if((!pass=="") &&(pass.length>3)){
      if( (!repass=="")) {
      if((pass==repass) && (!repass=="")) {
      resetpass()
      gotologin()
      alert("password has been changed!")
   }
   else{

    alert(" password doesn't match with re-enter password ")
     setrePass("");
   }
  }else{
    alert(" ReEnter Password")
  }
}else{
alert("Password  too short")
}
  }
    const clear=()=> 
    {
      
      setMob("");
      setPass(""); 
    }
   

    
  return (
  
   
    
        <View style={styles.container} >
        <View style={styles.bor}>
        
          <Text style={styles.header}>FORGOT PASSWORD</Text>
          {renderIf(flag)(
            <>
          <Text style={styles.lbl}>Enter Mobile number</Text>
          <TextInput  keyboardType='numeric' name="mno" placeholder="Mobile Number"  placeholderTextColor='#2196F3'value={mno}
           onChangeText={text => setMno(text)}
    
          style={styles.txt}
         />

        
              <Text style={styles.lbl}>Date Of Birth</Text>
        <TextInput placeholder="DD/MM/YYYY"  name="dob"  placeholderTextColor='#2196F3' value={dob}
          onChangeText={text => setDob(text)}
         style={styles.txt}
        />
        
         
         <TouchableOpacity style={styles.btn}>
     
         <Button title="Proceed"  onPress= {()=>login_data()}/>  
         
         </TouchableOpacity>
         </>
          )}
          {renderIf(flag2)(   <><Text style={styles.lbl}>Enter Password</Text>
        <TextInput placeholder="Enter password" name="pass" value={pass} 
          onChangeText={text => setPass(text)}
          style={styles.txt}
          secureTextEntry={true}
        />
        <Text style={styles.lbl}>Re-Enter Password</Text>
        <TextInput secureTxtEntry={true} name="repass" placeholder="Re-enter password" value={repass} onChangeText={text =>setrePass(text)}

          style={styles.txt}
        />
                <TouchableOpacity style={styles.btn}>
     
     <Button title="Submit" onPress= {()=> validate()} ></Button>  
     
     </TouchableOpacity>
        </>
          )}
    
         <TouchableOpacity style={styles.btn}>
         <Button title="Back"  onPress= {()=>gotologin()}/>  
         </TouchableOpacity>
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