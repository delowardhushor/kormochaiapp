import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Lan from './lan.json';

import BottomNavigation, { FullTab,Badge,ShiftingTab } from 'react-native-material-bottom-navigation'

type Props = {};
export default class Home extends Component<Props> {

  

  componentWillMount(){
    console.log(Lan);
    console.log("sdsdsd");
  }

  render() {
    console.log(Lan)
    return (
      <View>
        <Text>This is Home</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
