import React, {Component} from 'react';
import { StyleSheet, Picker, View, Text, Dimensions, TouchableOpacity, TouchableHighlight, SectionList, Alert, TextInput, Image} from 'react-native';
import MapView, {Marker, AnimatedRegion, Polyline, ProviderPropType, Callout} from "react-native-maps";
import {createBottomTabNavigator, createAppContainer, createStackNavigator} from "react-navigation";
import {Input, Button, Header, Overlay, Card, Tooltip, Icon,} from 'react-native-elements';
import MapCallout from "react-native-maps/lib/components/MapCallout";
import {Container} from "native-base"
import Modal from 'react-native-modalbox'


const screen = Dimensions.get('window');
const {width: WIDTH} = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0102;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
var mapStyle = [
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

function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}

export default class MarkerScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            coordinate: {latitude: 42.42235,
                    longitude: -76.49429},
            modalOpen: false,
            modalDisable: false,
            swipeToClose: true,

            markerType: '',
            featureName: 'Test',
            featureID: 'Test',
            user: '',
            building: '',
            description: 'Test',
            markerImage: require("C://Users/Milo Rue/MockupApp/assets/icons/disability.png"),
            markerTitle: "default"


        }
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

    onAddPress(){
        this.setState({markerOverlay: true})
    // console.log(this.state.coordinate)
    //     this.props.navigation.navigate('Edit', {
    //         coordinates: this.state.coordinate,
    //     })
}
    dragEnd(e){
        this.setState({
            coordinate: e.nativeEvent.coordinate
        })
    }

    postMarker(){

        console.log(this.state.coordinate)
        console.log(this.state.markerTitle)
        console.log(this.state.featureName)
        console.log(this.state.building)
        console.log(this.state.description)

        fetch('http://ic-research.eastus.cloudapp.azure.com/~mrue/loadCustomMarker.php',{
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                coordinates: this.state.coordinate,
                featureID: this.state.markerTitle,
                featureName: this.state.featureName,
                building: this.state.building,
                description: this.state.description,
            })
        })
            .then((response) => {
                console.log(JSON.stringify(response, null, 4))
            })
            .catch((error)=>{
                console.error(error)
            })
    }

    renderMarker(){
        return (<Marker coordinate={this.state.coordinate}
                        onSelect={e => log('onSelect', e)}
            // onDrag={e => log('onDrag', e)}
            // onDragStart={e => log('onDragStart', e)}
            onDragEnd={e => this.dragEnd(e)}
            onPress={e => log('onPress', e)}
                        draggable
            title={this.state.markerTitle}>

                <Image source={this.state.markerImage}/>
            </Marker>
            )
    }

    goBack = () =>{
        console.log("Going back")
        this.props.navigation.goBack("Markers")
    }

    onSettingsPress = () =>{
        console.log("Adding Marker to Database")
        console.log(this.state.coordinate)

        this.props.navigation.navigate("Edit", {coords: this.state.coordinate, featureID: this.state.markerTitle, featureName: this.state.featureName, building: this.state.building,
        description: this.state.description})
    }

    onUpload(){
        console.log("Upload pressed")
    }

    setMarker(markerType){
        this.setState({markerTitle: markerType});
        if(markerType==="stair"){
            this.setState({markerImage: require("C://Users/Milo Rue/MockupApp/assets/icons/stairIcon.png")})
        }
        else if(markerType==="hazard"){
            this.setState({markerImage: require("C://Users/Milo Rue/MockupApp/assets/icons/accessdenied.png")})
        }
        else if(markerType==="disabled"){
            this.setState({markerImage: require("C://Users/Milo Rue/MockupApp/assets/icons/disability.png")})
        }
        else if(markerType==="info"){
            this.setState({markerImage: require("C://Users/Milo Rue/MockupApp/assets/icons/information.png")})
        }
        else if(markerType==="construct"){
            this.setState({markerImage: require("C://Users/Milo Rue/MockupApp/assets/icons/construction.png")})
        }
        else if(markerType==="parking"){
            this.setState({markerImage: require("C://Users/Milo Rue/MockupApp/assets/icons/parking_disabled.png")})
        }
        else if(markerType==="entrance"){
            this.setState({markerImage: require("C://Users/Milo Rue/MockupApp/assets/icons/entrance.png")})
        }
        else if(markerType==="toilet"){
            this.setState({markerImage: require("C://Users/Milo Rue/MockupApp/assets/icons/toilets_inclusive.png")})
        }
        else{
            console.log("Error invalid markerType")
        }

    }

    render(){
        return(
            <Container>
            <View
            style={styles.container}>
                <Modal
                style={styles.modal} position={"top"} ref={"markerModal"}
                swipeToClose={this.state.swipeToClose}
                onClosed={()=>{this.closeModal()}}
                onOpened={()=>{this.openModal()}}
                onClosingState={()=>{this.swipeState()}}>
                    <View style={{alignItems: 'center',}}>

                        <View style={styles.labelMargins}>
                        <Text>What Type of Feature is It?</Text>
                        </View>

                        <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: "row",}}>

                            <View style={styles.markerMargins}>
                                    <TouchableOpacity onPress={() => {this.setMarker("disabled")}}>
                            <Image style={{marginHorizontal: 10}} source={require("C://Users/Milo Rue/MockupApp/assets/icons/disability.png")}
                            />
                                    </TouchableOpacity>
                            <Text>Feature</Text>
                            </View>

                            <View style={styles.markerMargins}>
                                    <TouchableOpacity onPress={() => {this.setMarker("hazard")}}>
                            <Image style={{marginHorizontal: 10}} source={require("C://Users/Milo Rue/MockupApp/assets/icons/accessdenied.png")}/>
                                    </TouchableOpacity>
                            <Text>Hazard</Text>
                            </View>

                            <View style={styles.markerMargins}>
                                    <TouchableOpacity onPress={() => {this.setMarker("info")}}>
                            <Image style={{marginHorizontal: 10}} source={require("C://Users/Milo Rue/MockupApp/assets/icons/information.png")}/>
                                    </TouchableOpacity>
                                <Text>Info</Text>
                            </View>

                            <View style={styles.markerMargins}>
                                    <TouchableOpacity onPress={() => {this.setMarker("construct")}}>
                                    <Image style={{marginHorizontal: 10}} source={require("C://Users/Milo Rue/MockupApp/assets/icons/construction.png")}/>
                                    </TouchableOpacity>
                                    <Text>Working</Text>
                            </View>

                        </View>

                        <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: "row",}}>

                            <View style={styles.markerMargins}>
                                        <TouchableOpacity onPress={() => {this.setMarker("parking")}}>
                            <Image style={{marginHorizontal: 10}} source={require("C://Users/Milo Rue/MockupApp/assets/icons/parking_disabled.png")}/>
                                        </TouchableOpacity>
                            <Text>Parking</Text>
                            </View>

                            <View style={styles.markerMargins}>
                                    <TouchableOpacity onPress={() => {this.setMarker("stair")}}>
                            <Image style={{marginHorizontal: 10}} source={require("C://Users/Milo Rue/MockupApp/assets/icons/stairIcon.png")}/>
                                    </TouchableOpacity>
                            <Text>Stairs</Text>
                            </View>

                            <View style={styles.markerMargins}>
                                    <TouchableOpacity onPress={() => {this.setMarker("entrance")}}>
                            <Image style={{marginHorizontal: 10}} source={require("C://Users/Milo Rue/MockupApp/assets/icons/entrance.png")}/>
                                    </TouchableOpacity>
                            <Text>Entrance</Text>
                            </View>

                            <View style={styles.markerMargins}>
                                    <TouchableOpacity onPress={() => {this.setMarker("toilet")}}>
                                        <Image style={{marginHorizontal: 10}} source={require("C://Users/Milo Rue/MockupApp/assets/icons/toilets_inclusive.png")}/>
                                    </TouchableOpacity>
                                        <Text>Toilet</Text>
                            </View>

                        </View>

                        <View style={styles.labelMargins}>
                            <Text>Give this Feature a Name</Text>
                        </View>
                        <View style={styles.nameInput}>
                            <TextInput
                placeholder = 'Feature Name'
                onChangeText={(featureName) => this.setState({featureName})}
                numberOfLines={2}
                            editable={true}/>
                        </View>

                        <View style={styles.labelMargins}>
                            <Text>What Building is it Near?</Text>
                        </View>

                        <View style={styles.label}>
                            <Picker selectedValue={this.state.building}
                            style={{width: WIDTH/1.5, height: WIDTH/7,}}
                            onValueChange={(itemValue, itemIndex) =>
                            this.setState({building: itemValue})}>
                                {/*this should def be an array but im lazy*/}
                                <Picker.Item label={"Alumni Hall"} value={"Alumni Hall"}/>
                            <Picker.Item label={"Athletics and Events Center"} value={"Athletics and Events Center"}/>
                            <Picker.Item label={"Bogart Hall"} value={"Bogart Hall"}/>
                            <Picker.Item label={"Boothroyd Hall"} value={"Boothroyd Hall"}/>
                            <Picker.Item label={"Butterfield Stadium"} value={"Butterfield Stadium"}/>
                            <Picker.Item label={"Campus Center"} value={"Campus Center"}/>
                            <Picker.Item label={"Center for Health Sciencrees"} value={"Center for Health Sciences"}/>
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

                        <View style={styles.labelMargins}>
                            <Text>Describe it below</Text>
                        </View>
                        <View style={styles.description}>
                            <TextInput
                placeholder = 'Describe the feature here'
                onChangeText={(description) => this.setState({description})}
                multiline={true}
                numberOfLines={6}
                            editable={true}/>
                        </View>

                        <View style={styles.labelMargins}>
                            <View style={{alignItems: 'center', marginTop: 10, width: WIDTH/4, height: WIDTH/8, backgroundColor: "#C17172", borderRadius: 10, justifyContent: 'center'}}>
                        <TouchableOpacity >
                            <Text>Upload Image</Text>
                        </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                        <TouchableOpacity onPress={()=>{this.postMarker()}}>
                        <View style={{alignItems: 'center', marginTop: 10, width: WIDTH/1.7, height: WIDTH/8, backgroundColor: '#b14e4f', borderRadius: 10, justifyContent: 'center'}}>
                            <Text>Confirm</Text>
                        </View>
                        </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <MapView
                provider={this.props.provider}
                style={styles.map}
                customMapStyle={mapStyle}
                ref={ref=>{this.map=ref;}}
                onPress={e=> this.dragEnd(e)}
                initialRegion={{
                    latitude: 42.42268,
                    longitude: -76.4952,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}>
                    {this.renderMarker()}
                </MapView>
                <MapCallout>
                    <View style={styles.bottomContainer}>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Map")}}>
                                <Image source={require("C:\\Users\\Milo Rue\\MockupApp\\assets\\icons\\mapSmall.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.refs.markerModal.open()}}>
                                <Image source={require("C:\\Users\\Milo Rue\\MockupApp\\assets\\icons\\pinAdd.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Routes")}}>
                                <Image source={require("C:\\Users\\Milo Rue\\MockupApp\\assets\\icons\\routemini.png")}/>
                            </TouchableOpacity>

                    </View>
                    {/*Overlay for marker add*/}

                </MapCallout>
            </View>
            </Container>
        )
    }
}
MarkerScreen.propTypes={
    provider: ProviderPropType,
}

const styles=StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    topBarButtons: {
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: 10,
        marginRight: "5%",
        marginLeft: "10%",
        marginTop: 30,


    },
    addButton: {
        backgroundColor: "#003B71",
        borderRadius: 10,
    },
    editContainer: {
        flex: 1,
        paddingTop: 22
    },
    markerPopout: {
        alignItems: 'center',

    },
    markerMargins: {
        marginHorizontal: 3,
        marginTop: 3,
        alignItems: 'center',
        backgroundColor: '#c9c9c8',
        borderRadius: 10,
        width: WIDTH/5
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
        height: WIDTH/.6,
        justifyContent: 'center',
        backgroundColor: '#f3f4f4',
        paddingTop: 25,
    },
    labelMargins: {
        marginTop: 3,
        marginBottom: 3,
    },
    label: {
        borderRadius: 10,
        backgroundColor: '#c9c9c8'
    },
    description: {
        width: WIDTH/1.5,
        height: WIDTH/4,
        borderRadius: 10,
        backgroundColor: '#c9c9c8',

    },
    nameInput:{
        width: WIDTH/1.5,
        height: WIDTH/8,
        borderRadius: 10,
        backgroundColor: '#c9c9c8',
    }
})