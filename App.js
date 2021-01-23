import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View } from 'react-native';
import NewCustomor from './src/screens/NewCustmor';
import NewCustmor from './src/screens/NewCustmor';
import Login from './src/screens/Login';
import Navigator from './src/routes/navigator';
export default class App extends React.Component {

 

  
 render() {
   return (
     <>
   <Navigator/>
</>
  );
}



}
