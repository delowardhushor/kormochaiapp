import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView,TextInput,Modal, ActivityIndicator,  ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import language from './lan.json';

import BottomNavigation, { FullTab,Badge,ShiftingTab } from 'react-native-material-bottom-navigation';
import { Button, Toolbar } from 'react-native-material-ui';
import { resetKey } from './lib/lib.js';
import { Switch } from 'react-native-paper';
import axios from 'axios';


type Props = {};
export default class CngPass extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            pass:'',
            conPass:'',
            refreshing:false,
        };
    }

  componentWillMount(){

}

  toSettings(){
    var appStore = this.props.appStore;
    appStore.activeTab = 'Settings';
    this.props.updateAppstore(appStore);
  }

  cngPass(){

      if(!this.state.pass){
        ToastAndroid.show("Fill Empty", 3000);
      }
      else if(this.state.pass !== this.state.conPass){
        ToastAndroid.show("Confirm Password Didn't Matched", 3000);
      }else{
        this.setState({refreshing:true});
        axios.post(this.props.appStore.baseUrl+this.props.appStore.usertype+"/cngpass", {
                'phone':this.props.appStore.userdata.phone,
                'password':this.state.pass,
            })
            .then((res) => {
                if(res.data.success === true){
                    this.setState({refreshing:false});
                    ToastAndroid.show("Password Changed", 3000);
                    this.toSettings();
                }else{
                    this.setState({refreshing:false});
                }
            })
            .catch((err) => {
                this.setState({refreshing:false});
                ToastAndroid.show("No Network Connection", 3000);
            })
          }
      }

  render() {
    let {lan} = this.props.appStore;
    return (
      <View>
        <Toolbar
          style={{ container: {'backgroundColor':'#ca0000'}}}
          centerElement={language.cngPass[lan]}
          rightElement={this.props.appStore.usertype == 'employees' ? "account-box" : "" }
          onRightElementPress={ () => { this.toProfile() }}
          leftElement="chevron-left"
          onLeftElementPress={ () => { this.toSettings() }}
        />
        <View style={{alignItems:'center', justifyContent:'center', marginTop:10}}>
          <ScrollView style={{width:'60%'}} keyboardShouldPersistTaps={'always'}>
            <View style={{flexDirection:'row', justifyContent:"center",marginTop:50, alignItems:'center'}}>
                <View style={{flex:1, justifyContent:'center', paddingTop:20}}>
                    <Text><Icon name='lock' color='#000' size={22} /></Text>
                </View>
                <View style={{flex:9}}>
                    <TextInput 
                        placeholder={language.pass[lan]} 
                        underlineColorAndroid="#ddd"
                        onChangeText={(pass) => this.setState({pass:pass})}
                        value={this.state.pass}
                        returnKeyType='next'
                        selectTextOnFocus={true}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        style={styles.inputForm}
                    />
                </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:"center", alignItems:'center'}}>
                <View style={{flex:1, justifyContent:'center', paddingTop:20}}>
                    <Text><Icon name='lock' color='#000' size={22} /></Text>
                </View>
                <View style={{flex:9}}>
                    <TextInput 
                        placeholder={language.conPass[lan]} 
                        underlineColorAndroid="#ddd"
                        onChangeText={(conPass) => this.setState({conPass:conPass})}
                        value={this.state.conPass}
                        returnKeyType='next'
                        secureTextEntry={true}
                        selectTextOnFocus={true}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        style={styles.inputForm}
                    />
                </View>
            </View>
            <View style={{height:20}}></View>
            <Button raised primary text={language.confirm[lan]} onPress={() => this.cngPass()} />
            <View style={{height:200}}></View>
          </ScrollView>
        </View>
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
  cngLanText:{
    fontSize:12,
    fontWeight:'bold',
    color:'#000',
    marginTop:20,
  },
  inputForm:{
    textAlign:'justify',
    color:'#000',
    marginTop:20,
    fontWeight:'bold',
    textAlign:'center'
  },
});
