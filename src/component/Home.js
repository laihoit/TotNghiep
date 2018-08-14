import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, Linking, Alert, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';

let rootNavigator = null;

var options = {
    title: 'Select Avatar',
    customButtons: [
      {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

export function getRootNavigator() {
    return rootNavigator;
}
const { width, height } = Dimensions.get('window');

class Home extends Component {
    constructor(props) {
        super(props);
            this.state={
                avatarSource:''
            }
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

    onImagePicker(){
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              let source = { uri: response.uri };
              this.setState({
                avatarSource: source
              });
            }
          });
    }

    render() {

        return (
            <View >
                <TouchableOpacity onPress={() => this.onImagePicker()} >
                <Text> Ho Lam Lai</Text>
                </TouchableOpacity>
                <Image source={this.state.avatarSource} style={{ width : 100, height : 100 }} />
            </View>
        );
    }
}


export default Home;