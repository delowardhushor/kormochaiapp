import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Lan from './lan.json';

import BottomNavigation, { FullTab,Badge,ShiftingTab } from 'react-native-material-bottom-navigation';
import { Button, Toolbar } from 'react-native-material-ui';
import { resetKey } from './lib/lib.js';
import { Switch } from 'react-native-paper';


type Props = {};
export default class Settings extends Component<Props> {

  

  componentWillMount(){
    console.log("home");
  }

  toProfile = () => {
    var appStore = this.props.appStore;
    appStore.activeTab = 'Profile';
    this.props.updateAppstore(appStore);
  }

  logout(){
    ToastAndroid.show("Signning Out", 3000);
    this.props.setmodelVisible();
    var appStore = this.props.appStore;
    appStore.userdata = [];
    appStore.usertype = '';
    appStore.activeTab = 'Home';
    this.props.updateAppstore(appStore);
  }

  changeLan(){
    var appStore = this.props.appStore;
    if(appStore.lan == 'eng'){
      appStore.lan = 'ban';
    }else{
      appStore.lan = 'eng';
    }
    this.props.updateAppstore(appStore);
  }

  render() {
    console.log(Lan)
    return (
      <View>
        <Toolbar
          style={{ container: {'backgroundColor':'#4CAF50'}}}
          // leftElement="menu"
          centerElement="Settings"
          rightElement={this.props.appStore.usertype == 'employees' ? "account-box" : "" }
          onRightElementPress={ () => { this.toProfile() }}
        />
        <View>
        <View style={{alignItems:'center', marginTop:10}}>
          <ScrollView style={{width:'90%'}}>
            <View style={{flex:1, alignItems:'center', flexDirection:'row', justifyContent:'space-between', marginBottom:30}}>
              <Text style={styles.cngLanText}>Change Language {this.props.appStore.lan === 'eng' ? 'English' : 'Bangla'} to {this.props.appStore.lan === 'eng' ? 'Bangla' : "English"} </Text>
              <Switch
              style={{marginTop:20}}
              onValueChange = {() => this.changeLan()}
              value = {this.props.appStore.lan === 'eng' ? true : false}/>
            </View>
            <Button raised text="LOGOUT" onPress={() => this.logout()} />
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
