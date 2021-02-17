
import { Text, View,Button,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import  { useState } from 'react';
import renderIf from 'render-if';

export default function Dashboard() {
  const [flag,setFlag]=useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pname, setpname] = useState("")
  const [price, setprice] = useState("")
  const [aval, setaval] = useState("")
  const [flag2, setflag2] = useState("")
  // const = query => setSearchQuery(search_data());
  const  onChangeSearch=()=> {
   
   
   
    fetch("http://localhost:3000/search", {
      method: "POST",
      headers:{
     
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        'ProductName':searchQuery
        
 })

      }).then(data => data.json())
      .then(data=>{
// res=JSON.parse(res)
if(data.success == true){
  // alert(data.pname);
        setpname(data.pname)
       setprice(data.price)
        setaval()
        if(data.quan>0)
        {setflag2("Available")}
        else
        {setflag2("Not Available")}
        setFlag(true);
}
      })
    }

  return (

     <>
      <Searchbar style={{borderRadius:2}}
        placeholder="Search"
        onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
  />
  <Button title='serch' onPress={onChangeSearch}></Button>
    
     <View style={styles.container}>
       {renderIf(flag)(
<View style={styles.bor}>
  <Text style={styles.lbl} >Product Name:{pname} </Text>
  <Text style={styles.lbl}  >Price:{price} </Text>
  <Text style={styles.lbl} >{flag2}</Text>
  
</View>
       )}
{/* 
<View style={styles.bor}>
  <Text style={styles.lbl}>Product Name: Dettol</Text>
  <Text style={styles.lbl}>Price: 100 Rs</Text>
  <Text style={styles.lbl}>Not Available</Text>
  
</View> */}
    </View>
    </>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#192531',
      alignItems: 'stretch',
      
      justifyContent: 'flex-start',
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
        backgroundColor:"#2196F3",
        borderColor:"#2196F3",
        marginTop:8,
        marginHorizontal:5,
        shadowColor: "red",

        
      }
      
  });



