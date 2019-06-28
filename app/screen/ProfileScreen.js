 import React from 'react';
 import {View, StyleSheet, Image, FlatList} from 'react-native'
 import {createBottomTabNavigator, createAppContainer, createStackNavigator} from "react-navigation";
 import MapScreen from './MapScreen'
 import RouteScreen from './RoutesScreen'
 import { Card, ListItem, Button, Avatar} from 'react-native-elements'
 import { Container, Header, Content,Tab,Tabs, Left, Right, Body, CardItem, Text} from 'native-base'
 import FileSystem from "react-native-filesystem";
 import Icon from 'react-native-vector-icons/FontAwesome'
 class ProfileScreen extends React.Component{



     constructor(props){
        super(props);
        this.state = {
            settingPress: false,
        }
    }


    onSettingsPress = () => {
         this.props.navigation.navigate('Routes')
        console.log("Navigated to routes")

    };

    getInitials(username){
        if(username===null || username === ''){
            return "MR"
        }
        var splitName = username.split('');
        var names=splitName
             var initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    }

     render(){
         const { navigation } = this.props;
         const username = navigation.getParam('username', 'Barack Obama')

         return(
             <Container>
             <Card>
                 <CardItem>
                     <Avatar rounded title={this.getInitials(username)} size="large"
                     onPress={() => console.log("ProfileAvatar Pressed")}
                     activeOpacity={0.7}/>
                    <Body>
                    <View style={styles.profileDescription}>
                  <Text>Profile description goes here Profile description goes here
                  Profile description goes here Profile description goes here
                      Profile description goes here</Text>
                    </View>
                    </Body>
                     <Button
                onPress={this.onSettingsPress}
                type={"outline"}
                icon={{
                    type: "font-awesome",
                    name: "cog",
                    size: 30,
                    color: "black",
                }}/>
                 </CardItem>
             </Card>
                 <Card>
                    <CardItem>
                        <Body>
                        <View>
                            <Text>stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff
                            stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff
                            stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff
                            stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff
                            </Text>
                        </View>
                        </Body>
                    </CardItem>
                 </Card>
             </Container>
         )
     }
 }
 const BottomTab = createBottomTabNavigator(
     {
         Profile:{
             screen: ProfileScreen,
             navigationOptions: {
                 tabBarLabel: "Profile",
                 tabBarIcon: ({tintColor}) => (
                     <Icon name ="user" size={20} color={"#7A8485"}/>
                 )
             }
         },
         Map: {
             screen: MapScreen,
             navigationOptions: {
                 tabBarLabel: "Map",
                 tabBarIcon: ({tintColor}) => (
                     <Icon name ="map" size={20} color={'#7A8485'}/>
                 )

             }
         },
         Routes: {
             screen: RouteScreen,
             navigationOptions:{
                 tabBarLabel: "Routes",
                 tabBarIcon: ({tintColor}) => (
                     <Icon name ="compass" size={20} color={'#7A8485'}/>
                 )
             }
         }
     },
 {
     order: ['Profile', 'Map'],
     tabBarOptions: {
         inactiveTintColor: '#AA5F55',
         activeTintColor: '#CA4635',
         style: {
             backgroundColor: 'white',
         }
     }
 }
 )



 const styles = StyleSheet.create({
     profileContainer: {
         alignItems:'center',
         flex:1,
         flexDirection: 'row',

     },
     profileImage: {
         alignItems: 'center',
         width: 100,
         height: 100,
         borderRadius: 25,
         marginTop: 100,
         backgroundColor: '#55a0aa'

     },
     profileDescription: {
         marginLeft: 25,
         justifyContent: "center",
         marginRight: 25,

     }

     }

 )

 const App = createAppContainer(BottomTab);
 export default App