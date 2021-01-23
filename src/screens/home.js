import React from 'react';
import { Text, View, Button ,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function Home() {
    
    const navigation = useNavigation();

    function gotodash() {
        navigation.navigate("Dashboard");
    }
    function navigateToList() {
        navigation.navigate("List");
    }
    
    
    return (
            
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn}>
     <Button title="buy product"
    onPress= {()=>navigateToList()}
    />
    </TouchableOpacity>
    <TouchableOpacity style={styles.btn}>
    <Button title="product avaibilty check"
    onPress= {()=>gotodash()}
    />
    </TouchableOpacity>
  
    
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
    btn: {
      margin:5,
      width:250,
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
      
  });

  

