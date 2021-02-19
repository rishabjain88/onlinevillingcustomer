import * as React from 'react';
import { StyleSheet,Button, Text, View ,TextInput,KeyboardAvoidingView, Platform,TouchableHighlight, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';



export default function Cart(){
    const navigation = useNavigation();

    function navigateToList() {
        navigation.navigate("cart");
    }
    return (
        <KeyboardAvoidingView
        behavior={Platform.android === "android" ? "padding" : "height"}
        style={styles.container}
      >
        
            <View style={styles.container} >
            <View style={styles.bor}>
  <Text style={styles.lbl} >Product Name:  </Text>
  <Text style={styles.lbl}  >Price : Rs. </Text>
  <Text style={styles.lbl} >Quantity:  </Text>
  <View style={styles.btn}>
  <Button title="Remove Product" /> 
  </View>
</View>
            </View>
            </KeyboardAvoidingView>
          
           
             
            
      );
    }
    


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#192531',
      alignItems: 'stretch',
      paddingTop:6,
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
      margin:0,
      alignItems:'flex-end',
      
    },
    btn1: {
      marginBottom:10,
      margin:5,
      marginTop:5
    },
    
    roww:{
      flex:0.5,
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
