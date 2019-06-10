// import {Permissions} from "expo";
//
// async componentDidMount(){
//     const {status} = await Permissions.getAsync(Permissions.LOCATION)
//
//     if (status != 'granted') {
//         const response = await Permissions.askAsync(Permissions.LOCATION)
//     }
//     navigator.geolocation.getCurrentPosition(
//         ({coords: {latitude, longitude}}) => this.setState({
//             latitude,
//             longitude
//         }, () => console.log('State:', this.state)),
//         (error) => console.log('Error:', error))
//
//     const {locations: [sampleLocation]} = this.state
//
//     this.setState({
//         destLat: sampleLocation.coords.latitude,
//         destLon: sampleLocation.coords.longitude
//     }, () => console.log(' This state', this.state))
// }