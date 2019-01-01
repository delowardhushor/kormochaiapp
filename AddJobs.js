import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, TextInput,Switch,ActivityIndicator, ScrollView, CheckBox, ToastAndroid, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Lan from './lan.json';
import DatePicker from 'react-native-datepicker'

import { Toolbar, Button } from 'react-native-material-ui';
import axios from 'axios';

type Props = {};
export default class AddJobs extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            refreshing:false,
            jobTitle:'',
            companyName:'',
            education:'',
            interview:true,
            interviewDate:'',
            jobDate:'',
            location:'',
            responsibility:'',
            salary:'',
            salaryType:'monthly',
            officeHour:'',
            jobPeriod:'fulltime',
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
      this.setState({refreshing:true});
      axios.post(this.props.appStore.baseUrl+"jobs",{
        job_title:this.state.jobTitle,
        employers_id:this.props.appStore.userdata.id,
        company_name:this.state.companyName,
        education:this.state.education,
        interview:true,
        interview_date:this.state.interviewDate,
        job_date:this.state.jobDate,
        location:this.state.location,
        job_responsibility:this.state.responsibility,
        salary:this.state.salary,
        salary_type:this.state.salaryType,
        office_hour:this.state.officeHour,
        job_type:this.state.jobPeriod,
        category:"Finance",
      })
      .then((res)=>{
        if(res.data.success === true){
            this.setState({refreshing:false});
            ToastAndroid.show("Job Post Succeessfully", 3000);
            var appStore = this.props.appStore;
            appStore.jobs.push(res.data.Jobs);
            this.props.updateAppstore(appStore);
            this.props.clsAddJobs();
        }else{
            this.setState({refreshing:false});
        }
      })    
      .catch((err)=>{
        this.setState({refreshing:false});
        ToastAndroid.show("No Network Connection", 3000)
      })
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
                placeholder='Job Title' 
                underlineColorAndroid="#ddd" 
                ref={ input => {
                    this.inputs['jobTitle'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('companyName');
                }}
                value={this.state.jobTitle}
                onChangeText={(jobTitle) => this.setState({jobTitle})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
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
            <View style={{flexDirection:'row', height:40, alignItems:'center', marginTop:10}}>
                <Text style={[styles.inputForm, {width:'auto', marginRight:15}]}>Job Period</Text>
                <CheckBox onValueChange={() => this.setState({jobPeriod:'fulltime'})} value={this.state.jobPeriod === 'fulltime' ? true : false} />
                <Text style={[styles.inputForm, {width:'auto', marginRight:15}]}>Full Time</Text> 
                <CheckBox onValueChange={() => this.setState({jobPeriod:'parttime'})} value={this.state.jobPeriod === 'parttime' ? true : false} /> 
                <Text style={[styles.inputForm, {width:'auto', marginRight:15}]}>Part Time</Text> 
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
                value={this.state.officeHour}
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
                    this.focusNextField('education');
                }}
                value={this.state.salary}
                onChangeText={(salary) => this.setState({salary})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <View style={{height:40, marginTop:10}}>
                <Text style={styles.inputForm}>Salary Period</Text>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
                    <CheckBox onValueChange={() => this.setState({salaryType:'monthly'})} value={this.state.salaryType === 'monthly' ? true : false} />
                    <Text style={[styles.inputForm, {width:'auto', marginRight:15}]}>Monthly</Text> 
                    <CheckBox onValueChange={() => this.setState({salaryType:'weekly'})} value={this.state.salaryType === 'weekly' ? true : false} /> 
                    <Text style={[styles.inputForm, {width:'auto', marginRight:15}]}>Weekly</Text> 
                    <CheckBox onValueChange={() => this.setState({salaryType:'daily'})} value={this.state.salaryType === 'daily' ? true : false} /> 
                    <Text>Daily</Text>
                </View>
            </View>
            <View style={{flexDirection:'row', height:40, alignItems:'center', marginTop:30}}>
                <Text style={[styles.inputForm, {marginRight:15, width:'auto'}]}>Interview needed</Text>
                <CheckBox onValueChange={() => this.setState({interview:!this.state.interview})} value={this.state.interview} />
            </View>
            {(this.state.interview) &&
            <View style={{flexDirection:'row', height:40,marginTop:10,alignItems:'center', justifyContent:'space-between'}}>
                <View>
                    <Text style={[styles.inputForm, {width:'auto'}]} >Interview Date</Text>
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
                    <Text style={[styles.inputForm, {width:'auto'}]} >Job Date</Text>
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
                    this.inputs['education'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('responsibility');
                }}
                value={this.state.education}
                onChangeText={(education) => this.setState({education:education})}
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
                value={this.state.responsibility}
                onChangeText={(responsibility) => this.setState({responsibility:responsibility})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={[styles.inputForm, {minHeight:50}]}
                multiline={true}
            />
            <View style={{flexDirection:'row', marginTop:10,justifyContent:'flex-end'}}>
                <Button raised primary text="Add" onPress={() => {this.addJob()}} />
            </View>
            <View style={{height:100}}></View>
            </ScrollView>
            <Modal
                transparent={true}
                visible={this.state.refreshing}
                onRequestClose={() => {
                    console.log('Model Closed')
                }}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator size="large" color="#00ff00" /></View>
            </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    inputForm:{
        fontSize:12,
        width:'100%',
        color:'#000'
    },
    input:{
        fontSize:12,
        color:'#000',
    }
});
