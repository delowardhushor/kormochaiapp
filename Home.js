import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Lan from './lan.json';

import { Button, Toolbar } from 'react-native-material-ui';


type Props = {};
export default class Home extends Component<Props> {

  

  componentWillMount(){
    console.log(this.props.appStore);
  }

  componentWillReceiveProps(){

  }



  render() {
    console.log(Lan)
    return (
      <View>
        <Toolbar
          style={{ container: {'backgroundColor':'#4CAF50'}}}
          // leftElement="menu"
          centerElement="KORMO CHAI"
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
          }}
          rightElement={{
              menu: {
                  icon: "more-vert",
                  labels: ["item 1", "item 2"]
              }
          }}
          onRightElementPress={ (label) => { console.log(label) }}
        />
        <Text>This is Home {this.props.appStore.usertype}</Text>
        <Button text="change" onPress={() => this.props.updateAppstore('userType', 'member')} /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
