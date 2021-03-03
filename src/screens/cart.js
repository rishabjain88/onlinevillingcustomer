import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,Button } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useNavigation,useFocusEffect ,useRoute} from '@react-navigation/native';
import  { useState } from 'react';
import renderIf from 'render-if';
import react from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { timing } from 'react-native-reanimated';


var dataSource2=[];
var dataSource=[];
var total=0;
var date = new Date();
const Cart = () => {
  
  const navigation = useNavigation();

    function navigateToList() {
       
    }
  
  //const navigation = useNavigation();
    const [searchQuery, setSearchQuery]=useState("");
    const [aval, setaval]=useState("");
    // const [total, settotal]=useState(0);
    const [refres, setrefres] = useState(false);
    const [flag,setFlag]=useState(true);
    const [flag3,setFlag3]=useState(false);
    const route = useRoute();
   dataSource=route.params.items;
   
total=0;
 for(var i=0;i<dataSource.length;i++)
 {
      total=total+dataSource[i].TotalPrice;
 }

const remov =(Barcode)=> {

 dataSource.filter((val,i)=> {
 
  if(val.Barcode === Barcode)
  {
    var a= dataSource.indexOf(val);
     dataSource.splice(a,1);
  
  }

})


console.log(dataSource)
handlerefresh();

}
        const Item = ({Barcode,ProductName,TotalPrice,Quantity}) => (
           <View style={styles.item}>
            
          
              <Text style={styles.title}>Product Name:{ProductName}</Text>
              <Text style={styles.title}>Quantity: {Quantity}</Text>
              <View style={styles.roww}>
              <Text style={styles.title}>Total Price: {TotalPrice} Rs.</Text>
              <TouchableOpacity  onPress={()=>remov(Barcode)} style={styles.btn} >
            <Text style={styles.mutton} >Remove</Text>
            
            </TouchableOpacity>
            </View>
            
      </View>
           
          );
  
          const totalfunc=()=>{
          settotal(0);
          for(var i in dataSource)
          {
            settotal(total+dataSource[i].TotalPrice);
          }
return total;
          }
    const handlerefresh=()=>{
      
      setTimeout(function(){ 
        setrefres(true);
      }, 500);
      setrefres(false)
    }
   
  const renderItem = ({ item }) => (
    <>
        
    <Item Barcode={item.Barcode} ProductName={item.ProductName}  TotalPrice={item.TotalPrice} Quantity={item.Quantity}  />
    
  </>
  )
  return (
<>
    <View style={styles.container}>
<View style={styles.up}>
 {renderIf(flag)(
 
  
  <FlatList style={styles.scrol}
    data={dataSource}
    renderItem={renderItem}
keyExtractor={(item)=> item.Barcode}
extraData={Item}

refreshing={true}
//onRefresh={handlerefresh}
    

    
  />
 
  )}
</View>
    
<View style={styles.down}><Text style={styles.lbl}>Total Payment: {total} Rs.</Text>
<TouchableOpacity style={styles.btn1} onPress={()=> navigation.navigate("Payment",{'dataSource':dataSource,'total':total,'Name':route.params.Name,'phone':route.params.phone})}><Button title="Proceed to Pay"/></TouchableOpacity>

</View>
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
    mutton:{
      backgroundColor:"#df4759",
      borderRadius:10,
      fontSize:15,
      padding:5,
    },
    item: {
      backgroundColor: '#2196F3',
      elevation:10,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius:10,
    },
    title: {
      fontSize: 19,
      color:'#fff'
    },
    scrol:
    {height:"70%"},
    lbl:{
      color:"#fff",
      fontSize:18,
      flexDirection:"row",

    },
     res:{
    color:"#2196F3",
     fontSize:20,
     marginLeft:15,

  },
  up:{
    height:"90%",
  },
  down:{
    height:60,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center'
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
         borderRadius:10,
         padding:5,
         marginBottom:5,
       
    },
    btn: {
     marginLeft:50,
     backfaceVisibility:'hidden'
      
    },
    btn1: {
      // marginBottom:10,
      // margin:5,
      // marginTop:5,
     
    },
    
    roww:{
     
       flexDirection:"row"
      },
      bor:{
        borderWidth:1,
        borderRadius:15,
        padding:10,
       // borderColor:"#2196F3",
        marginBottom:10,
        backgroundColor:"#2196F3",
        borderColor:"#2196F3", 
        
      }
      
  });
export default Cart