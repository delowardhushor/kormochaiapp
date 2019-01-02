import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import language from './lan.json';

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

  toLogin(){
    var appStore = this.props.appStore;
    appStore.activeTab = 'Login';
    this.props.updateAppstore(appStore);
  }

  cngUsertype(){
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

  language(name){
    return lan.name[this.props.appStore.lan];
  }

  render() {
    let {lan} = this.props.appStore;
    return (
      <View>
        <Toolbar
          style={{ container: {'backgroundColor':'#4CAF50'}}}
          centerElement="Settings"
          rightElement={this.props.appStore.usertype == 'employees' ? "account-box" : "" }
          onRightElementPress={ () => { this.toProfile() }}
        />
        <View>
        <View style={{alignItems:'center', marginTop:10}}>
          <ScrollView style={{width:'90%'}}>
            <View style={{flex:1, alignItems:'center', flexDirection:'row', justifyContent:'space-between', marginBottom:10}}>
              <Text style={styles.cngLanText}>{language.changeLan[lan]}</Text>
              <Switch
              style={{marginTop:20}}
              onValueChange = {() => this.changeLan()}
              value = {this.props.appStore.lan === 'eng' ? true : false}/>
            </View>
            <View style={{flex:1, alignItems:'center', flexDirection:'row', justifyContent:'space-between', marginBottom:30}}>
              <Text style={[styles.cngLanText, {width:'60%'}]}>{this.props.appStore.usertype === 'employees' ? language.openAsEmployee[lan] : language.openAsEmployer[lan]}</Text>
              <View style={{width:'40%', marginTop:25}}>
                <Button raised primary text={language.change[lan]} onPress={() => this.cngUsertype()} />
              </View>
            </View>
            {(this.props.appStore.userdata.length == 0) &&
            <Button raised text={language.singin[lan]} onPress={() => this.toLogin()} />
            }
            {(this.props.appStore.userdata.length !== 0) &&
            <Button raised text={language.signout[lan]} onPress={() => this.logout()} />
            }
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
