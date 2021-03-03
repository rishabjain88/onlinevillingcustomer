import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, Alert, View, TextInput, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import ValidationComponent from 'react-native-form-validator';
import { set } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';



export default function NewCustomer() {


 //var date = new Date();

 
  const navigation = useNavigation();

function navigateToList() {
   navigation.navigate("Home");
  }

  function gotosignin() {
    navigation.goBack();
  }
  const [name, setName] = useState("")
  const [dob, setDob] = useState("")
  const [mno, setMno] = useState("")
  const [pass, setPass] = useState("")
  const [repass, setrePass] = useState("")
  

  const submit_data=()=> {
   
 
   
    fetch("http://aa29cf7dceb5.ngrok.io/send-data", {
      method: "POST",
      headers:{
     
        'Content-Type': 'application/json'
      },

      body:JSON.stringify({
        'Name': name,
        'Dateofbirth':dob,
        'MobileNumber': mno,
        'Password': pass
      })

    })
      .then(res => res.json())

      .then(data => {
        console.log(data);
        if (data.success) {
          alert("mobile number already exist")
          setMno("")
        }
        else{
          alert("Registered! Sucessfully ");
          gotosignin()
      
        }  
      })
      .catch(err => {
        Alert.alert('Err:', err.message);
      });
       //alert("Registered! Sucessfully ");
  }
  
  const validate=()=>{
    var r=mno;
    var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    var letters=/^[A-Z a-z]+$/;
    if ((name.match(letters)) && (!name=="") && (name.length>2))
    {
      if ((dob.match(dateformat)) && (!dob=="")){
        
     
      if ((mno.length==10) && (!mno=="") && !isNaN(mno)){
        if((!pass=="") &&(pass.length>3)){
          if( (!repass=="")) {
          if((pass==repass) && (!repass=="")) {
          submit_data()
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
   else{
    alert("Enter valid mobile number")
    setMno("");
  }
}else{
  alert("Date is wrong use this format DD/MM/YYYY OR DD-MM-YYYY")
  setDob("");
}
  
 } else{
  alert("Name is not in correct format")
  setName("");
}
    
}
  const clear=()=> 
  {
    setName("");
    setDob("");
    setMno("");
    setPass("");
    setrePass("");

  }

  return (
    <View style={styles.container} >
      <>
      <View style={styles.bor}>
      {/* <Text style={styles.header}>Date:{date.toString()}</Text> */}
      {/* <AntDesign name="adduser" size={24} color="#2196F3" /> */}
        <Text style={styles.header}>SIGN UP</Text>
        <Text style={styles.lbl}>Enter Full Name</Text>
        <TextInput placeholder="Full Name" placeholderTextColor='#2196F3' value={name}

          onChangeText={text => setName(text)}
          style={styles.txt}
        />
        <Text style={styles.lbl}>Date Of Birth</Text>
        <TextInput placeholder="DD/MM/YYYY"  placeholderTextColor='#2196F3'  value={dob}
          onChangeText={text => setDob(text)} color='red'
          style={styles.txt}
        />
        <Text style={styles.lbl}>Enter Your Mobile Number</Text>
        <TextInput  keyboardType='numeric' name="mno" placeholder="Mobile Number" placeholderTextColor='#2196F3' value={mno}   
          onChangeText={text => setMno(text)}
          style={styles.txt}
        />

        <Text style={styles.lbl}>Enter Password</Text>
        <TextInput placeholder="Enter password"  placeholderTextColor='#2196F3' name="pass" value={pass} 
          onChangeText={text => setPass(text)}
          style={styles.txt}
          secureTextEntry={true}
        />
        <Text style={styles.lbl}>Re-Enter Password</Text>
        <TextInput secureTxtEntry={true} name="repass" placeholder="Re-enter password"  secureTextEntry={true} placeholderTextColor='#2196F3'value={repass} onChangeText={text =>setrePass(text)}

          style={styles.txt}
        />
        <View style={styles.roww}>
          <TouchableOpacity style={styles.btn}>

            <Button title="Create Account" onPress={() =>validate()} />

          </TouchableOpacity>

          <TouchableOpacity style={styles.btn}>
            <Button title="Cancel" onPress={() => gotosignin()} />
          </TouchableOpacity>
        </View>
      </View>
      </>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192531',
    alignItems: 'center',
    //marginHorizontal:5,
    justifyContent: 'center',
  },
  header: {
    color: "#2196F3",
    fontSize: 25,
    marginBottom: 20,
    marginTop:5,
    marginHorizontal:5,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#9CDCFE",
    padding: 2,
    textAlign: 'center',
  },
  lbl: {
    color: "#fff",
    fontSize: 18,
    flexDirection: "row",

  },
  txt: {

    height: 30,
    width: 290,
    fontSize: 18,
    color: "#fff",
    borderColor: 'gray',
    flexDirection: "row",
    borderWidth: 2,
    textAlign: 'left',
    borderRadius: 10,
    padding: 5,
    marginBottom: 5,
    
 
   

  },
  btn: {
    margin: 5,
  },
  roww: {

    flexDirection: "row"
  },
  bor: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    borderColor: "#2196F3",
    marginBottom: 10,

  }

});


