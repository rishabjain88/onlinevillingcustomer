import React,{Component,useState} from 'react';
import { StyleSheet, Text, View ,KeyboardAvoidingView, Platform,Dimensions, Button,TouchableOpacity, Alert, TextInput} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
// import Torch from 'react-native-torch';
const DEVICE_WIDTH =Dimensions.get('window').width;
const DEVICE_HEIGHT= Dimensions.get('window').height;
import { useNavigation,useRoute} from '@react-navigation/native';
import renderIf from 'render-if';


export default function(props) {
  const navigation = useNavigation();
const route=useRoute();

  return <List {...props}route={route} navigation={navigation} />;
}
// var items=[];

 class List extends React.Component{

  // navigateTocart=()=> {
  //   navigation.navigate("Home");
  // }
  
    state ={
      a:"",
      b:"",
      items:[],
      barcode:"",
     clicks:1,
     check:1,
     show: true,
     display:1,
     display2:1,
      CameraPermissionGranted: null,
    //   switchState:false,
     }
    IncrementItem = () => {
      this.setState({ clicks: this.state.clicks + 1 });
    }
    DecreaseItem = () => {
      if(this.state.clicks==1){

      }
      else{
      this.setState({ clicks: this.state.clicks - 1 });
      }
    }
    ToggleClick = () => {
      this.setState({ show: !this.state.show });
    }
  
    //navigation = useNavigation();
    async componentDidMount(){
      
      const {status} =await Permissions.askAsync(Permissions.CAMERA);
      this.setState({CameraPermissionGranted: status ==="granted"? true : false});
    }
    barCodeScanned = ({ data }) => {
   if(this.state.items.length==0)
   {
       
    fetch("http://aa29cf7dceb5.ngrok.io/scan", {
      method: "POST",
      headers:{
     
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        'Barcode':data
        
 })

      }).then(res => res.json())
      .then(res=>{
        this.setState({barcode:data });
      
//alert(res.pname+" price is "+res.price)
this.setState({a:res.pname });
this.setState({b:res.price});
this.setState({ check: 0 });
this.setState({ clicks: 1 });
this.setState({display:0});

      })
   } 
   else{ 
    if(this.state.items.some(items => items.Barcode === data))
    {alert("Product already Scanned!");
  return;}
    else{
    
      fetch("http://aa29cf7dceb5.ngrok.io/scan", {
        method: "POST",
        headers:{
       
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          'Barcode':data
          
   })
  
        }).then(res => res.json())
        .then(res=>{
          this.setState({barcode:data });
        

this.setState({a:res.pname });
this.setState({b:res.price});
this.setState({ check: 0 });
this.setState({ clicks: 1 });
this.setState({display:0});

        })
      
    
      // setBtnflag(true);
      // setBarflag(false);
     }
    }
    }
    addtocart =()=>{
      this.state.items.push({ 'Barcode':this.state.barcode,'ProductName':this.state.a,'Quantity':this.state.clicks,'TotalPrice':this.state.b * this.state.clicks});
      alert(JSON.stringify(this.state.items));
      //alert(this.state.a + " is added to your cart!")
      this.setState({display:1});
      this.setState({ check: 1 });
      this.setState({display2:0});
    }
  // torchon=()=>{
  //   Torch.switchState(true);
  // }
  // tourchoff=()=>{
  //   Torch.switchState(false);
  // }
    render(){
      
      //const accessToken = ACCESS_TOKEN;
      const { navigation } = this.props;
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
          //  <View style={{backgroundColor:"#192531"}}>
          <>
           <View style={styles.header1}>
            <Text style={styles.header1}>Scan BarCode of Products you want!</Text>
            </View>
            {/* <TouchableOpacity style={styles.btn} onPress={this.torchon}>
              <Text>on</Text>
               </TouchableOpacity> 
               <TouchableOpacity style={styles.btn} onPress={this.tourchoff}>
              <Text>off</Text>
               </TouchableOpacity>  */}
  
          <View style = {{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: '#192531',
          }}> 

                  <View style={StyleSheet.container}>
  
            {renderIf(this.state.check==0)(
              <>
              <View style={styles.label}>
               <Text style={styles.lbl} >Product:{this.state.a}</Text>
               <Text style={styles.lbl}  >Price :{this.state.b} Rs. </Text>
               </View>
            <View style={styles.oneline}>
            
            <TouchableOpacity  >
            <Button   title= "  -  "  onPress={this.DecreaseItem}/>
            </TouchableOpacity>
            
          <Text  style={styles.lbl}  >   Quantity:  {this.state.clicks}   </Text>
          
          <TouchableOpacity  >
            <Button title="  +  "onPress={this.IncrementItem}/>
            </TouchableOpacity>
          
          </View>
          <View style={styles.label}>
          <Text style={styles.lbl}> Total Price :{this.state.b*this.state.clicks} Rs. </Text></View>
          </>
            )}
          </View>
          {renderIf(this.state.check==1)(
            <BarCodeScanner
            onBarCodeScanned = {this.barCodeScanned}
            style = {{
              height: DEVICE_HEIGHT-300,
              width: DEVICE_WIDTH,
            }}
            ></BarCodeScanner>
          )}
           {renderIf(this.state.display==0)(
             <>
             
            <TouchableOpacity style={styles.btn}>
            <Button title="Add to Cart"  onPress={this.addtocart}/>
            </TouchableOpacity>
            </> )}

            {renderIf(this.state.display2==0)(
            <TouchableOpacity style={styles.btn}>
            <Button title="Finish Buying"  onPress={() => { this.props.navigation.navigate("Cart",{'items':this.state.items,'Name':this.props.route.params.Name,'phone':this.props.route.params.phone}) }}/>
            </TouchableOpacity>
            )}
           

          </View>
         {/* </View> */}
         </>
        );
  
          }
    }
  }
  const styles = StyleSheet.create({
    container: {
      //sflex: 1,
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
      justifyContent:'flex-start',
      alignItems:'flex-start',
      alignContent:'flex-start',
      
      
    
    },
    header1:{
      textAlign:'center',
      color:"#fff",
      fontSize:20,
      alignItems:'center',
      backgroundColor: '#192531',
      borderRadius:1,
      //borderColor:'#192531'
    },
   
    btn:{
        margin:5,
        width:200,
        borderRadius:10,
        
        
    },
    oneline:{
      marginTop:20,
       marginBottom:20,
      flexDirection:"row",

  alignItems:'center',
  justifyContent:'center'
    },
    lbl:{
      color:"#fff",
      fontSize:18,
      flexDirection:"row",
     

    },
    label:{
      justifyContent:'center',
      alignItems:'center',

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