import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Alert,
    TextInput,
    Image
} from 'react-native';
import MapView, {Marker, AnimatedRegion, Polyline, ProviderPropType} from 'react-native-maps';
import rawData from "./gpxTrace.js"
import Icon from 'react-native-vector-icons/FontAwesome'
import {Input, Button,} from 'react-native-elements'
import Drawer from 'react-native-drawer'
import Sidebar from 'C:/Users/Milo Rue/MockupApp/app/components/MapDrawer'
import MapCallout from "react-native-maps/lib/components/MapCallout";
import MarkerArray from "../examples/MarkerArray";
import PolylineCreator from "../examples/LineCreator";

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0102;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
var mapStyle = [
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#67737e"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.icon",
    "stylers": [
      {
        "color": "#512f4a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6c5070"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#7078a0"
      },
      {
        "weight": 1
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#7078a0"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  }
]

export default class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: null,
            isLoading: true,
            routename: 'Williams to Textor',
            routesearch: '',
            markers: [{
                    latitude: 42.42235,
                    longitude: -76.49429,
            }],
            dataSource: rawData.slice(),
        }
    }
    closeSidePanel = () => {
        console.log("sidepanel opened")}

    componentDidMount() {
    return fetch('http://ic-research.eastus.cloudapp.azure.com/~mrue/constRoute.php')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function(){})
            })
            .catch((error) =>{
                console.error(error)
            })
    }

    searchMap(){
        return fetch('http://ic-research.eastus.cloudapp.azure.com/~mrue/getroute.php', {
            method: 'POST',
            header:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                routeName: this.state.routename,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    dataSource: responseJson,
                }, function(){})
            })
            .catch((error) =>{
                console.error(error)
            })
    }

    getLineInfo = () => {
        Alert.alert('Route Info',
            'Williams -> Gannett Center',[
                {text: 'More Info', onPress: () => console.log('More info pressed')},
                {
                    text:'Cancel',
                    onPress:() => console.log('Cancel Pressed'),
                style: 'cancel',}],
                {
                    cancelable:false
                }
            )
    }

    addMarker(e){
        console.log(e.nativeEvent.coordinate)
        this.setState({
            markers: [ ...this.state.markers, e.nativeEvent.coordinate]
        })
    }

    addMarkersDB = () => {
        console.log(JSON.stringify(this.state.markers))
        fetch('http://ic-research.eastus.cloudapp.azure.com/~mrue/loadMarker.php', {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                coordinates: this.state.markers
                })})
        .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
            })
        .catch((error) =>{
                console.error(error)
            })
    }


    render() {
        return (


            <View style={styles.container}>
                <Drawer ref={(ref) => {this._drawer = ref;}} content={<Sidebar/>}/>
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    customMapStyle={mapStyle}
                    ref={ref => {this.map = ref;}}
                    onPress={e => this.addMarker(e)}
                    initialRegion={{
                        latitude: 42.42268,
                        longitude: -76.4952,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    showsUserLocation={true}
                    showsPointsOfInterest={false}
                >
                    {/*/!*hardcoded markers*!/*/}
                    {/*{this.renderMarker(42.42268,-76.4952,"Williams Hall")}*/}
                    {/*{this.renderMarker(42.42235,-76.49429, "Campus Center")}*/}
                    {/*{this.renderMarker(42.42106,-76.49595, "Whalen Center for Music")}*/}
                    {/*{this.renderMarker(42.42124,-76.49429, "Gannett Center")}*/}
                    {/*{this.renderMarker(42.42064,-76.49397, "East Tower")}*/}
                    {/*{this.renderMarker(42.4205,-76.4951, "West Tower")}*/}
                    {/*{this.renderMarker(42.42059,-76.49452, "Towers Dining Hall")}*/}
                    {/*{this.renderMarker(42.42005,-76.49622, "Terrace Dining Hall")}*/}
                    {/*{this.renderMarker(42.42007,-76.49603, "Terrace 1")}*/}
                    {/*{this.renderMarker(42.41985,-76.4965, "Terrace 2")}*/}
                    <Marker coordinate={{latitude: 42.422326040000001512453309260308742523193359375,longitude: -76.495359750000005760739441029727458953857421875}} title={"Stairs"}
                    >
                        <Image source={require('C:/Users/Milo Rue/MockupApp/assets/stairs.png'
                    )}/>
                    </Marker>
                    <Polyline coordinates={this.state.dataSource} strokeWidth={5}
                    strokeColor={"#F89594"}
                    tappable={true}
                    onPress={this.getLineInfo}/>

                    {this.state.markers.map(marker =>(
                        <Marker
                        coordinate={marker}
                        draggable/>
                    ))}
                </MapView>
                <MapCallout>
                    <View style={styles.searchBarView}>
                        <Button
                            onPress= {() => {this.addMarkersDB()

                    }} type ="outline"
                            raised={true}
                        icon={{
                            type: "FontAwesome",
                            name: 'bars',
                            size: 30,
                            color: "black",
                            }
                        }
                        />
                        <TextInput
                placeholder = 'Find a Route       '
                style={styles.searchBarSearch}
                placeholderTextColor={'#010909'}
                onChangeText={(routename) => this.setState({routename})}
                />
                <Button
                            onPress= {() => {this.searchMap()

                    }} type ="outline"
                            raised={false}
                        icon={{
                            type: "FontAwesome",
                            name: 'search',
                            size: 30,
                            color: "black",
                            }
                        }
                            buttonStyle={styles.searchIcon}
                        />


                    </View>
                </MapCallout>

            </View>
        );
    }
}

App.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    searchIcon:{
        marginLeft: 35
    },
    searchBarView: {
        flexDirection: 'row',
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: 10,
        width: '80%',
        marginRight: "5%",
        marginLeft: "5%",
        marginTop: 30,
    },
    searchBarSearch: {
        borderColor: "transparent",
        marginLeft: 100,
        width: "40%",
        marginRight: 0,
        height: 40,
        borderWidth: 0.0,
        color: '#010909'
    }

});