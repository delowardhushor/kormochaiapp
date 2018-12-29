import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
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
          <Button text="LOGOUT" onPress={() => resetKey('appStore')} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
