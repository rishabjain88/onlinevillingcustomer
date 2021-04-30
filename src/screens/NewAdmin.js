import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet,Button,Image, Text, View ,Alert,TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';
import {Component} from 'react';
import renderIf from 'render-if';
import { useNavigation,useRoute } from '@react-navigation/native';
import { AntDesign,MaterialIcons,MaterialCommunityIcons,FontAwesome  ,Ionicons ,Feather } from '@expo/vector-icons'; 

export default function NewAdmin() {
  const [name,setName] = useState("")
  const [toggle,setToggle] = useState(false)
  const [empid,setEmpid] = useState("")
  const [password,setPass] = useState("")
  const [repass,setrePass] = useState("")
  const [role,setRole] = useState("employee")
  

 const route =useRoute();
  const navigation = useNavigation();
  const goback=() => {
    navigation.pop();
  
  }
  

  const validate=()=>{
    var letters = /^[A-Z a-z]+$/;
  //  if(inputtxt.value.match(letters)
   if((name.match(letters)) && (!name==""))
   {
     if(!empid=="")
     {
       if(password==repass && (!password==""))
       {
         submitdata()
       }
       else{setPass("");setrePass("");alert("Password did'nt matched!")}
     }else{setempid("");alert("Please enter Employee Id!")}
   }else{setName("");alert("Please enter a valid Name!")}
  }

  const submitdata=()=>{
    setToggle(true)
    //alert("name is "+name+ ",password is "+password+" Employee id is "+empid+" role is "+role)
    fetch("https://onlinebillingapi.herokuapp.com/send-dataA",{

      method:"POST",
      headers:{
       
        'Content-Type':'application/json'
      },  
        body:JSON.stringify({
        'Name': name,  
        'Password': password,
        'EmployeeId': empid,
        'Role': role
    })
      
    })
    .then((res) => res.json())

    .then((res) => {
      if(res.success)
        alert("Employee "+name+" is already registered!")
      else
        alert("Employee "+name+" is registered successfully!")
      
      setToggle(false)
    })  .catch(err => {
     Alert.alert('Err:', err.message);
    });    
  }

  return (
        <View style={styles.container} >
        <View style={styles.bor}>

        
          <Text style={styles.header}>Register a New Employee</Text>
          <Text style={styles.lbl}>Enter Full Name</Text>
          <TextInput name="fullname" placeholder="Full Name"
            value={name} onChangeText={text=>setName(text)}
          style={styles.txt}
         />
          <Text style={styles.lbl}>Enter Employee ID</Text>
          <TextInput placeholder="Employee ID" name="empid"
             value={empid} onChangeText={text=>setEmpid(text)}
          style={styles.txt}
         />
        
              <Text style={styles.lbl}>Enter Password</Text>
          <TextInput placeholder="enter password"  name="pass"
             value={password} onChangeText={text=>setPass(text)}
          style={styles.txt}
          secureTextEntry={true}
         />
                   <Text style={styles.lbl}>Re-Enter Password</Text>
          <TextInput secureTextEntry={true} name="repass" placeholder="Re-enter password"
    value={repass} onChangeText={text=>setrePass(text)}
          style={styles.txt}
         />
             <View style={styles.roww}>
         <TouchableOpacity style={styles.btn}  onPress={()=>validate()}>
         <MaterialIcons name="add-moderator" size={24} color="#192531" />
         
         {renderIf(!toggle)(
          <Text style={styles.btntxt}>Create New User</Text>)}
      {renderIf(toggle)(
      <Image style={{height:25, width:25}} source={require('../../assets/loading.gif')}/>)}
         
         </TouchableOpacity>
    
         <TouchableOpacity style={styles.btn}  onPress={goback}>
         <MaterialIcons name="cancel" size={24} color="#192531" />
         <Text style={styles.btntxt}>Cancel</Text>
         </TouchableOpacity>
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
    btntxt:{
    color:"#192531",
    marginLeft:4
    },
    btn: {
      margin:5,
      height:30,
      borderRadius:50,
      backfaceVisibility:'visible',
      flexDirection:'row',
      backgroundColor:'#2196F3',
      paddingHorizontal:10,
      alignItems:'center',
      justifyContent:'center',
    },
    roww:{
     
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
  

