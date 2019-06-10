import React from 'react'
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { lighterWhite, itemListText} from "../utils/Colors";

const LoginBubble = ({loginBlurb})=>(

    <View style={styles.rounded}>
        <Text style={styles.textFormatting}>{loginBlurb}</Text>
    </View>

);
const styles = StyleSheet.create({
    rounded: {
        height: 210,
        textAlign: 'center',
        width: 500,
        borderWidth: 2,
        borderColor: itemListText,
        borderRadius: 20,
        backgroundColor: itemListText,
    },
    textFormatting: {
        fontSize: 25,
        textAlign: 'center',
        color: lighterWhite,
        paddingBottom: 20,
    },
    loginInput: {
        fontSize: 20,
        textAlign: 'center',
    }
});
export default LoginBubble;