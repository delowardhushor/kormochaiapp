import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Lan from './lan.json';

import { Button } from 'react-native-material-ui';

type Props = {};
export default class Login extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
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

  login(){
    if(!this.state.phone || !this.state.password || !this.state.conpassword){
        ToastAndroid.show('Fill Empty!' , 3000);
    }else if(this.state.password !== this.state.conpassword){
        ToastAndroid.show("Confirm Password didn't matched!", 3000);
    }else{
        // axios.post("", {
        //     'phone':this.state.phone
        // })
        // .then((res) => {
        //     console.log(res);
        // })
        // .catch((err) => {
        //     console.log(err);
        // })
        console.log(this.state)
    }
  }

  render() {
    console.log(Lan)
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
                        onChangeText={(name) => this.setState({name})}
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
            <Button raised text="LOGIN" onPress={() => this.login()} />
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
