import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Lan from './lan.json';

import BottomNavigation, { FullTab,Badge,ShiftingTab } from 'react-native-material-bottom-navigation'

type Props = {};
export default class Myjobs extends Component<Props> {

  

  componentWillMount(){
    console.log("home");
  }

  render() {
    console.log(Lan)
    return (
      <View>
        <Text>This is Myjobs</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
