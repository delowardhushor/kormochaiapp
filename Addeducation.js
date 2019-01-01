import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, TextInput,Switch, ScrollView, CheckBox, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Lan from './lan.json';
import DatePicker from 'react-native-datepicker'

import { Toolbar, Button } from 'react-native-material-ui';

type Props = {};
export default class Addeducation extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            institutionName:'',
            degreeName:'',
            subject:'',
            result:'',
            present:false,
            startDate:'',
            endDate:''
        };
        this.focusNextField = this.focusNextField.bind(this);
        this.inputs = {};
    }

    focusNextField(id) {
        setTimeout(() => {
          this.inputs[id].focus();
        }, 100);
    }
  

  componentWillMount(){
    console.log("home");
  }

  selectEndDate(date){
    this.setState({endDate:date});
    this.setState({present:false});
  }

  selectPresent(){
    this.setState({endDate:''});
    this.setState({present:!this.state.present});
  }

//   cngProfileData(field, value){
//     var profileData = this.state;
//     profileData[field] = value;
//     this.setState({profileData:profileData});
//   }

    addEducation(){
        if(this.state.degreeName && this.state.institutionName && this.state.subject && this.state.startDate){
            this.props.addEducation(this.state);
            this.props.modelCls();
        }else{
            ToastAndroid.show('Fill Empty!', 3000);
        }
    }

  render() {
    console.log(Lan)
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center', height:'100%'}}>
        <Toolbar
            style={{ container: {'backgroundColor':'#4CAF50'}}}
            leftElement="chevron-left"
            centerElement="ADD EDUCATION"
            onLeftElementPress={ () => { this.props.modelCls() }}
          />
          <ScrollView style={{width:'90%', paddingTop:20}}>
          <TextInput 
                placeholder='Institution Name' 
                underlineColorAndroid="#ddd" 
                ref={ input => {
                    this.inputs['institutionName'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('degreeName');
                }}
                value={this.state.institutionName}
                onChangeText={(institutionName) => this.setState({institutionName})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput 
                placeholder='Course Name' 
                underlineColorAndroid="#ddd" 
                ref={ input => {
                    this.inputs['degreeName'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('subject');
                }}
                value={this.state.degreeName}
                onChangeText={(degreeName) => this.setState({degreeName})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput 
                placeholder='Subject' 
                underlineColorAndroid="#ddd" 
                ref={ input => {
                    this.inputs['subject'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('result');
                }}
                value={this.state.subject}
                onChangeText={(subject) => this.setState({subject})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput 
                placeholder='Result' 
                underlineColorAndroid="#ddd" 
                ref={ input => {
                    this.inputs['result'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('mobile');
                }}
                value={this.state.result}
                onChangeText={(result) => this.setState({result})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <View style={{flexDirection:'row', height:40,marginTop:10,alignItems:'center', justifyContent:'space-between'}}>
                <View>
                    <Text style={[styles.inputForm, {width:'auto'}]}>Start Date</Text>
                </View>
                <View>
                    <DatePicker
                        date={this.state.startDate}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => {this.setState({startDate: date})}}
                    />
                </View>
            </View>
            {(!this.state.present) &&
            <View style={{flexDirection:'row', height:40,marginTop:10,alignItems:'center', justifyContent:'space-between'}}>
                <View>
                    <Text style={[styles.inputForm, {width:'auto'}]}>End Date</Text>
                </View>
                <View>
                    <DatePicker
                        date={this.state.endDate}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => {this.selectEndDate(date)}}
                    />
                </View>
            </View>
            }
            <View style={{flexDirection:'row', height:40,marginTop:10,alignItems:'center',  justifyContent:'flex-start'}}>
                <Text style={[styles.inputForm, {width:'auto'}]}>IN Present</Text>
                <CheckBox onValueChange={() => this.selectPresent()} value={this.state.present} />
            </View>
            <View style={{flexDirection:'row', marginTop:10,justifyContent:'flex-end'}}>
                <Button raised primary text="Add" onPress={() => {this.addEducation()}} />
            </View>
            </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    inputForm:{
        fontSize:12,
        width:'100%',
        color:'#000',
    }
});
