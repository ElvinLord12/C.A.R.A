 import React from 'react';
 import {Text, View, StyleSheet, Image} from 'react-native'
 import {createBottomTabNavigator, createAppContainer} from "react-navigation";

 class ProfileScreen extends React.Component{
     render(){
         return(
             <View style={styles.profileContainer}>
                     <Image
                    style={{width: 50, height: 50}}
                    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}/>
             </View>
         )
     }
 }
 const BottomTab = createBottomTabNavigator(
     {
         Profile:{
             screen: ProfileScreen,
         }
     }
 )

 const styles = StyleSheet.create({
     profileContainer: {
     },
     profileImage: {
     }

     }

 )

 const App = createAppContainer(BottomTab);
 export default App