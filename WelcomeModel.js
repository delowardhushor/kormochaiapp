import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Lan from './lan.json';

import { Button } from 'react-native-material-ui';

type Props = {};
export default class WelcomeModel extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
          usertype : '',
          phoen : '',
          password : '',
          conpassword : '',
          page : 'login'
        };
        //this.focusNextField = this.focusNextField.bind(this);
        //this.inputs = {};
      }

  componentWillMount(){
    
  }

  componentWillReceiveProps(){

  }

  render() {
    console.log(Lan)
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <View style={{width:'90%'}}>
          <Button raised primary text="I am Employee" onPress={() => this.props.setUserType('employee')} />
          <View style={{height:20}}></View>
          <Button raised primary text="I am Emplyer" onPress={() => this.props.setUserType('employer')} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
