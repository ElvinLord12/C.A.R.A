import React from 'react';
import {View, Text} from 'react-native';

class HTTPRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            routename: 'Test',
        }
    }

    componentDidMount = () => {
        // https://facebook.github.io/react-native/movies.json
        // ic-research.eastus.cloudapp.azure.com/~mrue/route.json
        fetch('http://ic-research.eastus.cloudapp.azure.com/~mrue/getroute.php', {
            method: 'POST',
            header:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                routename: ''
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View>
                <Text>
                    {this.state.data.body}
                </Text>
            </View>
        )
    }
}
export default HTTPRequests

