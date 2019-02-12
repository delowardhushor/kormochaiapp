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

          frogetPass:false,
          forgetPin:'',
          conForgetPin:'',
          forgetPhone:'',
          forgetPinConfirmed:false,
          cngpass:'',
          concngpass:'',
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
        this.signin(this.state.phone, this.state.password);
    }else{
        this.signup();
    }
  }

  signin(phone, password){
    this.setState({refreshing:true});

    axios.post(this.props.appStore.baseUrl+this.props.appStore.usertype+"/login", {
        'phone':phone,
        'password':password,
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
            appStore.loginNow = true;
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

  sentPin(pin, mobile){
    this.setState({refreshing:true});
    axios.get('https://delowarhossaintb.000webhostapp.com/kormosms.php?kormophone='+mobile+'&kormopin='+pin)
    .then((res) => {
        console.log(res)
        if(res.data.success === true){
            this.setState({refreshing:false});
            ToastAndroid.show('Pin Sent To Your Mobile', 3000);
        }else{
            this.setState({refreshing:false});
            ToastAndroid.show('Can Not Send Pin Now', 3000);
        }
    })
    .catch((err) => {
        console.log(err);
        this.setState({refreshing:false});
        ToastAndroid.show("No Netwocvcvcvrk Connection", 3000);
    })
  }

  signup(){
    this.setState({refreshing:true});
    if(this.state.phone.length < 11){
        this.setState({refreshing:false});
        ToastAndroid.show('Invalid Phone Number', 3000);
    }else if(this.state.pin == ''){   
          this.setState({refreshing:true});

        // var pin = Math.floor(100000 + Math.random() * 900000);
        //         this.setState({pin:pin});
        //         this.sentPin(pin, this.state.phone);

        axios.post(this.props.appStore.baseUrl+this.props.appStore.usertype+"/exist", {
            'phone':this.state.phone,
        })
        .then((res) => {
            this.setState({refreshing:false});
            if(res.data.success === false){
                this.setState({refreshing:true});
                var pin = Math.floor(100000 + Math.random() * 900000);
                this.setState({pin:pin});
                this.sentPin(pin, this.state.phone);
            }else{
                this.setState({refreshing:false});
                ToastAndroid.show("Account All Ready Exist", 3000);
            }
        })
        .catch((err) => {
            this.setState({refreshing:false});
            ToastAndroid.show("No Network Connection", 3000);
        })
    }else if(this.state.pin != this.state.conPin){
        this.setState({refreshing:false});
        ToastAndroid.show('Invalid Pin', 3000);
    }else{
        this.setState({refreshing:false});
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

  openForPass(){
      this.setState({frogetPass:true});
  }

  backafromFropas(){

    this.setState({forgetPin:''});
    this.setState({forgetPhone:''});
    this.setState({conForgetPin:''});
    this.setState({cngpass:''});
    this.setState({concngpass:''});
    this.setState({forgetPinConfirmed:false});
    this.setState({frogetPass:false});
  }

  sendForgetPin(){
    this.setState({refreshing:true});
    if(this.state.forgetPin == ''){
        axios.post(this.props.appStore.baseUrl+this.props.appStore.usertype+"/exist", {
            'phone':this.state.forgetPhone,
        })
        .then((res) => {
            this.setState({refreshing:false});
            if(res.data.success === true){
                this.setState({refreshing:false});
                var forgetPin = Math.floor(100000 + Math.random() * 900000);
                this.setState({forgetPin:forgetPin});
                this.sentPin(forgetPin, this.state.forgetPhone);
            }else{
                ToastAndroid.show("Account Doesn't Exist", 3000);
            }
        })
        .catch((err) => {

            this.setState({refreshing:false});
            ToastAndroid.show("No Network Connection", 3000);
        })
    }else if(this.state.forgetPin == this.state.conForgetPin){
        this.setState({refreshing:false});
        if(this.state.forgetPinConfirmed === true && this.state.cngpass == this.state.concngpass){
            this.cngPass();
        }else if(this.state.forgetPinConfirmed === true && this.state.cngpass !== this.state.concngpass){
            ToastAndroid.show("Confirm Password Doesn't Matched", 3000);
        }else{
            this.setState({forgetPinConfirmed:true});
        }
    }else{
        this.setState({refreshing:false});
        ToastAndroid.show("Invalid Pin", 3000);
    }
  }

  cngPass(){
    this.setState({refreshing:true});
    axios.post(this.props.appStore.baseUrl+this.props.appStore.usertype+"/cngpass", {
        'phone':this.state.forgetPhone,
        'password':this.state.cngpass,
    })
    .then((res) => {
        this.setState({refreshing:false});
        console.log(res);
        console.log(this.state.forgetPhone);
        console.log(this.state.cngpass);
        if(res.data.success === true){
            this.signin(this.state.forgetPhone, this.state.cngpass);
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
            {/* <Button accent text={language.conGus[lan]} onPress={() => this.skipLogin()} /> */}
            {this.state.activeSubPage === 'Signin' &&
            <Button accent text={language.forPas[lan]} onPress={() => this.openForPass()} />
            }
            {/* <View style={{height:50}}></View> */}
        </ScrollView>
        <Modal
          transparent={false}
          visible={this.state.frogetPass}
          onRequestClose={() => {
            console.log('Model Closed')
          }}>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ScrollView style={{width:'60%'}} keyboardShouldPersistTaps={'always'}>
                <View style={{height:100}}></View>
                {(this.state.forgetPin == '') &&
                <View style={{flexDirection:'row', justifyContent:"center", alignItems:'center'}}>
                    <View style={{flex:1, justifyContent:'center'}}>
                        <Text><Icon name='phone' color='#000' size={22} /></Text>
                    </View>
                    <View style={{flex:9}}>
                        <TextInput 
                            placeholder={language.phone[lan]} 
                            underlineColorAndroid="#ddd"
                            onChangeText={(forgetPhone) => this.setState({forgetPhone:forgetPhone})}
                            value={this.state.forgetPhone}
                            returnKeyType='next'
                            selectTextOnFocus={true}
                            autoCapitalize="none"
                            blurOnSubmit={false}
                            style={styles.inputForm}
                        />
                    </View>
                </View>
                }
                {(this.state.forgetPin !== '' && this.state.forgetPinConfirmed == false) &&
                <View style={{flexDirection:'row', justifyContent:"center", alignItems:'center'}}>
                    <View style={{flex:1, justifyContent:'center'}}>
                        <Text><Icon name='lock' color='#000' size={22} /></Text>
                    </View>
                    <View style={{flex:9}}>
                        <TextInput 
                            placeholder={language.pin[lan]}  
                            underlineColorAndroid="#ddd"
                            value={this.state.conForgetPin}
                            onChangeText={(conForgetPin) => this.setState({conForgetPin:conForgetPin})}
                            returnKeyType='done'
                            selectTextOnFocus={true}
                            autoCapitalize="none"
                            blurOnSubmit={true}
                            style={styles.inputForm}
                        />
                    </View>
                </View>
                }
                {(this.state.forgetPinConfirmed == true) &&
                <View style={{flexDirection:'row', justifyContent:"center", alignItems:'center'}}>
                    <View style={{flex:1, justifyContent:'center'}}>
                        <Text><Icon name='lock' color='#000' size={22} /></Text>
                    </View>
                    <View style={{flex:9}}>
                        <TextInput 
                            placeholder={language.pass[lan]}  
                            underlineColorAndroid="#ddd"
                            value={this.state.cngpass}
                            onChangeText={(cngpass) => this.setState({cngpass:cngpass})}
                            returnKeyType='done'
                            selectTextOnFocus={true}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            blurOnSubmit={true}
                            style={styles.inputForm}
                        />
                    </View>
                </View>
                }
                {(this.state.forgetPinConfirmed == true) &&
                <View style={{flexDirection:'row', justifyContent:"center", alignItems:'center'}}>
                    <View style={{flex:1, justifyContent:'center'}}>
                        <Text><Icon name='lock' color='#000' size={22} /></Text>
                    </View>
                    <View style={{flex:9}}>
                        <TextInput 
                            placeholder={language.conPass[lan]}  
                            underlineColorAndroid="#ddd"
                            value={this.state.concngpass}
                            onChangeText={(concngpass) => this.setState({concngpass:concngpass})}
                            returnKeyType='done'
                            secureTextEntry={true}
                            selectTextOnFocus={true}
                            autoCapitalize="none"
                            blurOnSubmit={true}
                            style={styles.inputForm}
                        />
                    </View>
                </View>
                }
                <View style={{height:50}}></View>
                <Button raised primary text={language.confirm[lan]} onPress={() => this.sendForgetPin()} />
                <View style={{height:50}}></View>
                <Button accent text={language.back[lan]} onPress={() => this.backafromFropas()} />
            </ScrollView>
          </View>
        </Modal>
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
