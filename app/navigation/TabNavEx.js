import React from 'react';
import {createBottomTabNavigator, createAppContainer} from "react-navigation";
import tab1 from './app/examples/TabsTesting';
import tab2 from './app/examples/TabsTesting2';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, View} from 'react-native';


const Nav = createBottomTabNavigator({
    Home:{
        screen: tab1,
        navigationOptions: {
            tabBarLabel: "Home",
            tabBarIcon: ({tintColor}) => (
                <Icon name="home" size={30} color="#900"/>
            )
        }
    },
    Settings:{
        screen: tab2,
        navigationOptions:{
            tabBarLabel: "Settings",
            tabBarIcon: ({tintColor}) => (
                <Icon name="cogs" size={30} color="#900"/>
            )
        }
    },
},
    {
        order: ['Home', 'Settings'],
        tabBarOptions: {
            activeTintColor: '#D4AF37',
            inactiveTintColor: 'gray',
            style:{
                backgroundColor: 'white',
            }
        },
    },
    );

const App = createAppContainer(Nav);

export default App