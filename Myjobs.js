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

  componentWillReceiveProps(){

  }

  render() {
    console.log(Lan)
    return (
      <View>
        <Text>This is Myjobs {this.props.appStore.userType}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
