
import { Text, View,Button,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Searchbar } from 'react-native-paper';


export default function Dashboard() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
     <>
    <Searchbar style={{borderRadius:2}}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
     <View style={styles.container}>

    </View>
    </>
  );
};
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

  

