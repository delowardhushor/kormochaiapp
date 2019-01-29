import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, TextInput,Switch, ScrollView, CheckBox, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import language from './lan.json';
import DatePicker from 'react-native-datepicker'

import { Toolbar, Button } from 'react-native-material-ui';

type Props = {};
export default class Addeducation extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            update:false,
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
    let {updateEducation} = this.props;
      if(updateEducation !==  null){
        this.setState({update:true});
        this.setState({institutionName:updateEducation.institutionName});
        this.setState({degreeName:updateEducation.degreeName});
        this.setState({subject:updateEducation.subject});
        this.setState({result:updateEducation.result});
        this.setState({present:updateEducation.present});
        this.setState({startDate:updateEducation.startDate});
        this.setState({endDate:updateEducation.endDate});
      }else{
        this.setState({update:false});
      }
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
            if(this.state.update === true){
                this.props.saveUpdateEducation(this.state, this.props.updateEducation.itemIndex);
            }else{
                this.props.addEducation(this.state);
            }
            this.props.modelCls();
        }else{
            ToastAndroid.show('Fill Empty!', 3000);
        }
    }

  render() {
    let {lan} = this.props.appStore;
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center', height:'100%'}}>
        <Toolbar
            style={{ container: {'backgroundColor':'#ca0000'}}}
            leftElement="chevron-left"
            centerElement={this.state.update === true ? language.upEdu[lan] : language.addEdu[lan] }
            onLeftElementPress={ () => { this.props.modelCls() }}
          />
          <ScrollView style={{width:'90%', paddingTop:20}}>
          <TextInput 
                placeholder={language.insName[lan]} 
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
                placeholder={language.degName[lan]} 
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
                placeholder={language.sub[lan]} 
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
                placeholder={language.result[lan]}
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
                    <Text style={[styles.inputForm, {width:'auto'}]}>{language.startDate[lan]}</Text>
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
                    <Text style={[styles.inputForm, {width:'auto'}]}>{language.endDate[lan]}</Text>
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
                <Text style={[styles.inputForm, {width:'auto'}]}>{language.present[lan]}</Text>
                <CheckBox onValueChange={() => this.selectPresent()} value={this.state.present} />
            </View>
            <View style={{flexDirection:'row', marginTop:10,justifyContent:'flex-end'}}>
                <Button raised primary text={language.save[lan]} onPress={() => {this.addEducation()}} />
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
