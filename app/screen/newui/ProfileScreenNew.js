import React from 'react';
import {View, Dimensions, Text, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, Button} from 'react-native'
import {Icon, Avatar} from 'react-native-elements'
import {createAppContainer} from "react-navigation";

const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');

export default class ProfileScreenNew extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username: '',
        }
    }

    goToMap(){
        this.props.navigation.navigate("Map")
    }

    goToCommunity(){
        //this.props.navigation.navigate("Community")
        //incomplete
    }

    goToMaintenance(){
        //incomplete
    }

    goToMarkers(){
        this.props.navigation.navigate("Markers")
    }

    goToRoutes(){
        this.props.navigation.navigate("Routes")
    }

    goToFav(){
        //incomplete
    }

    render(){
        const { navigation } = this.props;
         const username = navigation.getParam('username', 'Milo Rue')

        return(
            <View style={styles.appContainer}>
                <View style={styles.bars}>
                    <TouchableOpacity>
                    <Icon name={'bars'} type={"font-awesome"} color={"#ffffff"} size={30}/>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: "center"}}>
                    <Avatar
                    rounded={true}
                    title={"MR"}
                    size={"large"}/>
                    <View style={styles.avatarBox}>
                    <Text style={styles.avatarText}>{username}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center',
                marginTop: 40}}>
                <TouchableOpacity style={styles.outsideSelectBoxLeft}
                onPress={()=>{this.goToMap()}}>
                    <View style={styles.selectorBox}>
                        <Image source={require("C:\\Users\\Milo Rue\\MockupApp\\assets\\icons\\map.png")}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.outsideSelectBoxRight}
                onPress={()=>{this.goToCommunity()}}>
                    <View style={styles.selectorBox}>
                        <Image source={require("C:\\Users\\Milo Rue\\MockupApp\\assets\\icons\\community.png")}/>
                    </View>
                </TouchableOpacity>

                </View>

                <View style={{flexDirection: 'row', alignItems: 'center',
                marginTop: 20}}>
                <TouchableOpacity style={styles.outsideSelectBoxLeft}
                onPress={()=>{this.goToMaintenance()}}>
                    <View style={styles.selectorBox}>
                        <Image source={require("C:\\Users\\Milo Rue\\MockupApp\\assets\\icons\\wrench.png")}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.outsideSelectBoxRight}
                onPress={()=>{this.goToFav()}}>
                    <View style={styles.selectorBox}>
                        <Image source={require("C:\\Users\\Milo Rue\\MockupApp\\assets\\icons\\star.png")}/>
                    </View>
                </TouchableOpacity>

                </View>
                <View style={{flexDirection: 'row', alignItems: 'center',
                marginTop: 20}}>
                <TouchableOpacity style={styles.outsideSelectBoxLeft}
                onPress={()=>{this.goToRoutes()}}>
                    <View style={styles.selectorBox}>
                        <Image source={require("C:\\Users\\Milo Rue\\MockupApp\\assets\\icons\\route.png")}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.outsideSelectBoxRight}
                onPress={()=>{this.goToMarkers()}}>
                    <View style={styles.selectorBox}>
                        <Image source={require("C:\\Users\\Milo Rue\\MockupApp\\assets\\icons\\markers2.png")}/>
                    </View>
                </TouchableOpacity>

                </View>



            </View>
        )
    }
}

const styles = StyleSheet.create({
    appContainer: {
        flex:1,
        backgroundColor: "#96a6bc"
    },
    bars: {
        alignItems: "flex-start",
        paddingLeft: 10,
        paddingTop: 35,
    },
    avatarText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "bold"
    },
    avatarBox: {
        borderRadius: 25,
        width: WIDTH/3,
        alignItems: 'center',

    },
    selectorBox: {
        backgroundColor: "#5c768a",
        height: WIDTH/3.2,
        width: WIDTH/3.2,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'

    },
    outsideSelectBoxRight: {
        backgroundColor: "#5c768a",
        height: WIDTH/3,
        width: WIDTH/3,
        marginRight: WIDTH/6,
        marginLeft: 10,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: "center",
    },
    outsideSelectBoxLeft: {
        backgroundColor: "#5c768a",
        height: WIDTH/3,
        width: WIDTH/3,
        marginLeft: WIDTH/7,
        marginRight: 10,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: "center",
    },


})

// const tabNav = createMaterialBottomTabNavigator({
//     Profile: {screen: ProfileScreenNew, tabBarIcon: <Icon name={"user"} type={"font-awesome"} size={"medium"} color={"#FFFFFF"}/>},
//     Maps: {screen: MapScreenNew, tabBarIcon: <Icon name={"map-marker"} type={"font-awesome"} size={"medium"} color={"#FFFFFF"}/>},
//     Discover: {screen: DiscoverScreen},
//
// },{
//     initialRouteName: 'Profile',
//     activeColor: "#4b74b4",
//     inactiveColor: "#7a6a95",
//     barStyle: {backgroundColor: "#5c768a"},
// });