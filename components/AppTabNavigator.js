import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import ReadStoryScreen from '../screens/ReadStoryScreen';
import WriteStoryScreen from '../screens/WriteStoryScreen';

export const AppTabNavigator= createBottomTabNavigator({
ReadStory:{
 screen: ReadStoryScreen,
},
 WriteStory:{
     screen:WriteStoryScreen,
}
})