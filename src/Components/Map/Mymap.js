import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, Alert, FlatList, Platform } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoder';

const { width, height } = Dimensions.get('window');

const GOOGLE_MAPS_APIKEY = 'AIzaSyBFjK8UInAeNGfhx8attCH8UNY6xzNjuwU';
const DEFAULT_PADDING = { top: 4000, right: 4000, bottom: 4000, left: 4000 };

export default class MyMap extends Component {
    constructor(props) {
        super(props);
        this.mapRef = null;
        this.state = {
            region: {
                latitude: 10.852332,
                longitude: 106.6348151,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            marker: {
                latitude: 0,
                longitude: 0
            },
            markers: [],
            addressbegin: null,
            addressend: null,
            directionsMap: [],
            addresslocation: 0,
            location: [],
            findlatstart: 0,
            findlongstart: 0,
            findlatend: 0,
            findlongend: 0
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    static navigatorButtons = {
        leftButtons: [
            {
                icon: require('../../picture/back.png'),
                id: 'back',
                fontSize: 10,
            }
        ]
    };
    onNavigatorEvent(e) {
        if (e.id == 'back') {
            this.props.navigator.pop();
        }
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            this.setState({
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                },
                marker: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
            })
        }, (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
    }
    renderMarker() {
        const { markers } = this.state;
        let renderMarkers = [];
        for (marker of markers) {
            if (marker.longitude && marker.latitude) {
                renderMarkers.push(
                    <Marker
                        key={marker.latitude}
                        coordinate={marker}
                    ></Marker>
                )
            }
        }

        return renderMarkers;
    }
    // findDirectionbetweentowpoint() {
    //     const { addressbegin, addressend } = this.state;
    //     fetch('https://maps.googleapis.com/maps/api/directions/json?origin=' + addressbegin + '&destination=' + addressend + '&region=vn&key=AIzaSyBFjK8UInAeNGfhx8attCH8UNY6xzNjuwU')
    //         .then(response => response.json)
    //         .then(responseJson => {
    //             this.setState({ directionsMap: responseJson })
    //             console.log("sau khi tim kiem " + this.state.directionsMap)
    //         })
    //         .catch(err => console.log(err));
    // }

    findlocation() {
        const { addressbegin, addressend, findlatstart, findlongstart, findlatend, findlongend } = this.state;
        Geocoder.geocodeAddress(addressbegin).then(res => {
            if (res.length !== 0) {
                Geocoder.geocodeAddress(addressend).then(response => {
                    console.log(response);
                    if (response.length !== 0) {
                        this.setState({
                            findlatstart: res[0].position.lat,
                            findlongstart: res[0].position.lng,
                            findlatend: response[0].position.lat,
                            findlongend: response[0].position.lng
                        }, () => {
                            this.map.fitToCoordinates([{
                                latitude: res[0].position.lat,
                                longitude: res[0].position.lng,
                              }, {
                                latitude: response[0].position.lat,
                                longitude: response[0].position.lng,
                              }], 
                                                      {edgePadding: 
                                                        {
                                                            top: (Platform.OS === 'android') ? 115 : 50, 
                                                            right: 25, 
                                                            bottom: 25, 
                                                            left: 75, //higher left padding to avoid locations going under map buttons
                                                        }, animated: true}); 
                        })
                    } else {
                        
                    }
                   
                })
            } else {

            } 
        })
        
        //get start point
        // var beginUrl = `https://maps.google.com/maps/api/geocode/json?address=${addressbegin}`
        // fetch(beginUrl)
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         this.setState({
        //             datasource: responseJson.results,
        //         })
        //         this.setState({
        //             findlatstart: this.state.datasource[0].geometry.location.lat,
        //             findlongstart: this.state.datasource[0].geometry.location.lng
        //         })
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
        // //get end point
        // let endpointUrl = `https://maps.google.com/maps/api/geocode/json?address=${addressend}`;
        // fetch(endpointUrl)
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         this.setState({
        //             datasource: responseJson.results,
        //         })
        //         this.setState({
        //             findlatend: this.state.datasource[0].geometry.location.lat,
        //             findlongend: this.state.datasource[0].geometry.location.lng
        //         })
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //    });
    }
    renderfindlocation() {
        return (
            <Marker
                title='day la '
                description='day la'
                coordinate={{
                    latitude: this.state.findlatstart,
                    longitude: this.state.findlongstart
                }}
            />
        )
    }
    renderlocationend() {
        return (
            <Marker
                title='day la '
                description='day la'
                coordinate={{
                    latitude: this.state.findlatend,
                    longitude: this.state.findlongend
                }}
            />
        )
    }
    componentDidUpdate() {
        const { marker } = this.state;
        if (this.props.locationlan == null || this.props.locationlong == null) {
            this.map.fitToCoordinates([marker], {
                edgePadding: DEFAULT_PADDING,
                animated: true,
            });
        } else {
            const markeruser = {
                latitude: parseInt(this.props.locationlan),
                longitude: parseInt(this.props.locationlong)
            }
            this.map.fitToCoordinates([markeruser], {
                edgePadding: DEFAULT_PADDING,
                animated: true,
            });
        }
    }
    render() {
        if (this.props.locationlan == null || this.props.locationlong == null) {
            const markerstart = {
                latitude: this.state.findlatstart,
                longitude: this.state.findlongstart
            }
            const markerend = {
                latitude: this.state.findlatend,
                longitude: this.state.findlongend
            }
            return (
                <View style={{ flex: 1 }}>
                    <View style={styles.btnSignIn} >
                        <View>
                            <TextInput style={styles.inputstyle}
                                placeholder="Nhập vi tri bat dau"
                                onChangeText={(addressbegin) => { this.setState({ addressbegin }) }}
                                value={this.state.addressbegin}
                                placeholderTextColor="#fff"
                            />
                            <TextInput style={styles.inputstyle}
                                placeholder="Nhập vi tri ket thuc"
                                onChangeText={(addressend) => { this.setState({ addressend }) }}
                                value={this.state.addressend}
                                placeholderTextColor="#fff"
                            />

                        </View>
                        <TouchableOpacity style={styles.textbtn} onPress={() => this.findlocation()}>
                            <Text >Tim</Text>
                        </TouchableOpacity>
                    </View>
                    <MapView
                        //initialRegion={this.state.region}
                        style={styles.map}
                        ref={ref => { this.map = ref; }}>
                        <Marker
                            title="Me "
                            description="That all for me today"
                            coordinate={this.state.marker}
                        />
                        {this.renderMarker()}
                        {this.state.findlatstart != 0 ? this.renderfindlocation() : null}
                        {this.state.findlatend != 0 ? this.renderlocationend() : null}
                        <MapViewDirections
                            origin={markerstart}
                            destination={markerend}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="#2962FF"
                        />
                    </MapView>
                </View>
            )
        } else {
            const markeruser = {
                latitude: parseInt(this.props.locationlan),
                longitude: parseInt(this.props.locationlong)
            }
            return (
                <MapView
                    // initialRegion={this.state.region}
                    style={styles.map}
                    ref={ref => { this.map = ref; }}
                >
                    <Marker
                        title="Me "
                        description="That all for me today"
                        coordinate={this.state.marker}
                    />
                    <Marker
                        title="what "
                        description="This is a description"
                        coordinate={markeruser}
                    />
                    <MapViewDirections
                        origin={this.state.marker}
                        destination={markeruser}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="#2962FF"
                    />
                    {this.renderMarker()}
                </MapView>
            )
        }
    }
}
const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    inputstyle: {
        width: width - 100,
        marginLeft: 5,
        height: height / 20,
        backgroundColor: 'rgba(216, 216, 216, 0.5)',
        marginTop: 10,

    },
    btnSignIn: {
        position: 'absolute',
        zIndex: 999
    },
    textbtn: {
        backgroundColor: 'rgba(216, 216, 216, 0.5)',
        width: width / 5,
        marginTop: 5,
        marginLeft: 5,
        padding: 5
    }

})