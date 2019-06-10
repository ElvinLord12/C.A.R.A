
import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, Button } from 'react-native';
import { LinearGradient } from 'expo';
import { panelGradientArray} from "./app/utils/Colors";

export default class Main extends React.Component {
    render() {
        return (
            <LinearGradient colors={panelGradientArray} style={styles.container}>
                <View style={styles.center}>
                    <Image style={styles.image} source={require('./assets/loginNew.png')}/>
                    <Text>B-ABLE</Text>
                </View>

            </LinearGradient>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    image: {
        paddingTop: 200,

    }
});
