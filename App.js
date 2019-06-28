import React from 'react';
import {createBottomTabNavigator, createAppContainer, createStackNavigator} from "react-navigation";
import LoginScreen from './app/screen/LoginScreen'
import SignupScreen from './app/screen/SignupScreen'
import MapScreen from './app/screen/MapScreen'
import HTTPScreen from './app/examples/HTTPRequests'
import LineCreator from './app/examples/LineCreator'
import MarkerArray from './app/examples/MarkerArray'
import ProfileScreen from './app/screen/ProfileScreen'
import RoutesScreen from './app/screen/RoutesScreen'
import TestLogin from './app/examples/LoginScreenExample'


const Nav = createStackNavigator(
    {
        Home: {
            screen: MapScreen,
            navigationOptions: {
                header: null,
            }
        },
        Signup: {
            screen: SignupScreen,
            navigationOptions: {
                header: null,
            }
        },
        Map: {
            screen: MapScreen,
            navigationOptions: {
                header: null,
            }

        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                header: null,
            }
        },
        Routes: {
             screen: RoutesScreen,
             navigationOptions: {
                 header: null
             }
         }
    },
    {
        headerMode: 'screen'
    }
)
const App = createAppContainer(Nav);

export default App

