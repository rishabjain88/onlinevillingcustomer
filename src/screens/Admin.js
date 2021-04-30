import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import Product from './Product';
import { SafeAreaView,ActivityIndicator, StyleSheet,TouchableOpacity, Text, View ,Image, Button,Alert, TextInput} from 'react-native';
import {Component} from 'react';
import { AntDesign,MaterialIcons,MaterialCommunityIcons,FontAwesome  ,Ionicons ,Feather } from '@expo/vector-icons'; 
import renderIf from 'render-if';
import { useNavigation } from '@react-navigation/native';


export default function AdminLogin() {
  const navigation = useNavigation();
  const [empid,setEmpid] = useState("")
  const [password,setPass] = useState("")
  const [flag,setflag]= useState(false)
  const pressHandler=() => {
    navigation.navigate("Product");
  
  }
  const logincheck=()=>{

    setflag(true);
    fetch("https://onlinebillingapi.herokuapp.com/login",{

      method:"POST",
      headers:{
       
        'Content-Type':'application/json'
      },  
        body:JSON.stringify({
        
        'Password': password,
        'EmployeeId': empid,
       })
      
    })
    .then(res=>res.json())
    .then((res)=>{
      
      if( res.success === true)
      {
        
        navigation.navigate("Product",{"Name":res.user,'empid':res.empid,'role':res.role,'barfromstock':null})
        
      }
      else{
        alert(res.message)
    
      } 
        setflag(false);
    })
  }
  return (
     
    <View style={styles.container}>
    <View style={styles.bor}>
<View style={styles.row2}>
    <MaterialIcons name="admin-panel-settings" size={26 } color="#2196F3" />
  <Text style={styles.lbl}>Admin Login</Text>
      </View>
      <View style={styles.roww}>
      <AntDesign style={styles.ico} name="idcard" size={24} color="white" />
      <Text style={styles.lbl} > Employee Id</Text>
  
</View>
      <TextInput style={styles.txt} value={empid} onChangeText={text=>setEmpid(text)}
       ></TextInput>

<View style={styles.roww}>
    <MaterialCommunityIcons name="form-textbox-password" size={24} color="white" />
      <Text style={styles.lbl}> Password</Text>
      </View>
      <TextInput style={styles.txt} secureTextEntry={true} value={password} onChangeText={text=>setPass(text)}></TextInput>
      <TouchableOpacity style={styles.btn} onPress={logincheck}>
      {renderIf(!flag)(
        <AntDesign style={{marginVertical:5}} name="login" size={24} color="#192531" />)}
      {renderIf(flag)(
      <Image style={{height:37, width:37}} source={require('../../assets/loading.gif')}/>)}
       {/* <Button title="LOGIN"  ></Button> */}
       </TouchableOpacity>
       <TouchableOpacity style={styles.btn} onPress={()=>navigation.pop()}>
         <Ionicons name="arrow-back-circle-outline" size={31} color="#192531" /> 
         </TouchableOpacity>
     
      <StatusBar style="auto" />
      </View>
   </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    
    borderWidth:2,
    textAlign:'center',
    flex: 1,
    
    backgroundColor: '#192531',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ico:{
    justifyContent:'flex-end'
  },
  header:{
    color:"#fff",
    fontSize:25,
    flexDirection:"row",

  },
  lbl:{
    color:"#fff",
    fontSize:18,
    flexDirection:"row",
  },
  txt: {
    
    height: 30,
    width :210,
    marginBottom:5,
    fontSize:18,
     color:"#fff",
      borderColor: 'gray',
      flexDirection:"row",
       borderWidth: 2,
       textAlign:'right',
       borderRadius:50,
       padding:5,
     
  },
  btn: {
  marginTop:10,
    flexDirection:'row',
    backgroundColor:'#2196F3',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50,
    width:210
  
    },
  roww:{
   
     flexDirection:"row"
    },
row2:{
flexDirection:'row',
borderRadius:30,
borderWidth:1,
borderColor:'#2196F3',
alignItems:'center',
justifyContent:'center',
marginBottom:8,
paddingVertical:5
},
  bor:{
    borderWidth:1,
    borderRadius:15,
    padding:10,
    borderColor:"#2196F3",
    color:"#fff",
    
  }
});
