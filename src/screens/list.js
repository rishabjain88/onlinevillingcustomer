import React,{Component} from 'react';
import { StyleSheet, Text, View ,KeyboardAvoidingView, Platform,Dimensions, Button,TouchableOpacity, Alert, TextInput} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

const DEVICE_WIDTH =Dimensions.get('window').width;
const DEVICE_HEIGHT= Dimensions.get('window').height;
import { useNavigation } from '@react-navigation/native';

 
 
export default class List extends React.Component{
    state ={
     
      CameraPermissionGranted: null,
    }
    // navigation = useNavigation();
    async componentDidMount(){
      const {status} =await Permissions.askAsync(Permissions.CAMERA);
      this.setState({CameraPermissionGranted: status ==="granted"? true : false});
    }
    barCodeScanned = ({ data }) => {
      // navigation.navigate("Cart");
      alert(data);
      
    
    }
  

    render(){
      const {CameraPermissionGranted} = this.state;
      if(CameraPermissionGranted === null){
        return(
          
    
    
          <View style={styles.container}>
            <Text>Please grant Camera Permission</Text>
          </View>
        );
      }
      if(CameraPermissionGranted === false){
        return(
          <View style={styles.container}>
            <Text>Camera Permission Denied</Text>
          </View>
         
        );
      }
      if(CameraPermissionGranted === true){
        return(
         
          <View style = {{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: '#192531',
          }}> 
                  <View>
            <Text style={styles.header}>Scan BarCode of Products you want!</Text>
            <View style={styles.oneline}>
          <Text  style={styles.lbl}>Purchase Quantity</Text>
          <TextInput placeholder="Quantity" id="qty" style={styles.txt}></TextInput>
          </View>
          </View>
            <BarCodeScanner
            onBarCodeScanned = {this.barCodeScanned}
            style = {{
              height: DEVICE_HEIGHT-300,
              width: DEVICE_WIDTH,
            }}
            ></BarCodeScanner>
           
            <TouchableOpacity style={styles.btn}>
            <Button title="Add to Cart" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
            <Button title="Finish Buying"/>
            </TouchableOpacity>
          </View>
          
         
  
        );
  
      }
  
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header:{
      color:"#fff",
      fontSize:22,
      marginBottom:20,
      borderWidth:1,
      borderRadius:12,
      borderColor:"#9CDCFE",
      padding:5,  
      textAlign:'center',
    },
    btn:{
        margin:5,
        width:200,
        borderRadius:10,
        
        
    },
    oneline:{
      marginTop:20,
      flexDirection:"row",
  
    },
    lbl:{
      color:"#fff",
      fontSize:18,
      flexDirection:"row",
    },
    txt: {
      
      height: 30,
      width :150,
      marginBottom:5,
      fontSize:18,
       color:"#fff",
        borderColor: 'gray',
        flexDirection:"row",
         borderWidth: 2,
         textAlign:'center',
         borderRadius:10,
         padding:5,
       
    },
  });