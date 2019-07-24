import React from 'react';
import {View, Text, Button, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity, Dimensions} from 'react-native'
import {LinearGradient} from 'expo'
import Icon from 'react-native-vector-icons/FontAwesome'


const {width: WIDTH} = Dimensions.get('window');

export default class SignupScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showPass: true,
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            fullname: '',
            passCheck: false,
        }
    }
    onEyePress = () => {
        this.setState({
            showPass: !this.state.showPass
        })
    };
    onCreateAcctPress = () => {
        this.checkPassword()

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

    goBack=() =>{
        this.props.navigation.navigate('Home')
    }

    checkPassword=() =>{
        if(this.state.confirmPassword === this.state.password){
            this.setState({
                passCheck: true
            })
        }
    }
    render() {
        return (
            <LinearGradient colors={['#003B71','#0066c3']} style={styles.backgroundContainer}>
                <View style={styles.logoContainer}>
                    {/*<Image source={{uri: 'https://www.ithaca.edu/css/cs/marcom/templates/IC-2L-Left-White.png'}}*/}
                           {/*style={{width: WIDTH/1.5, height: 160}}/>*/}
                           <Icon name={'wheelchair'} size={80} color={'rgba(255,255,255,0.7)'}/>
                    <Text style={styles.logoText}>Accessibility</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Icon name={'user'} size={20} color={'rgba(255,255,255,0.7)'}
                    style={styles.inputIcon}/>
                    <TextInput
                    style={styles.inputs}
                    placeholder={'Full Name'}
                    onChangeText={(fullname) => this.setState({fullname})}
                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                    underlineColorAndroid='transparent'/>
                </View>
                <View style={styles.inputContainer}>
                    <Icon name={'envelope'} size={20} color={'rgba(255,255,255,0.7)'}
                          style={styles.inputIcon}/>
                    <TextInput
                        style={styles.inputs}
                        placeholder={'Email Address'}
                        onChangeText={(email) => this.setState({email})}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'/>
                </View>
                <View style={styles.inputContainer}>
                    <Icon name={'user'} size={20} color={'rgba(255,255,255,0.7)'}
                          style={styles.inputIcon}/>
                    <TextInput
                        style={styles.inputs}
                        placeholder={'Username'}
                        onChangeText ={(username) => this.setState({username})}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'/>

                </View>
                <View style={styles.inputContainer}>
                    <Icon name={'lock'} size={20} color={'rgba(255,255,255,0.7)'}
                          style={styles.inputIcon}/>
                    <TextInput
                        style={styles.inputs}
                        placeholder={'Password'}
                        onChangeText = {(password) => this.setState({password})}
                        secureTextEntry={this.state.showPass}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'/>

                        <TouchableOpacity style={styles.eyeSeeYou}
                        onPress={this.onEyePress}>
                            <Icon name={"eye"} size={20} color={'rgba(255,255,255,0.7)'}/>
                        </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Icon name={'lock'} size={20} color={'rgba(255,255,255,0.7)'}
                          style={styles.inputIcon}/>
                    <TextInput
                        style={styles.inputs}
                        placeholder={'Confirm Password'}
                        secureTextEntry={this.state.showPass}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'/>

                        <TouchableOpacity style={styles.eyeSeeYou}
                        onPress={this.onEyePress}>
                            <Icon name={"eye"} size={20} color={'rgba(255,255,255,0.7)'}/>
                        </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.loginButton}
                    onPress={this.goBack}>
                        <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton}
                    onPress={this.onCreateAcctPress}>
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
            paddingTop: 30,
            alignItems: 'center',
        },
        logo: {
            width: 260,
            height: 90
        },
        logoContainer: {
            alignItems: 'center',
            marginBottom: 25,
        },
        logoText:{
            fontSize: 35,
            fontWeight: '500',
            marginBottom: 20,
            opacity: 0.5,
        },
        inputs:{
            width: WIDTH-55,
            height: 30,
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
            backgroundColor: 'rgba(0,0,0,0.35)',
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

