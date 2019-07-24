import React from 'react';
import {createBottomTabNavigator, createAppContainer, createStackNavigator} from "react-navigation";
import LoginScreen from './app/screen/LoginScreen'
import SignupScreen from './app/screen/SignupScreen'
import MapScreen from './app/screen/MapScreen'
// import HTTPScreen from './app/examples/HTTPRequests'
import LineCreator from './app/examples/LineCreator'
// import MarkerArray from './app/examples/MarkerArray'
import Drag from './app/examples/DraggableMarkers'
import DrawerEx from './app/examples/DrawerExample'
import ProfileScreen from './app/screen/ProfileScreen'
import RoutesScreen from './app/screen/RoutesScreen'
import MarkerScreen from './app/screen/AddMarkerScreen'
import TestProfile from './app/screen/ProfileScreenV2'
import LoginV2 from './app/screen/newui/LoginScreenV2'
import SignupV2 from './app/screen/newui/SignupScreenV2'
import ProfileV2 from './app/screen/newui/ProfileScreenNew'
import MapV2 from './app/screen/newui/MapScreenV2'


const Nav = createStackNavigator(
    {
        Home: {
            screen: ProfileV2,
            navigationOptions: {
                header: null,
            }
        },
        Signup: {
            screen: SignupV2,
            navigationOptions: {
                header: null,
            }
        },
        Map: {
            screen: MapV2,
            navigationOptions: {
                header: null,
            }

        },
        Profile: {
            screen: ProfileV2,
            navigationOptions: {
                header: null,
            }
        },
        Routes: {
             screen: LineCreator,
             navigationOptions: {
                 header: null
             }
         },
        Markers: {
            screen: MarkerScreen,
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

