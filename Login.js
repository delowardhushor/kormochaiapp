import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Lan from './lan.json';
import axios from 'axios';

import { Button } from 'react-native-material-ui';

type Props = {};
export default class Login extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
          activeSubPage : 'Signin',
          usertype : '',
          phone : '',
          password : '',
          conpassword : '',
        };
        this.focusNextField = this.focusNextField.bind(this);
        this.inputs = {};
    }

    focusNextField(id) {
        setTimeout(() => {
          this.inputs[id].focus();
        }, 100);
    }

  componentWillMount(){
    
  }

  componentWillReceiveProps(){

  }

  cngPage(){
    if(this.state.activeSubPage === 'Signin'){
        this.setState({activeSubPage:'Signup'});
    }else{
        this.setState({activeSubPage:'Signin'});
    }  
  }

  skipLogin(){
    appStore = this.props.appStore;
    appStore.activeTab = 'Home';
    this.props.updateAppstore(appStore);
  }



  validateForm(){
    if(!this.state.phone || !this.state.password){
        ToastAndroid.show("Fill Empty",3000);
    }else if(this.state.activeSubPage === 'Signup' && this.state.password != this.state.conpassword){
        ToastAndroid.show("Confirm Password Didn't Matched",3000);
    }else if(this.state.activeSubPage === 'Signin'){
        this.signin();
    }else{
        this.signup();
    }
  }

  signin(){
    axios.post(this.props.appStore.baseUrl+this.props.appStore.usertype+"/login", {
        'phone':this.state.phone,
        'password':this.state.password,
    })
    .then((res) => {
        if(res.data.success === true){
            console.log(res);
            ToastAndroid.show('Welcome! Thanks for Signup', 3000);
            var userdata = res.data.data;
            userdata.password = this.state.password;
            var appStore = this.props.appStore;
            appStore.usertype = userdata;
            appStore.activeTab = 'Home';
            this.props.updateAppstore(appStore);
        }else{
            ToastAndroid.show(res.data.msg, 3000);
        }
    })
    .catch((err) => {
        console.log(err);
        ToastAndroid.show("No Nwtwork Connection", 3000);
    })
  }

  signup(){

    axios.post(this.props.appStore.baseUrl+this.props.appStore.usertype, {
        'phone':this.state.phone,
        'password':this.state.password,
    })
    .then((res) => {
        if(res.data.success === true){
            console.log(res);
            ToastAndroid.show('Welcome! Thanks for Signup', 3000);
            var userdata = res.data.data;
            userdata.password = this.state.password;
            var appStore = this.props.appStore;
            appStore.usertype = userdata;
            appStore.activeTab = 'Home';
            this.props.updateAppstore(appStore);
        }else{
            ToastAndroid.show(res.data.msg, 3000);
        }
    })
    .catch((err) => {
        console.log(err);
        ToastAndroid.show("No Network Connection", 3000);
    })
  }

  render() {

    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <View style={{width:'60%'}}>
            <View style={{flexDirection:'row', justifyContent:"center", alignItems:'center'}}>
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text><Icon name='phone' color='#4CAF50' size={22} /></Text>
                </View>
                <View style={{flex:9}}>
                    <TextInput 
                        placeholder='Phone' 
                        underlineColorAndroid="#ddd" 
                        ref={ input => {
                            this.inputs['phone'] = input;
                        }}
                        onSubmitEditing={() => {
                            this.focusNextField('password');
                        }}
                        onChangeText={(phone) => this.setState({phone:phone})}
                        returnKeyType='next'
                        selectTextOnFocus={true}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        style={styles.inputForm}
                    />
                </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:"center", alignItems:'center'}}>
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text><Icon name='lock' color='#4CAF50' size={22} /></Text>
                </View>
                <View style={{flex:9}}>
                    <TextInput 
                        placeholder='Password' 
                        underlineColorAndroid="#ddd"
                        ref={ input => {
                            this.inputs['password'] = input;
                        }}
                        onSubmitEditing={() => {
                            this.focusNextField('conpassword');
                        }}
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password:password})}
                        returnKeyType='done'
                        selectTextOnFocus={true}
                        autoCapitalize="none"
                        blurOnSubmit={true}
                        style={styles.inputForm}
                    />
                </View>
            </View>
            {(this.state.activeSubPage == 'Signup') &&
            <View style={{flexDirection:'row', justifyContent:"center", alignItems:'center'}}>
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text><Icon name='lock' color='#4CAF50' size={22} /></Text>
                </View>
                <View style={{flex:9}}>
                    <TextInput 
                        placeholder='Confirm Password' 
                        underlineColorAndroid="#ddd"
                        ref={ input => {
                            this.inputs['conpassword'] = input;
                        }}
                        onSubmitEditing={() => {
                            this.login();
                        }}
                        secureTextEntry={true}
                        onChangeText={(conpassword) => this.setState({conpassword:conpassword})}
                        returnKeyType='done'
                        selectTextOnFocus={true}
                        autoCapitalize="none"
                        blurOnSubmit={true}
                        style={styles.inputForm}
                    />
                </View>
            </View>
            }
            <View style={{height:40}}></View>
            <Button raised primary text={this.state.activeSubPage} onPress={() => this.validateForm()} />
            <View style={{height:40}}></View>
            <Button raised text={this.state.activeSubPage === 'Signin' ? 'Signup' : 'Signin'} onPress={() => this.cngPage()} />
            <View style={{height:40}}></View>
            <Button text="Skip" onPress={() => this.skipLogin()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    inputForm:{
        fontSize:16,
        width:'100%',
    }
});
