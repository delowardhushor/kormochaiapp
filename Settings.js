import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Lan from './lan.json';

import BottomNavigation, { FullTab,Badge,ShiftingTab } from 'react-native-material-bottom-navigation';
import { Button, Toolbar } from 'react-native-material-ui';
import { resetKey } from './lib/lib.js';


type Props = {};
export default class Settings extends Component<Props> {

  

  componentWillMount(){
    console.log("home");
  }

  logout(){
    ToastAndroid.show("Signning Out", 3000);
    var appStore = this.props.appStore;
    appStore.userdata = [];
    appStore.activeTab = 'Home';
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
        />
        <View>
        <View style={{alignItems:'center', marginTop:20}}>
          <ScrollView style={{width:'90%'}}>
            <Button raised  text="LOGOUT" onPress={() => this.logout()} />
          </ScrollView>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
