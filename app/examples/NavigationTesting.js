import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, TextInput, Alert} from 'react-native'
import {createStackNavigator, createAppContainer} from "react-navigation";
import MapScreen from "./app/screen/MapScreen";
import LoginScreen from "./app/screen/LoginScreen"

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state=
            {
                username: '',
                password: '',

            };
    }

    render() {
        return (
            <View style={styles.body}>
                <Text style={styles.header}>BABLE</Text>
                <View style={styles.buttons}>
                    <View>
                        <Text>Username Output:</Text>
                        <Text>{this.state.username}</Text>
                        <Button title={"Login"} onPress={()=> this.props.navigation.navigate('Map')}/>
                    </View>
                    <View>
                        <Button title={"Create Account"} onPress={()=> {Alert.alert('Create Account');}}/>
                    </View>
                </View>
                <View style={styles.inputs}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Username"
                        onChangeText={(username) => this.setState({username})} />
                    <TextInput
                        style={styles.inputs}
                        placeholder="Password"
                        onChangeText={(password) => this.setState({password})}/>
                </View>
                <View>
                    <Button title={"Go to details"} onPress={() => this.props.navigation.navigate('Details', {username: this.state.username, password: this.state.password})}/>
                </View>


            </View>
        );
    }
}

class DetailScreen extends React.Component{
    render(){
        const{navigation}=this.props
        const username=navigation.getParam('username','Bo Bob')
        const password=navigation.getParam('password','asdf1234')
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Details Screen</Text>
                <Text>username: {JSON.stringify(username)}</Text>
                <Button title={"Go Home"} onPress={() => this.props.navigation.navigate('Home')}/>
                <Button title={"Go Back"} onPress={() => this.props.navigation.navigate('Base')}/>
            </View>
        )
    }
}

const AppNav = createStackNavigator({
    Home: Login,
    Base: LoginScreen,
    Details: DetailScreen,
    Map: MapScreen,
});

const styles = StyleSheet.create({
    body: {
        alignItems: 'center',
        flex: 1,

    },
    header: {
        paddingTop: 100,
        paddingBottom: 200,
        fontSize: 30,
        fontFamily: ''

    },
    inputs: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize:20
    },
    buttons: {
        margin: 20,
        alignItems: 'center',
    }

});

export default createAppContainer(AppNav)