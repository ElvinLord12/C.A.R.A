import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { LinearGradient } from 'expo';
import { primaryGradientArray } from './utils/Colors';
import Header from './components/Header';
import Input from './components/Input';
import Login from './components/Login';
import LoginBubble from './components/LoginBubble'
import MapView from 'react-native-maps'
const headerTitle = 'To Do';
export default class Main extends React.Component {
    state = {
        inputValue: ''
    };
    newInputValue = value => {
        this.setState({
            inputValue: value
        });
    };
    render() {
        const { inputValue } = this.state;
        return (
        <LinearGradient
                colors={primaryGradientArray}
                style={styles.container}
            >
                <View>
                <View>
                    <Login title={'B-ABLE'}/>
                </View>
                <View style={styles.centered}>
                    <LoginBubble loginBlurb={'LOGIN'}/>
                </View>
                </View>
            </LinearGradient>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    centered: {
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-between'

    },
    inputContainer: {
        marginTop: 40,
        paddingLeft: 15
    }
});