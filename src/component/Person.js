import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, Linking, Alert, TextInput } from 'react-native';


class Person extends Component {
    constructor(props) {
        super(props);

    }



    render() {
        return (
            <View >
                <TouchableOpacity onPress={() => {
                                this.props.navigator.push({
                                    screen: 'Map',
                                });
                }} >
                <Text> Ho Lam Lai</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


export default Person;