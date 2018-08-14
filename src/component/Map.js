import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, Alert, FlatList } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default class Map extends Component {
    constructor(props) {
        super(props);
        arraysMarker = [
            {
                latitude: '',
                longitude: ''
            }
        ];
        this.mapRef = null;
        this.state = {
            region: {
                latitude: 10.852332,
                longitude: 106.6348151,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            marker: {
                latitude: '',
                longitude: ''
            },
            markers: arraysMarker,
            addressbegin: '',
            addressend: '',
            directionsMap: [],
            addresslocation: '',
            location: [],
            findlatstart: '',
            findlongstart: '',
            findlatend: '',
            findlongend: ''
        };
    }


    onRegionChange(region) {
        this.setState({ region });
      }
  
    render() {
       
            return (
                <MapView
                region={this.state.region}
                onRegionChange={this.onRegionChange}
                style={{flex : 1 }}
              />
            )
        }
}
