import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,Button,TouchableOpacity,Image } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import  { useState } from 'react';
import renderIf from 'render-if';
import react from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';


var dataSource=[];
const Dashboard = () => {
    const [searchQuery, setSearchQuery]=useState("");
    const [aval, setaval]=useState("");
    const [flag,setFlag]=useState(false);
    const [flag3,setFlag3]=useState(false);
    const [toggle,setToggle]=useState(false);
    const  onChangeSearch=()=> {
      setFlag(false);
      setToggle(true);
      //setFlag3(true);
      dataSource=[];
        fetch("http://aa29cf7dceb5.ngrok.io/search", {
          method: "POST",
          headers:{
            //'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            'ProductName':searchQuery
            
     })
    
          }).then(data =>data.json() )
          .then(data=>{
   
    if(data){
    
       
      

        for( var i in data ){
           
           
       
        dataSource.push({'Barcode':data[i].Barcode,'ProductName':data[i].ProductName,'Price':data[i].Price,'Quantity':data[i].Quantity,'aval':aval})
        }
 setFlag(true)
setFlag3(false);
      }
      else{
      
        setFlag(false)
        setFlag3(true)
      }
setToggle(false);
          }
          
         ).catch(err=>{
          console.log(err)
      })
       

        }
        
        const Item = ({Barcode,ProductName,Price,Quantity,aval}) => (
           <TouchableOpacity>
            <View style={styles.item}>
          
              <Text style={styles.title}>Product Name:{ProductName}</Text>
              <Text style={styles.title}>Price:{Price}.Rs</Text>
              <Text style={styles.title}>{Quantity} left in stock! </Text>
            </View>
            </TouchableOpacity>
           
          );
  

    
   
  const renderItem = ({ item }) => (
    <>
        
    <Item Barcode={item.Barcode} ProductName={item.ProductName}  Price={item.Price} Quantity={item.Quantity} aval={item.aval}   />
    
  </>
  )
  return (

    <View style={styles.container}>
    
     <Searchbar style={{borderRadius:2}}
       placeholder="Search"
       onChangeText={text => setSearchQuery(text)}

         value={searchQuery}
 />
  <TouchableOpacity style={styles.btn1} onPress={()=>onChangeSearch()} >
           {renderIf(!toggle)(<MaterialCommunityIcons name="search-web" size={40} color="white" />)}
           {renderIf(toggle)( <Image style={{width:30,height:30}} source={require('../../assets/loading4.gif')}/>)}
   
         {/* <Button title="search"  onPress= {()=>Search()}/>   */}
         </TouchableOpacity>
 {renderIf(flag)(
  <>
   <Text style={styles.res}> {dataSource.length} Result Found</Text>
  <FlatList
    data={dataSource}
    renderItem={renderItem}
keyExtractor={(item)=> item.Barcode}

    

    
  />
  </>
  )}

 {renderIf(flag3)(
   
<View  style={styles.header}>
  <Text style={styles.lbl} >We have nothing like  </Text>
  
  
</View>
       )} 
     
 </View>

  );
}
  


 
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor:"#192531",
  },
  item: {
    backgroundColor: '#2196F3',
    
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:10,
  },
  title: {
    fontSize: 19,
    color:'#fff'
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
  forg:{
    
      height: 30,
        width :300,
        fontSize:15,
       color:"#2196F3",
         margin:0,
        textAlign:'center',
        textDecorationLine:'underline',
  },
  res:{
    color:"#2196F3",
     fontSize:20,
     marginLeft:15,
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
    margin:0,
    
  },
  btn1: {
    marginBottom:10,
    margin:5,
    marginTop:5,
    alignItems:'center',
    justifyContent:'center',
    height:40,
    borderRadius:50,
    backfaceVisibility:'visible',
    backgroundColor:'#2196F3'

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
}

);
export default Dashboard;


