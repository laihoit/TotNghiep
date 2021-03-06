import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert } from 'react-native';

import backgr from "../../picture/sky.jpg";
import logo from "../../picture/logo.png";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Notification from '../notifications/action';
import { Container } from '../component/index';

const { width, height } = Dimensions.get('window');
class UpdatePass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            passcheck: '',
        }
    }
    static navigatorStyle = {
        navBarHidden: true
    }

    onBack(){
        this.props.navigator.pop({
            animated: true,
            
        });
    }

    updatepass(){
        const { nameAcount } = this.props;
        if(nameAcount == ''){
            this.props.actions.addNotification('Name not null');
        }
        DB.db().transaction((tx) => {
            var sql = 'UPDATE Lai SET pass=\''+this.state.passcheck+'\' WHERE name=\''+nameAcount+'\'' ;
            tx.executeSql(sql, [] ,(tx , results) => {
                this.props.navigator.push({
                    screen: 'SignIn',
                    animated: true,
                    navigatorStyle:{
                        navBarHidden: true
                    }
                });
                Alert.alert('Cập nhật mật khẩu thành công!');
            })
        })
    }

    render() {
        const {index, container, texttitle, textBack, textlogin, inputstyle, btnSignIn, logo1 } = styles;
        return (
            <Container>
                <View style={index} >
                <Image source={backgr} style={container} />
                <View style={texttitle} >
                    <TouchableOpacity onPress={ () => this.onBack() } >
                        <Text style={textBack}>Trở về</Text>
                    </TouchableOpacity>
                    <Text style={textlogin}>Xác nhận tài khoản</Text>
                </View>
                <View style={logo1}>
                    <Image source={logo} />
                </View>
                <View  >
                        <TextInput style={inputstyle}
                            placeholder="Nhập mật khẩu"
                            onChangeText={(passcheck) => { this.setState({ passcheck }) }}
                            value={this.state.passcheck}
                            secureTextEntry={true}
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#fff"
                        />
                    <TouchableOpacity style={btnSignIn} onPress={ () => this.updatepass() }>
                        <Text style={{ textAlign: 'center', color: '#fff' }} >XÁC NHÂN</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    index: {
        height: height
    },
    container: {
        position: 'absolute',
        width : width
    },
    texttitle: {
        flexDirection: 'row',
        marginTop: 10
    },
    textBack: {
        color: '#ffffff'
    },
    textlogin: {
        width: width -80,
        color: '#fff',
        textAlign: 'center',
    },
    content: {
        justifyContent: 'space-between'
    },
    logo1: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputstyle: {
        width: width - 50,
        padding: 10,
        borderRadius: 20,
        color: '#fff',
        marginLeft: 25,
        backgroundColor: 'rgba(216, 216, 216, 0.5)',
        marginTop: 20,
        height: 50
    },
    btnSignIn: {
        width: width - 50,
        height: height / 18,
        backgroundColor: '#0174DF',
        borderRadius: 15,
        marginLeft: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },

});
export default  connect(null, (dispatch) => {
    return {
        actions : bindActionCreators(Object.assign({}, Notification), dispatch)
    }
})(UpdatePass);