import React from 'react';
import {View, Text, StyleSheet, Switch, ImageBackground, Image, TextInput, TouchableOpacity, Dimensions, Alert, AlertIOS} from 'react-native'
import {LinearGradient} from 'expo'
import {createStackNavigator, createAppContainer} from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome'
import SignupScreen from "./SignupScreen";
import { Button } from 'react-native-elements'


const {width: WIDTH} = Dimensions.get('window');

export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showPass: true,
            username: '',
            password: '',
            switch1: false,
        }
    }
    onEyePress = () => {
        this.setState({
            showPass: !this.state.showPass
        })
    };

    toggleDisableSwitch = (value) => {
        this.setState({switch1: value})
        console.log('DisabledSwitch is: ' + value)
    }
    onLoginPress=()=>{

        fetch('http://ic-research.eastus.cloudapp.azure.com/~mrue/login.php', {
            method: 'POST',
            header:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:this.state.username,
                password:this.state.password,
            })
        })
            .then((response) => response.json())
            .then((responseJson) =>{
                if(responseJson === "Succeeded"){
                    alert(responseJson)
                    console.log(responseJson)
                    this.props.navigation.navigate('Profile',{
            username: this.state.username,
        })
                }else{
                    alert("Incorrect Login")
                    console.log(responseJson)
                }
                })
                .catch((error)=>{
                    console.error(error);
                })

    };
    render() {
        return (
            <LinearGradient colors={['#3FB5C0','#C04A3F']} style={styles.backgroundContainer}>
                <View style={styles.logoContainer}>
                    <Icon name={'wheelchair'} size={80} color={'rgba(255,255,255,0.7)'}/>
                    <Text style={styles.logoText}>B-ABLE</Text>
                    <Switch
                    onValueChange = {this.toggleDisableSwitch}
                    value = {this.state.switch1}/>
                </View>
                <View style={styles.inputContainer}>
                    <Icon name={'user'} size={20} color={'rgba(255,255,255,0.7)'}
                    style={styles.inputIcon}/>
                    <TextInput
                    style={styles.inputs}
                    placeholder={'Username'}
                    onChangeText={(username) => this.setState({username})}
                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                    underlineColorAndroid='transparent'/>
                </View>
                <View style={styles.inputContainer}>
                    <Icon name={'lock'} size={20} color={'rgba(255,255,255,0.7)'}
                          style={styles.inputIcon}/>
                    <TextInput
                        style={styles.inputs}
                        placeholder={'Password'}
                        secureTextEntry={this.state.showPass}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({password})}/>


                        <TouchableOpacity style={styles.eyeSeeYou}
                        onPress={this.onEyePress}>
                            <Icon name={"eye"} size={20} color={'rgba(255,255,255,0.7)'}/>
                        </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.loginButton}
                    onPress={this.onLoginPress}>
                        <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton}
                    onPress={() => this.props.navigation.navigate('Signup')}>
                        <Text style={styles.text}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>


        );
    }
}


const styles = StyleSheet.create({
        backgroundContainer: {
            flex: 1,
            width: null,
            height: null,
            justifyContent: 'center',
            alignItems: 'center',
        },
        logo: {
            width: 260,
            height: 90
        },
        logoContainer: {
            alignItems: 'center',
            marginBottom: 50,
        },
        logoText:{
            fontSize: 35,
            fontWeight: '500',
            marginBottom: 20,
            opacity: 0.5,
        },
        inputs:{
            width: WIDTH-55,
            height: 35,
            borderRadius: 25,
            fontSize: 12,
            paddingLeft: 45,
            backgroundColor: 'rgba(0,0,0,0.35)',
            color: 'rgba(255,255,255,0.7)',
            marginTop: 25,
            marginHorizontal: 25,

        },
        inputIcon:{
            position: 'absolute',
            left: 37,
            bottom: 8,
        },
        inputContainer:{
            marginHorizontal: 25,

        },
        eyeSeeYou:{
            position: 'absolute',
            bottom: 8,
            right: 37,
        },
        loginButton:{
            width: WIDTH/2 - 20,
            height: 45,
            borderRadius: 25,
            backgroundColor: 'rgba(63,181,192,0.5)',
            color: 'rgba(255,255,255,0.7)',
            marginHorizontal: 20,
            marginTop: 25,
            justifyContent: 'center'
        },
        text:{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 16,
            textAlign: 'center',

        },
        buttonContainer: {
            flexDirection: 'row'
        }

    }
);




