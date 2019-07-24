import React from 'react';
import {mapping, dark as darkTheme} from '@eva-design/eva';
import {View, Dimensions, Text, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity} from 'react-native'
import {TabView, Tab, TabViewProps, ApplicationProvider} from "react-native-ui-kitten";
import LinearGradient from "expo/build/effects/LinearGradient";
import SplashScreen from 'react-native-splash-screen'
import {Avatar, Card, Icon, ButtonGroup} from 'react-native-elements'

const {width: WIDTH} = Dimensions.get('window');

export default class LoginScreenV2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            username: '',
            password: '',
            confirmation: '',
            fullname: '',
            email: '',

        }
    }

    onCreateAcctPress(){

        fetch('http://ic-research.eastus.cloudapp.azure.com/~mrue/user_registration.php', {
            method: 'POST',
            header:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:this.state.username,
                password:this.state.password,
                email:this.state.email,
                fullname:this.state.fullname,
            })
        })
            .then((response) => response.json())
            .then((responseJson) =>{
                alert(responseJson)})
                .catch((error)=>{
                    console.error(error);
                })
    }

    goToSignup(){
        console.log("Signup press")
        this.props.navigation.navigate("Signup")
    }

    goToLogin(){
        console.log("Login press")
        this.props.navigation.navigate("Home")
    }

    render(){
        return(
            <ImageBackground
                source={require("C:\\Users\\Milo Rue\\MockupApp\\assets\\gradient.png")}
                style={{width: '100%',height: '100%',alignItems: 'center'}}>
                <View style={styles.loginTop}>
                <Image source={require("C:\\Users\\Milo Rue\\MockupApp\\assets\\logo3.png")}/>
                </View>
                <View style={styles.loginView}>
                    <View style={{width: WIDTH/1.4, paddingLeft: WIDTH/15, paddingRight: WIDTH/15, alignItems: 'center'}}>
                        <View style = {{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.switchButtonLeft}
                    onPress={()=>{this.goToLogin()}}>
                        <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>
                        <TouchableOpacity style={styles.switchButtonRight}
                        onPress={()=>{this.goToSignup()}}>
                        <Text style={styles.text}>Signup</Text>
                    </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.loginInputView}>
                        <View style={{flexDirection: "row"}}>
                        <TextInput style={styles.inputs}
                        placeholder={'Full Name'}
                        onChangeText={(fullname) => this.setState({fullname})}/>
                        </View>
                        <View style={{flexDirection: "row"}}>
                        <TextInput style={styles.inputs}
                        placeholder={'Email Address'}
                        onChangeText={(email) => this.setState({email})}/>
                        </View>
                        <View style={{flexDirection: "row"}}>
                        <TextInput style={styles.inputs}
                        placeholder={'Username'}
                        onChangeText={(username) => this.setState({username})}/>
                        </View>
                        <View style={{flexDirection: "row"}}>
                        <TextInput style={styles.inputs}
                        placeholder={'Password'}
                        onChangeText={(password) => this.setState({password})}/>
                        </View>
                        <View style={{flexDirection: "row"}}>
                        <TextInput style={styles.inputs}
                        placeholder={'Confirm Password'}
                        onChangeText={(confirmation) => this.setState({confirmation})}/>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.confirmButton}
                    onPress={()=>{this.onCreateAcctPress()}}>
                        <Text style={styles.text}>Confirm</Text>
                    </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ImageBackground>
        )

    }
}

const styles= StyleSheet.create({
    background: {
        flex: 1,
    },
    text: {
        color: "#ffffff",
        fontWeight: "bold",
    },
    text2: {
        color: "#FFFFFF",
        fontSize: 25,
        width: WIDTH/2,
        fontWeight: 'bold',
    },
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFFFFF"

    },
    uibox: {
        borderLeftWidth: 1,
        borderLeftColor: "#FFFFFF",
        paddingLeft: 15,
    },
    loginInputView: {
        width: WIDTH/1.4,
        alignItems: 'center',
        marginBottom: 15,
        height: WIDTH/1.4,
        backgroundColor: "#343535",
        borderRadius: 25,
    },
    loginView: {
        marginTop: WIDTH/5,
        width: WIDTH/1.4,
        height: WIDTH,
        backgroundColor: "#454544",
        borderRadius: 25,
    },
    loginTop: {
        marginTop: 40,

    },
    inputs:{
        alignItems: 'center',
        height: 35,
        borderRadius: 25,
        fontSize: 12,
        width: WIDTH/1.6,
        backgroundColor: "#787788",
        marginTop: 20,
        paddingLeft: 10,
    },
    inputIcon:{
        position: 'absolute',
        left: 37,
        bottom: 8,
    },
    loginButtons: {
        borderRadius: 25,
        backgroundColor: "#454544",
        height: 35,
        color: "#ffffff"

    },
    confirmButton: {
        marginTop: 35,
        height: 35,
        width: WIDTH/2.3,
        backgroundColor: "#5c768a",
        alignItems: 'center',
        borderRadius: 25,
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#2a4860'
    },
    switchButtonLeft: {
        alignSelf: 'flex-start',
        height: 35,
        width: WIDTH/1.6/2,
        backgroundColor: "#5c768a",
        alignItems: 'center',
        borderTopLeftRadius: 25,
        justifyContent: 'center',
        borderBottomStartRadius: 25,
        borderBottomEndRadius: 0,
        borderBottomWidth: 3,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderColor: '#2a4860'
    },
    switchButtonRight: {
        alignSelf: 'flex-end',
        height: 35,
        width: WIDTH/1.6/2,
        backgroundColor: "#5c768a",
        alignItems: 'center',
        borderTopRightRadius: 25,
        justifyContent: 'center',
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 25,
        borderBottomWidth: 3,
        borderTopWidth: 3,
        borderRightWidth: 3,
        borderColor: '#2a4860'
    }

})