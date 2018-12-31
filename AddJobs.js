import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, TextInput,Switch, ScrollView, CheckBox, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Lan from './lan.json';
import DatePicker from 'react-native-datepicker'

import { Toolbar, Button } from 'react-native-material-ui';

type Props = {};
export default class AddJobs extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            companyName:'',
            educaton:'',
            interview:true,
            interviewDate:'',
            jobDate:'',
            location:'',
            responsibility:'',
            salary:'',
            salaryType:'',
            jobType:'',
            officeHour:'',
            jobPeriod:'',
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

  }

  selectEndDate(date){
    this.setState({endDate:date});
    this.setState({present:false});
  }

  selectPresent(){
    this.setState({endDate:''});
    this.setState({present:!this.state.present});
  }

  addJob(){
      console.log(this.state);
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

    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center', height:'100%'}}>
        <Toolbar
            style={{ container: {'backgroundColor':'#4CAF50'}}}
            leftElement="chevron-left"
            centerElement="POST JOB"
            onLeftElementPress={ () => { this.props.clsAddJobs() }}
          />
          <ScrollView style={{width:'90%', paddingTop:20}}>
            <TextInput 
                placeholder='Institution Name' 
                underlineColorAndroid="#ddd" 
                ref={ input => {
                    this.inputs['companyName'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('location');
                }}
                value={this.state.companyName}
                onChangeText={(companyName) => this.setState({companyName})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput 
                placeholder='Location' 
                underlineColorAndroid="#ddd" 
                ref={ input => {
                    this.inputs['location'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('officeHour');
                }}
                value={this.state.location}
                onChangeText={(location) => this.setState({location})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <View style={{flexDirection:'row', height:40, alignItems:'center'}}>
                <Text style={{marginRight:15}}>Job Period</Text>
                <CheckBox onValueChange={() => this.setState({jobPeriod:'fulltime'})} value={this.state.profileData.gender === 'fulltime' ? true : false} />
                <Text style={{marginRight:15}}>Full Time</Text> 
                <CheckBox onValueChange={() => this.setState({jobPeriod:'parttime'})} value={this.state.profileData.gender === 'parttime' ? true : false} /> 
                <Text style={{marginRight:15}}>Part Time</Text> 
            </View>
            <TextInput 
                placeholder='Office Hour' 
                underlineColorAndroid="#ddd" 
                ref={ input => {
                    this.inputs['officeHour'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('salary');
                }}
                value={this.state.subject}
                onChangeText={(officeHour) => this.setState({officeHour})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput 
                placeholder='Salary' 
                underlineColorAndroid="#ddd" 
                ref={ input => {
                    this.inputs['salary'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('educaton');
                }}
                value={this.state.subject}
                onChangeText={(salary) => this.setState({salary})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <View style={{flexDirection:'row', height:40, alignItems:'center'}}>
                <Text style={{marginRight:15}}>Salary Period</Text>
                <CheckBox onValueChange={() => this.setState({salaryType:'monthly'})} value={this.state.profileData.gender === 'monthly' ? true : false} />
                <Text style={{marginRight:15}}>Monthly</Text> 
                <CheckBox onValueChange={() => this.setState({salaryType:'weekly'})} value={this.state.profileData.gender === 'weekly' ? true : false} /> 
                <Text style={{marginRight:15}}>Weekly</Text> 
                <CheckBox onValueChange={() => this.setState({salaryType:'daily'})} value={this.state.profileData.gender === 'daily' ? true : false} /> 
                <Text>Daily</Text>
            </View>
            <View style={{flexDirection:'row', height:40, alignItems:'center'}}>
                <Text style={{marginRight:15}}>Interview needed</Text>
                <CheckBox onValueChange={() => this.setState({interview:!this.state.interview})} value={this.state.interview} />
            </View>
            {(!this.state.interview) &&
            <View style={{flexDirection:'row', height:40,marginTop:10,alignItems:'center', justifyContent:'space-between'}}>
                <View>
                    <Text>Interview Date</Text>
                </View>
                <View>
                    <DatePicker
                        date={this.state.interviewDate}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => this.setState({interviewDate:date})}
                    />
                </View>
            </View>
            }
            <View style={{flexDirection:'row', height:40,marginTop:10,alignItems:'center', justifyContent:'space-between'}}>
                <View>
                    <Text>Job Date</Text>
                </View>
                <View>
                    <DatePicker
                        date={this.state.jobDate}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => this.setState({jobDate:date})}
                    />
                </View>
            </View>
            <TextInput 
                placeholder='Education Requirment' 
                underlineColorAndroid="#ddd" 
                ref={ input => {
                    this.inputs['educaton'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('responsibility');
                }}
                value={this.state.result}
                onChangeText={(educaton) => this.setState({educaton:educaton})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput 
                placeholder='Job Responsibility' 
                underlineColorAndroid="#ddd" 
                ref={ input => {
                    this.inputs['responsibility'] = input;
                }}
                onSubmitEditing={() => {
                    this.addJob();
                }}
                value={this.state.result}
                onChangeText={(responsibility) => this.setState({responsibility:responsibility})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <View style={{flexDirection:'row', marginTop:10,justifyContent:'flex-end'}}>
                <Button raised primary text="Add" onPress={() => {this.addJob()}} />
            </View>
            </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    inputForm:{
        fontSize:16,
        width:'100%',
    }
});
