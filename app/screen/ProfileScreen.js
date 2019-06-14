 import React from 'react';
 import {Text, View, StyleSheet, Image} from 'react-native'
 import {createBottomTabNavigator, createAppContainer} from "react-navigation";

 class ProfileScreen extends React.Component{
     render(){
         return(
             <View>
                 <Image
                     style={}
                     source={require('assets/profileEmpty.png')}/>

             </View>
         )
     }
 }
 const BottomTab = createBottomTabNavigator(
     {
         Profile:{
             screen: ProfileScreen
         }
     }
 )

 const styles = StyleSheet.create({
     profileContainer: {
         flex: 1,
         profil
     },
     profileImage: {
         alignItems: 'center'
     }

     }

 )