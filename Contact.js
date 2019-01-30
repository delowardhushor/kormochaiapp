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


  render() {
    let {lan} = this.props.appStore;
    return (
      <View>
        <Toolbar
          style={{ container: {'backgroundColor':'#ca0000'}}}
          centerElement={language.conUs[lan]}
          rightElement={this.props.appStore.usertype == 'employees' ? "account-box" : "" }
          onRightElementPress={ () => { this.toProfile() }}
        />
        <View>
        <View style={{alignItems:'center', marginTop:10}}>
          <ScrollView style={{width:'90%'}}>
            <Text>Contact Us Will BE there</Text>
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
  }
});
