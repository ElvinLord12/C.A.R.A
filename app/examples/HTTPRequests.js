import React from 'react';
import {FlatList, ActivityIndicator, Text, View} from 'react-native';

export default class FetchExample extends React.Component{

    constructor(props){
        super(props);
        this.state={isLoading: true}
        this.state={dataSource: null}
    }
    componentDidMount() {
        return fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.movies,
                }, function(){

                });
            })
            .catch((error) =>{
                console.error(error);
            })
    }

    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20, marginTop: 100, marginLeft: 50,}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return(
            <View style={{flex: 1, padding: 20, marginTop: 100, marginLeft: 50}}>
                <FlatList data={this.state.dataSource} renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
                keyExtractor={({id}, index) => id}/>
            </View>
        )
    }
}