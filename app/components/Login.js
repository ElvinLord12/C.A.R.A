import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { lighterWhite, itemListText} from "../utils/Colors";


    const Login = ({title}) => (
                <View style={styles.centered}>
                <Text style={styles.whiteText}>{title}</Text>
                </View>
    );
const styles = StyleSheet.create({
    whiteText: {
        color: lighterWhite,
        fontWeight: 'bold',
        fontSize: 40,
        paddingTop: 100,
        paddingBottom: 700,
    },
    centered:{
        alignItems: 'center',
    },
});

export default Login;