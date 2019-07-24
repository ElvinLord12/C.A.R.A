import React from 'react';
 import {View, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity, Switch, ScrollView} from 'react-native'
 import {createBottomTabNavigator, createAppContainer, createStackNavigator} from "react-navigation";
 import { Card, Header, Button, Avatar, Icon, ListItem} from 'react-native-elements'
 import { Container, Content,Tab,Tabs, Left, Right, Body, CardItem, Text} from 'native-base'
import MapScreen from "./MapScreen";


const {width: WIDTH} = Dimensions.get('window');
 const mapList = [
     {
         name: 'View Map',
         icon: 'map',
         pageRoute: "Map",
     },
     {
         name: 'Community',
         icon: 'users',
         pageRoute: "Community",
     }
 ];
const profileList = [
    {
        name: 'Create a new Route',
        subtitle: '',
        icon: 'arrows-alt',
        pageRoute: "Markers",
    },
    {   name: 'Mark an Accessibility Feature',
        subtitle: '',
        icon: 'wheelchair',
        pageRoute: "Markers",},

    {   name: 'Issue a Maintenance Request',
        subtitle: '',
        icon: 'wrench',
        pageRoute: 'Maintenance'}

];
const favoriteList = [
    {
        name: 'Favorite Routes',
        subtitle: '',
        icon: 'star',
        pageRoute: "Routes"
    }
];
class ProfileScreenV2 extends React.Component{

     constructor(props){
         super(props);
         this.state = {
             accessSwitch: false,
             settingsPress: false,
             loggedIn: true,
         }

     }


      getInitials(username){
        if(username===null || username === ''){
            return "MR"
        }
        var splitName = username.split('');
        var names=splitName;
             var initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };

     onPress = (screen) => {
        console.log(screen, " Pressed")
         this.props.navigation.navigate(screen)
    };

    onLogout = () => {
       console.log("Logout Press")
        this.props.navigation.navigate("Home")
    };

    onSettingsPress = () => {
         console.log("Settings Press")
    };

    toggleDisableSwitch = (value) => {
        this.setState({accessSwitch: value})
        console.log('DisabledSwitch is: ' + value)
    }

    render(){
         const { navigation } = this.props;
         const username = navigation.getParam('username', 'Milo Rue')

        return(
            <Container>
                <Header backgroundColor={"#003B71"}
                leftComponent={<Icon name={"arrow-left"} type={"font-awesome"} color={"#ffffff"} onPress={this.onLogout}/>}
                centerComponent={{text: 'Profile', style:{color: '#ffffff',fontSize: 20}}}
                rightComponent={<Icon name={"cog"} type={"font-awesome"} color={"#ffffff"} onPress={this.onSettingsPress}/>}/>
                <ScrollView>
                <Card containerStyle={styles.headerContainer}>
                    <CardItem style={styles.avatarContainer}>
                        <Avatar rounded title={this.getInitials(username)} size="large"
                     onPress={() => console.log("ProfileAvatar Pressed")}
                     activeOpacity={0.7}/>
                    </CardItem>
                </Card>
                <View style={styles.switchContainer}>
                        <Switch
                    onValueChange = {this.toggleDisableSwitch}
                    value = {this.state.accessSwitch}/>
                    <Text style={styles.switchText}>Enable Accessible Buttons</Text>
                </View>
                <View containerStyle={styles.contentContainer}>
                    <Card>
                        {mapList.map((item,i) =>(
                        <ListItem
                            onPress={()=>this.onPress(item.pageRoute)}
                            key={i}
                        title={<Text style={styles.listText}>{item.name}</Text>}
                        rightIcon={<Icon name={'chevron-right'} type={"font-awesome"}/>}
                        leftIcon={<Icon name={item.icon} type={"font-awesome"}/>} bottomDivider={true} topDivider={true}
                        containerStyle={{marginBottom: 20}}>
                        </ListItem>))}
                    </Card>
                    <Card containerStyle={styles.spacer}/>
                    <Card containerStyle={styles.listContainer}>
                        {profileList.map((item,i) =>(
                        <ListItem
                            onPress={()=>this.onPress(item.pageRoute)}
                            key={i}
                        title={<Text style={styles.listText}>{item.name}</Text>}
                        rightIcon={<Icon name={'plus'} type={"font-awesome"}/>}
                        leftIcon={<Icon name={item.icon} type={"font-awesome"}/>} bottomDivider={true} topDivider={true}
                        containerStyle={{marginBottom: 20}}>
                        </ListItem>
                    ))}
                    </Card>
                    <Card containerStyle={styles.spacer}/>
                    <Card containerStyle={styles.listContainer}>
                        {favoriteList.map((item,i)=>(
                            <ListItem
                            onPress={()=>this.onPress(item.pageRoute)}
                            key={i}
                            title={<Text style={styles.listText}>{item.name}</Text>}
                            leftIcon={<Icon name={item.icon} type={'font-awesome'}/>}
                            rightIcon={<Icon name={"chevron-right"} type={"font-awesome"}/>}
                            bottomDivider={true}
                            topDivider={true}
                            containerStyle={{marginBottom: 20}}>

                            </ListItem>
                        ))}
                    </Card>
                     <Card containerStyle={styles.spacer}/>

                </View>
                </ScrollView>
            </Container>
        )

    }





}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
    },
    headerContainer: {
        alignItems: 'center',
        backgroundColor: '#003B71'
    },
    avatarContainer: {
        backgroundColor: "#003B71",
        alignItems: 'center',
    },
    listText: {
        fontSize: 20,
    },
    contentContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    listContainer: {
        marginHorizontal: 20,
    },
    switchContainer: {
        alignItems: 'center',
    },
    switchText: {
            fontSize: 16,
            textAlign: 'center',
            color: "#000000"
        },
    spacer: {
            marginHorizontal: 20,
        flexDirection: "row",
        backgroundColor: "#003B71"
    }
})

const BottomTab = createBottomTabNavigator(
    {
        Profile:{
            screen: ProfileScreenV2,
            navigationOptions: {
                tabBarLabel: "Profile",
                tabBarIcon: ({tintColor}) => (
                    <Icon name={"user"} type={"font-awesome"} size={30} color={"#7A8485"}/>
                )
            }
        },
        Map: {
            screen: MapScreen,
            navigationOptions: {
                tabBarLabel: "Map",
                tabBarIcon: ({tintColor}) => (
                    <Icon name={"map"} type={"font-awesome"} size={30} color={"#7A8485"}/>
                )
            }
        }
    },
)

const Application = createAppContainer(BottomTab)
export default Application