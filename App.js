import React from 'react';
import {createBottomTabNavigator, createAppContainer, createStackNavigator} from "react-navigation";
import tab1 from './app/examples/TabsTesting';
import tab2 from './app/examples/TabsTesting2';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, View} from 'react-native';
import LoginScreen from './app/screen/LoginScreen'
import SignupScreen from './app/screen/SignupScreen'
import MapScreen from './app/screen/MapScreen'
import HTTPScreen from './app/examples/HTTPRequests'


const Nav = createStackNavigator(
    {
        Home: LoginScreen,
        Signup: SignupScreen,
        Map: MapScreen,
    }
)
const App = createAppContainer(Nav);

export default App



