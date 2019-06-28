import React from 'react'
import MapView, { Polyline, Marker } from 'react-native-maps';
import { View } from 'react-native'

class MarkerArray extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            markers: [{
                title: 'hello',
                coordinates: {
                    latitude: 3.148561,
                    longitude: 101.652778
                },
            },
                {
                    title: 'hello',
                    coordinates: {
                        latitude: 3.149771,
                        longitude: 101.655449
                    },
                }]
        }
    }

    render(){
        return(
        <MapView>
        {this.state.markers.map(marker => (
            <Marker
            coordinate={marker.coordinates}
            title={marker.title}
            />
        ))}
        </MapView>
        )}
}

export default MarkerArray;
