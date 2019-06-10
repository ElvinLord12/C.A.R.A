/*This is an Example of React Native Map*/
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView, Permissions } from 'expo'
import Polyline from 'react-native-maps'


const locations = import('./assets/locations');

export default class App extends React.Component {
    state = {
        latitude: null,
        longitude: null,
        locations: locations,
        cords: [42.42003,-76.49802]
    };

    async componentDidMount() {
        const {status} = await Permissions.getAsync(Permissions.LOCATION)

        if (status != 'granted') {
            const response = await Permissions.askAsync(Permissions.LOCATION)
        }
        navigator.geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => this.setState({
                latitude,
                longitude
            }, () => console.log('State:', this.state)),
            (error) => console.log('Error:', error))

        const {locations: [sampleLocation]} = this.state

        this.setState({
            destLat: sampleLocation.coords.latitude,
            destLon: sampleLocation.coords.longitude
        }, () => console.log(' This state', this.state))
    }




    render() {
        const { latitude, longitude } = this.state;
        const coords = this.state.coords
        console.log('Coordinates: ', latitude,longitude)
        return(
            <MapView
                showsUserLocation
                style={{ flex:1 }}
                initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                <Polyline
                    coordinates={this.state.cords}
                    strokeColor="red"
                    strokeWidth={2}

                />
            </MapView>);
        // return (
        //   <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        //     <Text>We need permission to serve you a map!</Text>
        //   </View>
    }
}