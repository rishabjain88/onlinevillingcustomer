import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import  Home from '../screens/home'
import  NewCustomer from '../screens/NewCustmor'
import  Login from '../screens/Login'
import  List from '../screens/list'
import  Dashboard from '../screens/dashboard'
import Cart from '../screens/cart'



const AppStack = createStackNavigator();
export default function Navigator(){

    return (
    <NavigationContainer>
    <AppStack.Navigator screenOptions={{ headerShown: true }} >
    <AppStack.Screen name="Login" component={Login} />
    <AppStack.Screen name="NewCustomer" component={NewCustomer} />
    <AppStack.Screen name="Home" component={Home} />
    <AppStack.Screen name="List" component={List} />
    <AppStack.Screen name="Dashboard" component={Dashboard} />
    {/* <AppStack.Screen name="Cart" component={Cart} /> */}
    </AppStack.Navigator>

    </NavigationContainer>
    );
}