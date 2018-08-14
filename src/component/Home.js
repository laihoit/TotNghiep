import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, Linking, Alert, TextInput } from 'react-native';


let rootNavigator = null;

export function getRootNavigator() {
    return rootNavigator;
}
const { width, height } = Dimensions.get('window');

class Home extends Component {
    constructor(props) {
        super(props);

        rootNavigator = this.props.navigator;
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    static navigatorButtons = {

        rightButtons: [
            {
                icon: require('../picture/cart1.png'),
                id: 'person',
                fontSize: 10,
            }
        ],
    };
    onNavigatorEvent(e) {
        if (e.id == 'person') {
            this.props.navigator.push({
                screen: 'Person',
            });
        }

    }


    render() {

        return (
            <View >
                <Text> Ho Lam Lai</Text>
            </View>
        );
    }
}


export default Home;