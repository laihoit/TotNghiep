import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { Container, InputField } from '../component/index';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import * as AttachmentActor from '../attachment/action';
import { firebaseApp } from '../firebase/Firebaseconfig';
import RNFetchBlob from 'react-native-fetch-blob';

import avatar from '../../picture/avatar.png';
import camera from '../../picture/camera.png';

const storage = firebaseApp.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob;

const { width, height } = Dimensions.get('window');

var options = {
    title: 'Select Avatar',
    customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

const uploadImage = (uri, mime = 'application/octet-stream') => {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        const sessionId = new Date().getTime()
        let uploadBlob = null
        const imageRef = storage.ref('images').child(`${sessionId}`)
  
        fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }


class EditPerson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameacount: '',
            lantitude: '',
            longtitude: '',
            emailacount: '',
            imageuser: '',
            phonenumber:'',
            address :'',
            avatarSource : null,
            key : null
        }
    }

    componentDidMount() {
        that = this;
        const { mystate } = this.props;
        firebaseApp.database().ref('User').orderByChild('Username').equalTo(mystate).once('value', function(snapshot){
            snapshot.forEach(function(child){
                that.setState({
                    key : child.key,
                    nameacount : child.val().NameAcount,
                    emailacount: child.val().Username, 
                    phonenumber: child.val().Phone,
                    imageuser: child.val().Image,
                })
            })
        })
    }
    UpdateUser() {
        const { key, nameacount, avatarSource, phonenumber } = this.state;
        firebaseApp.database().ref('/User/' + key).update({ NameAcount: nameacount })
        firebaseApp.database().ref('/User/' + key).update({ Phone: phonenumber })
        firebaseApp.database().ref('/User/' + key).update({ Image: avatarSource })
        this.props.navigator.pop();
    }
    getImagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
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
                uploadImage(response.uri)
                .then(url => this.setState({ avatarSource : url }))
                .catch(error => console.log(error))

                let source = { uri: response.uri };
                this.setState({
                    imageuser: source
                });

            }
        });
    }
    render() {
        const { container, imgInfo, nameAndAvatarView, avatarImgInfo, avatarView, editView, editIcon, myInfo, nameInfo, nameText
            , itemEdit, editText, button, editButtonView, editButtonText } = style;
        const { nameacount ,lantitude ,longtitude ,avatarSource, imageuser, emailacount, phonenumber, address } = this.state;
        return (
            <Container>
                <ScrollView style={container} >
                    <View style={myInfo}>
                        <View style={nameAndAvatarView}>
                            <View style={imgInfo}>
                                <View style={avatarView}>
                                    <Image source={ imageuser ? imageuser : avatar} style={avatarImgInfo} />
                                </View>
                                <TouchableOpacity style={editView}
                                    onPress={() => this.getImagePicker()}
                                >
                                    <Image source={camera} style={editIcon} />
                                </TouchableOpacity>
                            </View>
                            <View style={nameInfo} >
                                <Text style={nameText}>Họ và tên</Text>
                                <InputField placeholder="Đổi tên ở đây"
                                    placeholderTextColor="#22222226"
                                    onChangeText={(nameacount) => {
                                        this.setState({ nameacount })
                                    }}
                                    value={nameacount}
                                />
                            </View>
                        </View>
                        <View style={itemEdit} >
                            <Text style={editText}>Số điện thoại</Text>
                            <InputField placeholder="Đổi số điện thoại"
                                placeholderTextColor="#22222226"
                                onChangeText={(phonenumber) => {
                                    this.setState({ phonenumber })
                                }}
                                value={phonenumber}
                            />
                        </View>

                        <View style={itemEdit} >
                            <Text style={editText}>Email</Text>
                            <InputField placeholder="Đổi email"
                                placeholderTextColor="#22222226"
                                onChangeText={(emailacount) => {
                                    this.setState({ emailacount })
                                }}
                                value={emailacount}
                                editable={false}
                            />
                        </View>

                        <View style={itemEdit} >
                            <Text style={editText}>Địa chỉ</Text>
                            <InputField placeholder="Đổi địa chỉ"
                                placeholderTextColor="#22222226"
                                onChangeText={(emailacount) => {
                                    this.setState({ emailacount })
                                }}
                                value={lantitude+", "+ longtitude}
                                editable={false}
                            />
                        </View>
                    </View>
                    <View style={editButtonView}>
                        <TouchableOpacity style={button} onPress={() => this.UpdateUser()} >
                            <Text style={editButtonText}>{'Đổi thông tin'.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5
    },
    myInfo: {
        paddingBottom: 20,
    },
    nameAndAvatarView: {
        flexDirection: 'row',
        marginBottom: 25
    },
    imgInfo: {
        borderRadius: 48,
        marginRight: 10,
        flexDirection: 'row'
    },
    editView: {
        position: 'absolute',
        right: 0,
        bottom: 5
    },
    editIcon: {
        width: 20,
        height: 20,
    },
    avatarView: {
        padding: 5,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#22222226'
    },
    avatarImgInfo: {
        width: 60,
        height: 60,
        borderRadius: 25
    },
    nameInfo: {
        padding: 8,
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#22222226'
    },
    itemEdit: {
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 10
    },
    editButtonView: {
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10
    },
    button: {
        padding: 5,
        backgroundColor: '#3880b3d9',
        borderRadius: 25,
        alignItems: 'center'
    },
    editButtonText: {
        fontSize: 15,
        color: 'white',

    }

});
const mapStateToProps = (state) => ({
    mystate : state.checkLogin.user
})

export default connect(mapStateToProps)(EditPerson);