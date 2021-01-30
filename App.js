import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import {  AppTabNavigator} from './components/AppTabNavigator';

export default function App() {
  return (
      <AppContainer/> 
  );
}


const SwitchNavigator = createSwitchNavigator({
   LoginScreen:{screen: LoginScreen},
   BottomTab:{screen: AppTabNavigator}
 })

 const AppContainer =  createAppContainer(SwitchNavigator)
  
 