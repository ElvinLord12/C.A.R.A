import React, {Component} from 'react';
import {Platform, Picker, View, Text, Dimensions, TouchableOpacity, Alert, TextInput, Image, StyleSheet} from 'react-native';
import MapCallout from "react-native-maps/lib/components/MapCallout";
import {createDrawerNavigator, createAppContainer} from "react-navigation";
import MapView, {Marker, AnimatedRegion, Polyline, ProviderPropType} from 'react-native-maps';
import {Icon, Button} from 'react-native-elements';
import Modal from 'react-native-modalbox'



const {width: WIDTH} = Dimensions.get('window');
const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.00700;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#5c768a"
      }
    ]
  },
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape",
    "stylers": [
      {
        "color": "#5c768a"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#96a6bc"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#96a6bc"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#96a6bc"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#96a6bc"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#7d8282"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#5c768a"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]

export default class MapScreenV2 extends Component{
    constructor(props) {
        super(props);
        this.state={
            isLoading: true,
            markerLoading: true,
            modalOpen: false,
            modalDisable: false,
            swipeToClose: true,
            endName: '',
            startName: '',
            dataSource: null,
            location: null,
            buildings: [{
                latitude: 42.42280,
                longitude: -76.49429,
            }],
            markers: [{
                latitude: 42.42280,
                longitude: -76.49429,
            }],
            markerImage: 'C:\\Users\\Milo Rue\\MockupApp\\assets\\icons\\mapDefault.png'
        }
    }

    goToMarkers(){
        this.props.navigation.navigate("Markers")
    }

    closeModal(){
        console.log("Modal closed");
    }

    openModal(){
        console.log("Modal opened");
    }

    swipeState(state){
        console.log('the open/close state of swipeToClose just changed');
    }

    searchMap(){
        return fetch('http://ic-research.eastus.cloudapp.azure.com/~mrue/getroute.php', {
            method: 'POST',
            header:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                routeName: this.state.routeName,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    dataSource: responseJson,
                }, function(){})
                this.findBuilding()
            })
            .catch((error) =>{
                console.error(error)
            })
    }

    findBuilding(){

        fetch('http://ic-research.eastus.cloudapp.azure.com/~mrue/findBuilding.php', {
            method: 'POST',
            header:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startName: this.state.startName,
                endName: this.state.endName,
            })
        })
            .then((response)=> response.json())
            .then((responseJson) =>{
                this.setState({buildings: responseJson,},function (){})
            })
    }

    getFeatures(){
        fetch('http://ic-research.eastus.cloudapp.azure.com/~mrue/showMarkers.php', {
            method: 'GET',
            header:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response)=> response.json())
            .then((responseJson)=>{
                this.setState({markers: responseJson,},function(){})
            })
    }

    getLocation(){
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);
                this.setState({location});
                console.log(this.state.location)
            },
            error => Alert.alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        )
    }

    determineMarker(markerType){
        if(markerType==="stair"){
            return("C://Users/Milo Rue/MockupApp/assets/icons/mapStair.png")
        }
        else if(markerType==="hazard"){
            return("C://Users/Milo Rue/MockupApp/assets/icons/mapHazard.png")
        }
        else if(markerType==="disabled"){
            return("C://Users/Milo Rue/MockupApp/assets/icons/mapDefault.png")
        }
        else if(markerType==="info"){
            return("C://Users/Milo Rue/MockupApp/assets/icons/mapInfo.png")
        }
        else if(markerType==="maintenance"){
            return("C://Users/Milo Rue/MockupApp/assets/icons/mapMaintain.png")
        }
        else if(markerType==="parking"){
            return("C://Users/Milo Rue/MockupApp/assets/icons/mapParking.png")
        }
        else if(markerType==="entrance"){
            return("C://Users/Milo Rue/MockupApp/assets/icons/mapDoor.png")
        }
        else if(markerType==="toilet"){
            return("C://Users/Milo Rue/MockupApp/assets/icons/mapToilet.png")
        }
        else{
            return("C://Users/Milo Rue/MockupApp/assets/icons/mapDefault.png")
        }
    }

    componentDidMount() {
        this.getLocation();

    }

    getBoundingBox(lat, lon){
        const topRightlat = lat + 0.0005;
        const topRightlon = lon - 0.0005;

        const bottomLeftlat = lat - 0.0005;
        const bottomLeftlon = lon + 0.0005;

        const boundingBox = [
            {
                botLat: bottomLeftlat,
                botLon: bottomLeftlon,
                topLat: topRightlat,
                topLon: topRightlon,
            }
        ]

        console.log(boundingBox);

        return boundingBox;
    }


    render(){
        return(
            <View style={styles.container}>
                <Modal
                    style={styles.modal} position={"top"} ref={"searchModal"}
                    swipeToClose={this.state.swipeToClose}
                    onClosed={()=>{this.closeModal()}}
                    onOpened={()=>{this.openModal()}}
                    onClosingState={()=>{this.swipeState()}}>
                    <View style={{alignItems: 'center'}}>
                        <View style={styles.searchBar}>
                            <Picker selectedValue={this.state.startName}
                                    style={{width: WIDTH/1.5, height: WIDTH/7}}
                        onValueChange={(itemValue, itemIndex) =>
                        this.setState({startName: itemValue})}>
                            <Picker.Item label={"Alumni Hall"} value={"Alumni Hall"}/>
                            <Picker.Item label={"Athletics and Events Center"} value={"Athletics and Events Center"}/>
                            <Picker.Item label={"Bogart Hall"} value={"Bogart Hall"}/>
                            <Picker.Item label={"Boothroyd Hall"} value={"Boothroyd Hall"}/>
                            <Picker.Item label={"Butterfield Stadium"} value={"Butterfield Stadium"}/>
                            <Picker.Item label={"Campus Center"} value={"Campus Center"}/>
                            <Picker.Item label={"Center for Health Sciences"} value={"Center for Health Sciences"}/>
                            <Picker.Item label={"Center for Natural Sciences"} value={"Center for Natural Sciences"}/>
                            <Picker.Item label={"Clarke Hall"} value={"Clarke Hall"}/>
                            <Picker.Item label={"Dillingham Center"} value={"Dillingham Center"}/>
                            <Picker.Item label={"East Tower"} value={"East Tower"}/>
                            <Picker.Item label={"Eastman Hall"} value={"Eastman Hall"}/>
                            <Picker.Item label={"Emerson Hall"} value={"Emerson Hall"}/>
                            <Picker.Item label={"Fitness Center"} value={"Fitness Center"}/>
                            <Picker.Item label={"Ford Observatory"} value={"Ford Observatory"}/>
                            <Picker.Item label={"Freeman Field"} value={"Freeman Field"}/>
                            <Picker.Item label={"Friends Hall"} value={"Friends Hall"}/>
                            <Picker.Item label={"Gannett Center"} value={"Gannett Center"}/>
                            <Picker.Item label={"Garden Apartments"} value={"Garden Apartments"}/>
                            <Picker.Item label={"Hammond Health Center"} value={"Hammond Health Center"}/>
                            <Picker.Item label={"Hill Center"} value={"Hill Center"}/>
                            <Picker.Item label={"Hilliard Hall"} value={"Hilliard Hall"}/>
                            <Picker.Item label={"Holmes Hall"} value={"Holmes Hall"}/>
                            <Picker.Item label={"Hood Hall"} value={"Hood Hall"}/>
                            <Picker.Item label={"Job Hall"} value={"Job Hall"}/>
                            <Picker.Item label={"Landon Hall"} value={"Landon Hall"}/>
                            <Picker.Item label={"Lyon Hall"} value={"Lyon Hall"}/>
                            <Picker.Item label={"Muller Chapel"} value={"Muller Chapel"}/>
                            <Picker.Item label={"Muller Faculty Center"} value={"Muller Faculty Center"}/>
                            <Picker.Item label={"Park Center for Business and Sustainable Enterprise"} value={"Park Center for Business and Sustainable Enterprise"}/>
                            <Picker.Item label={"Park Hall"} value={"Park Hall"}/>
                            <Picker.Item label={"Peggy Ryan Williams Center"} value={"Peggy Ryan Williams Center"}/>
                            <Picker.Item label={"Public Safety and General Services"} value={"Public Safety and General Services"}/>
                            <Picker.Item label={"Rothschild Place"} value={"Rothschild Place"}/>
                            <Picker.Item label={"Rowland Hall"} value={"Rowland Hall"}/>
                            <Picker.Item label={"Smiddy Hall"} value={"Smiddy Hall"}/>
                            <Picker.Item label={"Talcott Hall"} value={"Talcott Hall"}/>
                            <Picker.Item label={"Terrace 1"} value={"Terrace 1"}/>
                            <Picker.Item label={"Terrace 2"} value={"Terrace 2"}/>
                            <Picker.Item label={"Terrace 3"} value={"Terrace 3"}/>
                            <Picker.Item label={"Terrace 4"} value={"Terrace 4"}/>
                            <Picker.Item label={"Terrace 5"} value={"Terrace 5"}/>
                            <Picker.Item label={"Terrace 6"} value={"Terrace 6"}/>
                            <Picker.Item label={"Terrace 7"} value={"Terrace 7"}/>
                            <Picker.Item label={"Terrace 8"} value={"Terrace 8"}/>
                            <Picker.Item label={"Terrace 9"} value={"Terrace 9"}/>
                            <Picker.Item label={"Terrace Dining Hall"} value={"Terrace Dining Hall"}/>
                            <Picker.Item label={"Textor Hall"} value={"Textor Hall"}/>
                            <Picker.Item label={"Towers Dining Hall"} value={"Towers Dining Hall"}/>
                            <Picker.Item label={"West Tower"} value={"West Tower"}/>
                            <Picker.Item label={"Whalen Center for Music"} value={"Whalen Center for Music"}/>
                            <Picker.Item label={"Wheeler Tennis Courts"} value={"Wheeler Tennis Courts"}/>
                            <Picker.Item label={"Williams Hall"} value={"Williams Hall"}/>


                        </Picker>

                        </View>
                        <TouchableOpacity onPress={()=>{this.getBoundingBox(this.state.buildings[0]["latitude"], this.state.buildings[0]["longitude"])}}>
                               <Text>Use Current Location as Start</Text>
                            </TouchableOpacity>
                        <View style={styles.searchBar}>
                        <Picker selectedValue={this.state.endName}
                                    style={{width: WIDTH/1.5, height: WIDTH/7}}
                        onValueChange={(itemValue, itemIndex) =>
                        this.setState({endName: itemValue})}>
                            <Picker.Item label={"Alumni Hall"} value={"Alumni Hall"}/>
                            <Picker.Item label={"Athletics and Events Center"} value={"Athletics and Events Center"}/>
                            <Picker.Item label={"Bogart Hall"} value={"Bogart Hall"}/>
                            <Picker.Item label={"Boothroyd Hall"} value={"Boothroyd Hall"}/>
                            <Picker.Item label={"Butterfield Stadium"} value={"Butterfield Stadium"}/>
                            <Picker.Item label={"Campus Center"} value={"Campus Center"}/>
                            <Picker.Item label={"Center for Health Sciences"} value={"Center for Health Sciences"}/>
                            <Picker.Item label={"Center for Natural Sciences"} value={"Center for Natural Sciences"}/>
                            <Picker.Item label={"Clarke Hall"} value={"Clarke Hall"}/>
                            <Picker.Item label={"Dillingham Center"} value={"Dillingham Center"}/>
                            <Picker.Item label={"East Tower"} value={"East Tower"}/>
                            <Picker.Item label={"Eastman Hall"} value={"Eastman Hall"}/>
                            <Picker.Item label={"Emerson Hall"} value={"Emerson Hall"}/>
                            <Picker.Item label={"Fitness Center"} value={"Fitness Center"}/>
                            <Picker.Item label={"Ford Observatory"} value={"Ford Observatory"}/>
                            <Picker.Item label={"Freeman Field"} value={"Freeman Field"}/>
                            <Picker.Item label={"Friends Hall"} value={"Friends Hall"}/>
                            <Picker.Item label={"Gannett Center"} value={"Gannett Center"}/>
                            <Picker.Item label={"Garden Apartments"} value={"Garden Apartments"}/>
                            <Picker.Item label={"Hammond Health Center"} value={"Hammond Health Center"}/>
                            <Picker.Item label={"Hill Center"} value={"Hill Center"}/>
                            <Picker.Item label={"Hilliard Hall"} value={"Hilliard Hall"}/>
                            <Picker.Item label={"Holmes Hall"} value={"Holmes Hall"}/>
                            <Picker.Item label={"Hood Hall"} value={"Hood Hall"}/>
                            <Picker.Item label={"Job Hall"} value={"Job Hall"}/>
                            <Picker.Item label={"Landon Hall"} value={"Landon Hall"}/>
                            <Picker.Item label={"Lyon Hall"} value={"Lyon Hall"}/>
                            <Picker.Item label={"Muller Chapel"} value={"Muller Chapel"}/>
                            <Picker.Item label={"Muller Faculty Center"} value={"Muller Faculty Center"}/>
                            <Picker.Item label={"Park Center for Business and Sustainable Enterprise"} value={"Park Center for Business and Sustainable Enterprise"}/>
                            <Picker.Item label={"Park Hall"} value={"Park Hall"}/>
                            <Picker.Item label={"Peggy Ryan Williams Center"} value={"Peggy Ryan Williams Center"}/>
                            <Picker.Item label={"Public Safety and General Services"} value={"Public Safety and General Services"}/>
                            <Picker.Item label={"Rothschild Place"} value={"Rothschild Place"}/>
                            <Picker.Item label={"Rowland Hall"} value={"Rowland Hall"}/>
                            <Picker.Item label={"Smiddy Hall"} value={"Smiddy Hall"}/>
                            <Picker.Item label={"Talcott Hall"} value={"Talcott Hall"}/>
                            <Picker.Item label={"Terrace 1"} value={"Terrace 1"}/>
                            <Picker.Item label={"Terrace 2"} value={"Terrace 2"}/>
                            <Picker.Item label={"Terrace 3"} value={"Terrace 3"}/>
                            <Picker.Item label={"Terrace 4"} value={"Terrace 4"}/>
                            <Picker.Item label={"Terrace 5"} value={"Terrace 5"}/>
                            <Picker.Item label={"Terrace 6"} value={"Terrace 6"}/>
                            <Picker.Item label={"Terrace 7"} value={"Terrace 7"}/>
                            <Picker.Item label={"Terrace 8"} value={"Terrace 8"}/>
                            <Picker.Item label={"Terrace 9"} value={"Terrace 9"}/>
                            <Picker.Item label={"Terrace Dining Hall"} value={"Terrace Dining Hall"}/>
                            <Picker.Item label={"Textor Hall"} value={"Textor Hall"}/>
                            <Picker.Item label={"Towers Dining Hall"} value={"Towers Dining Hall"}/>
                            <Picker.Item label={"West Tower"} value={"West Tower"}/>
                            <Picker.Item label={"Whalen Center for Music"} value={"Whalen Center for Music"}/>
                            <Picker.Item label={"Wheeler Tennis Courts"} value={"Wheeler Tennis Courts"}/>
                            <Picker.Item label={"Williams Hall"} value={"Williams Hall"}/>


                        </Picker>
                        </View>
                        <TouchableOpacity onPress={()=>{this.findBuilding()}} style={{marginTop: 20,}}>
                            <Image source={require("C:\\Users\\Milo Rue\\MockupApp\\assets\\icons\\searchBar.png")}/>
                        </TouchableOpacity>
                    </View>

                    </Modal>
                <Modal
                style={styles.settings} position={"bottom"} ref={"settingModal"}>
                </Modal>
                <MapView
                    provider={this.props.provider}
                    style={styles.container}
                    customMapStyle={mapStyle}
                    initialRegion={{
                        latitude: 42.42268,
                        longitude: -76.4952,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                }}
                showsUserLocation={true}
                showsPointsOfInterest={false}>
                    {this.state.buildings.map( building =>(
                        <Marker
                            title={building["buildingName"]}
                        coordinate={building}>
                            <Image source={require("C:\\Users\\Milo Rue\\MockupApp\\assets\\icons\\pinRedS.png")}/>
                        </Marker>
                    ))}
                    {this.state.markers.map(marker =>(
                        <Marker
                        title={marker["name"]}
                        coordinate={marker}>
                            <Image source={require('C:\\Users\\Milo Rue\\MockupApp\\assets\\icons\\mapDefault.png')}/>
                        </Marker>
                    ))}
                </MapView>
                <MapCallout>

                    <View style={styles.bars}>
                    <TouchableOpacity onPress={()=>{this.refs.settingModal.open()}}>
                    <Icon name={'bars'} type={"font-awesome"} color={"#ffffff"} size={30}/>
                    </TouchableOpacity>
                </View>

                    <View style={styles.bottomContainer}>
                            <TouchableOpacity onPress={()=>{this.goToMarkers()}}>
                                <Image source={require("C:\\Users\\Milo Rue\\MockupApp\\assets\\icons\\pin1.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.refs.searchModal.open()}}>
                                <Image source={require("C:\\Users\\Milo Rue\\MockupApp\\assets\\icons\\search.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.getFeatures()}}>
                                <Image source={require("C:\\Users\\Milo Rue\\MockupApp\\assets\\icons\\routemini.png")}/>
                            </TouchableOpacity>

                    </View>



                </MapCallout>
            </View>
        )
    }

}

MapScreenV2.propTypes = {
  provider: ProviderPropType,
};

const styles= StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
    alignItems: 'center',
    },
    bottomContainer: {
        width: WIDTH,
        height: WIDTH/5,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: "row",
        backgroundColor: "#f3f4f4",
        borderWidth: 0,
        borderColor: "#5c768a"
    },
    modal:{
        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25,
        flexDirection: 'row',
        height: WIDTH/1.5,
        justifyContent: 'center',
        backgroundColor: '#f3f4f4',
        paddingTop: 25,
    },
    searchBar:{
        marginLeft: 10,
        marginTop: 10,
        backgroundColor: '#e2e3e3',
        borderRadius: 25,
        width: WIDTH/1.5,
        height: WIDTH/7,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    bars: {
        alignItems: "center",
    },
    settings: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: WIDTH/3,
        backgroundColor: "#f3f4f4",
    }
})