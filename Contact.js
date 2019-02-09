import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import language from './lan.json';

import BottomNavigation, { FullTab,Badge,ShiftingTab } from 'react-native-material-bottom-navigation';
import { Button, Toolbar } from 'react-native-material-ui';
import { resetKey } from './lib/lib.js';
import { Switch } from 'react-native-paper';


type Props = {};
export default class Contact extends Component<Props> {

  

  componentWillMount(){
    console.log("home");
  }

  toProfile = () => {
    var appStore = this.props.appStore;
    appStore.activeTab = 'Profile';
    this.props.updateAppstore(appStore);
  }
  
  toLogin(){
    var appStore = this.props.appStore;
    appStore.activeTab = 'Login';
    this.props.updateAppstore(appStore);
  }

  toSettings(){
    var appStore = this.props.appStore;
    appStore.activeTab = 'Settings';
    this.props.updateAppstore(appStore);
  }

  render() {
    let {lan} = this.props.appStore;
    return (
      <View>
        <Toolbar
          style={{ container: {'backgroundColor':'#ca0000'}}}
          centerElement={language.conUs[lan]}
          rightElement={this.props.appStore.usertype == 'employees' ? "account-box" : "" }
          onRightElementPress={ () => { this.toProfile() }}
          leftElement="chevron-left"
          onLeftElementPress={ () => { this.toSettings() }}
        />
        <View>
        <View style={{alignItems:'center', marginTop:10}}>
        <ScrollView style={{width:'90%'}}>
            <Text style={styles.inputForm} >
              Office: sector 4,road:14,uttara,Dhaka-1203
            </Text>
            <Text style={styles.inputForm} >
              Phone: 01999957611
            </Text>
            <Text style={styles.inputForm} >
              Email: kormochaibd@gmail.com
            </Text>
            <View style={{height:200}}></View>
          </ScrollView>
        </View>
        </View>
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
