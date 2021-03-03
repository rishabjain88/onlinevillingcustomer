import React from 'react';
import { Text, View, Button ,StyleSheet} from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign,FontAwesome,FontAwesome5 } from '@expo/vector-icons';
import { color } from 'react-native-reanimated';

export default function Home() {
    
    const navigation = useNavigation();
const route= useRoute();
    function gotodash() {
        navigation.navigate("Search Product");
    }
    function navigateToList() {
        navigation.navigate("Scan Products",{'Name':route.params.Name,'phone':route.params.phone});
    }
    function gotosignin() {
      navigation.goBack();
    }
  
 
    return (
     <>
     <View  style={styles.container1}>
       
     {/* <TouchableOpacity style={styles.roww}>      */}
      <FontAwesome name="user-circle-o" size={24} color="#2196F3" />
       <Text style={styles.header1} > Welcome {route.params.Name}</Text>
    {/* </TouchableOpacity > */}
    <TouchableOpacity  onPress= {()=>navigateToList()}>
    <FontAwesome5 name="cart-arrow-down" size={200} color="#2196F3" onPress= {()=>navigateToList()} />
    
    </TouchableOpacity>
        </View>
    <View style={styles.container}>
     <>
      <TouchableOpacity style={styles.btn} onPress={()=>navigateToList()}  >
       
     <Text style={styles.lbl} onPress={()=>navigateToList()} 
    
    >Buy Product</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.btn} onPress={()=>gotodash()}>
    <Text style={styles.lbl}  onPress={()=>gotodash()} >Product Availabilty Check</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate("History",{'Name':route.params.Name,'phone':route.params.phone});}}>
    <Text style={styles.lbl}  onPress={()=>{navigation.navigate("History",{'Name':route.params.Name,'phone':route.params.phone});} }>My History</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.btn} onPress={()=>gotosignin()}  >
    
         {/* <Button title="Logout"  onPress= {()=>Logout()}/>   */}
         <AntDesign name="logout"  size={20} color="white"   width={350} style={{marginVertical:8}} onPress={()=>gotosignin()}/>
         
         </TouchableOpacity>
    </>
    </View>
    </>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#192531',
      alignItems: 'center',
      backfaceVisibility:'visible',
      
      justifyContent: 'center',
    },
    container1:{
      //flex: 1,
      backgroundColor: '#192531',
      alignItems: 'center',
      backfaceVisibility:'visible',
      paddingTop:20,
      justifyContent: 'flex-start',

    },
    header:{
      marginBottom:20,
      color:"#fff",
      fontSize:20,
      marginBottom:20,
      borderWidth:1,
      borderRadius:50,
      borderColor:"#9CDCFE",
      backfaceVisibility:'visible',
      padding:10,  
      //textAlign:'center',
    },
    header1:{
     
      color:"#fff",
      fontSize:20,
      borderRadius:50,
      marginBottom:50,
      //color:"#fff",
      justifyContent:'flex-start',
      
    },
    lbl:{
      color:"#fff",
      fontSize:18,
      flexDirection:"row",
      height:30,
      marginVertical:2,
      textAlign:'center',
      marginTop:5,
      backfaceVisibility:'visible',
width:"100%"
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
      width:250,
      alignItems:"center",
      justifyContent:'center',
      backfaceVisibility:'visible',
      borderRadius:30,
      backgroundColor:'#2196F3',
    },
    roww:{
      //flex:0.5,
       flexDirection:"row",
       borderRadius:30,
       color:'#fff',
       alignItems:'flex-start'
      },
      bor:{
        borderWidth:1,
        borderRadius:15,
        padding:10,
        borderColor:"#2196F3",
        marginBottom:10,
        
      }
      
  });

  

