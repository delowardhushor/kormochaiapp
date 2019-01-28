import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Deminsion, View, TouchableOpacity, TextInput,ActivityIndicator,Modal, ToastAndroid,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import language from './lan.json';
import axios from 'axios';

import { Button } from 'react-native-material-ui';

type Props = {};
export default class Login extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
          refreshing:false,
          activeSubPage : 'Signin',
          usertype : '',
          phone : '',
          password : '',
          conpassword : '',
          refer : '',
          pin:'',
          conPin:'',
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
        this.setState({pin:''});
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
    this.setState({refreshing:true});

    axios.post(this.props.appStore.baseUrl+this.props.appStore.usertype+"/login", {
        'phone':this.state.phone,
        'password':this.state.password,
    })
    .then((res) => {
        if(res.data.success === true){

            this.setState({refreshing:false});
            ToastAndroid.show('Welcome!', 3000);
            var userdata = res.data.data;
            userdata.password = this.state.password;
            // if(userdata.education){
            //     userdata.education = JSON.parse(userdata.education);
            // }
            var appStore = this.props.appStore;
            appStore.userdata = userdata;
            if(appStore.usertype === 'employees'){
                appStore.activeTab = 'Profile';
            }else{
                appStore.activeTab = 'Myjobs';
            }
            this.props.updateAppstore(appStore);
            
        }else{
            this.setState({refreshing:false});
            ToastAndroid.show(res.data.msg, 3000);
        }
    })
    .catch((err) => {
        console.log(err)
        this.setState({refreshing:false});
        ToastAndroid.show("No Network Connection", 3000);
    })
  }

  signup(){
    
    if(this.state.pin == ''){
        this.setState({refreshing:false});
        axios.post(this.props.appStore.baseUrl+this.props.appStore.usertype+"/exist", {
            'phone':this.state.phone,
        })
        .then((res) => {
            if(res.data.success === true){
                this.setState({refreshing:false});
                this.setState({pin:121212});
                ToastAndroid.show('Pin Sent To Your Mobile', 3000);
            }else{
                this.setState({refreshing:false});
                ToastAndroid.show("Account Exist", 3000);
            }
        })
        .catch((err) => {
            console.log(err)
            this.setState({refreshing:false});
            ToastAndroid.show("No Network Connection", 3000);
        })
    }else if(this.state.pin != this.state.conPin){
        console.log(this.state.pin, this.state.conPin);
        alert(this.state.pin+"dfdfdf"+this.state.conPin)
        ToastAndroid.show('Invalid Pin', 3000);
    }else{
        this.confirmedSignup();
    }
  }

  confirmedSignup(){
    this.setState({refreshing:true});
    axios.post(this.props.appStore.baseUrl+this.props.appStore.usertype, {
        'phone':this.state.phone,
        'password':this.state.password,
        'refer_code':this.state.refer,
    })
    .then((res) => {
        if(res.data.success === true){
            this.setState({refreshing:false});
            ToastAndroid.show('Welcome! Thanks for Signup', 3000);
            var userdata = res.data.data;
            userdata.password = this.state.password;
            var appStore = this.props.appStore;
            appStore.userdata = userdata;
            appStore.activeTab = 'Home';
            this.props.updateAppstore(appStore);
        }else{
            this.setState({refreshing:false});
            ToastAndroid.show(res.data.msg, 3000);
        }
    })
    .catch((err) => {
        console.log(err)
        this.setState({refreshing:false});
        ToastAndroid.show("No Network Connection", 3000);
    })
  }

  render() {
    let {lan} = this.props.appStore;
    return (
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <ScrollView style={{width:'60%'}} keyboardShouldPersistTaps={'always'}>
            <View style={{height:50}}></View>
            {(this.state.pin == '') &&
            <View style={{flexDirection:'row', justifyContent:"center", alignItems:'center'}}>
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text><Icon name='phone' color='#000' size={22} /></Text>
                </View>
                <View style={{flex:9}}>
                    <TextInput 
                        placeholder={language.phone[lan]} 
                        underlineColorAndroid="#ddd"
                        onChangeText={(phone) => this.setState({phone:phone})}
                        returnKeyType='next'
                        selectTextOnFocus={true}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        style={styles.inputForm}
                    />
                </View>
            </View>
            }
            {(this.state.pin == '') &&
            <View style={{flexDirection:'row', justifyContent:"center", alignItems:'center'}}>
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text><Icon name='lock' color='#000' size={22} /></Text>
                </View>
                <View style={{flex:9}}>
                    <TextInput 
                        placeholder={language.pass[lan]}  
                        underlineColorAndroid="#ddd"
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
            }
            {(this.state.activeSubPage == 'Signup' && this.state.pin == '') &&
            <View style={{flexDirection:'row', justifyContent:"center", alignItems:'center'}}>
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text><Icon name='lock' color='#000' size={22} /></Text>
                </View>
                <View style={{flex:9}}>
                    <TextInput 
                        placeholder={language.conPass[lan]}  
                        underlineColorAndroid="#ddd"
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
            {(this.state.activeSubPage == 'Signup' && this.state.pin == '') &&
            <View style={{flexDirection:'row', justifyContent:"center", alignItems:'center'}}>
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text><Icon name='info' color='#000' size={22} /></Text>
                </View>
                <View style={{flex:9}}>
                    <TextInput 
                        placeholder={language.refCode[lan]} 
                        underlineColorAndroid="#ddd"
                        secureTextEntry={true}
                        onChangeText={(refer) => this.setState({refer:refer})}
                        returnKeyType='done'
                        selectTextOnFocus={true}
                        autoCapitalize="none"
                        blurOnSubmit={true}
                        style={styles.inputForm}
                    />
                </View>
            </View>
            }

            {(this.state.activeSubPage == 'Signup' && this.state.pin !== '') &&
            <View style={{flexDirection:'row', justifyContent:"center", alignItems:'center'}}>
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text><Icon name='lock' color='#000' size={22} /></Text>
                </View>
                <View style={{flex:9}}>
                    <TextInput 
                        placeholder={language.pin[lan]}  
                        underlineColorAndroid="#ddd"
                        value={this.state.conPin}
                        onChangeText={(conPin) => this.setState({conPin:conPin})}
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
            <Button raised primary text={this.state.activeSubPage === 'Signin' ? language.signin[lan] : language.signup[lan]} onPress={() => this.validateForm()} />
            <View style={{height:40}}></View>
            <Button raised text={this.state.activeSubPage === 'Signin' ? language.signup[lan] : language.signin[lan]} onPress={() => this.cngPage()} />
            <View style={{height:40}}></View>
            <Button accent text={language.conGus[lan]} onPress={() => this.skipLogin()} />
            <View style={{height:50}}></View>
        </ScrollView>
        <Modal
          transparent={true}
          visible={this.state.refreshing}
          onRequestClose={() => {
            console.log('Model Closed')
          }}>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator size="large" color="#00ff00" /></View>
        </Modal>
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
