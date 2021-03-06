import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, FlatList,ToastAndroid, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import language from './lan.json';

import { Button, Toolbar } from 'react-native-material-ui';
import axios from 'axios';


type Props = {};
export default class JobDetails extends Component<Props> {

  constructor(props) {
        super(props);
        this.state = {
          watchChange:false,
          applied:false,
        };
    }

  componentWillMount(){
    this.chkApplied();
  }

  chkApplied(){
    let {myJobs, JobDetails} = this.props.appStore;
    var applied = false;
    for(var i = 0; myJobs.length > i; i++){
      if(myJobs[i].id ==  JobDetails.id){
        applied = true;
        break;
      }
    }
    this.setState({applied:applied});
  }

  componentWillReceiveProps(){

  }

  apply(){
    if(this.state.applied ===  true){
      ToastAndroid.show(language.applied[this.props.appStore.lan], 3000);
    }else if(this.props.appStore.userdata.length == 0){
      ToastAndroid.show('Please Signin For Apply', 3000);
      var appStore = this.props.appStore;
      appStore.activeTab = 'Login';
      this.props.updateAppstore(appStore);
    }else if(!this.props.appStore.userdata.name || !this.props.appStore.userdata.age || !this.props.appStore.userdata.gender || !this.props.appStore.userdata.education || !this.props.appStore.userdata.district){
      ToastAndroid.show('Please Fill Your Info', 3000);
      var appStore = this.props.appStore;
      appStore.pendingApply = true;
      appStore.activeTab = 'Profile';
      this.props.updateAppstore(appStore);
    }else{
      axios.post(this.props.appStore.baseUrl+'applications',{
        job_id:this.props.appStore.JobDetails.id,
        employees_id:this.props.appStore.userdata.id,
      })
      .then((res)=>{
        ToastAndroid.show(language.applySuc[this.props.appStore.lan], 3000);
        this.props.clsJobDetails();
      })
      .catch((err)=>{
        ToastAndroid.show(language.noNet[this.props.appStore.lan], 3000);
      })
    }
  }

  render() {
    let {JobDetails, lan} = this.props.appStore;
    return (
      <View style={{alignItems:'center', justifyContent:'center', height:'100%'}}>
        <Toolbar
          style={{ container: {'backgroundColor':'#ca0000'}}}
          leftElement="chevron-left"
          onLeftElementPress={ () => { this.props.clsJobDetails() }}
          centerElement={JobDetails.job_title+" "+language.details[lan]}
        />
        <ScrollView style={{width:'90%'}}>
          <View style={{flexDirection:"column",alignItems:'center', justifyContent:'space-between'}}>
            <Text style={[styles.text, {fontSize:22,marginTop:20, }]} >{JobDetails.job_title}</Text>
            <Text style={[styles.text, {fontSize:18,marginTop:10, }]} >{this.props.usertype == 'employers' ? JobDetails.salary : JobDetails.admin_salary} / {JobDetails.salary_type}</Text>
          </View>
          <Text style={[styles.text, {fontSize:14, marginTop:10}]}>({JobDetails.interview == true ? language.needInt[lan] : language.noneedInt[lan]})</Text>
          <View style={{flexDirection:"row",alignItems:'center', marginTop:20}}>
            <Text style={styles.label}>{language.name[lan]}:</Text>
            <Text style={styles.value}>{JobDetails.name}</Text>
          </View>

          <View style={{flexDirection:"row",alignItems:'center', marginTop:20}}>
            <Text style={styles.label}>{language.phone[lan]}:</Text>
            <Text style={styles.value}>{JobDetails.mobile}</Text>
          </View>

          <View style={{flexDirection:"row",alignItems:'center', marginTop:20}}>
            <Text style={styles.label}>{language.comName[lan]}:</Text>
            <Text style={styles.value}>{JobDetails.company_name}</Text>
          </View>

          <View style={{flexDirection:"row",alignItems:'center', marginTop:20}}>
            <Text style={styles.label}>{language.insAdd[lan]}:</Text>
          </View>
          <View style={{flexDirection:"row",alignItems:'center', marginTop:20}}>
            <Text style={styles.label}>{language.area[lan]}:</Text>
            <Text style={styles.value}>{JobDetails.area}</Text>
          </View>
          <View style={{flexDirection:"row",alignItems:'center', marginTop:20}}>
            <Text style={styles.label}>{language.thana[lan]}:</Text>
            <Text style={styles.value}>{JobDetails.thana}</Text>
          </View>
          <View style={{flexDirection:"row",alignItems:'center', marginTop:20}}>
            <Text style={styles.label}>{language.district[lan]}:</Text>
            <Text style={styles.value}>{JobDetails.zila}</Text>
          </View>
          <View style={{flexDirection:"row",alignItems:'center', marginTop:20}}>
            <Text style={styles.label}>{language.house[lan]}:</Text>
            <Text style={styles.value}>{JobDetails.house}</Text>
          </View>
          <View style={{flexDirection:"row",alignItems:'center', marginTop:20}}>
            <Text style={styles.label}>{language.location[lan]}:</Text>
            <Text style={styles.value}>{JobDetails.location}</Text>
          </View>
          <View style={{flexDirection:"row",alignItems:'center', marginTop:20}}>
            <Text style={styles.label}>{language.employeeNumber[lan]}:</Text>
            <Text style={styles.value}>{JobDetails.employee_number}</Text>
          </View>

          <View style={{flexDirection:"row",alignItems:'center', marginTop:20}}>
            <Text style={styles.label}>{language.genNed[lan]}:</Text>
            <Text style={styles.value}>{JobDetails.employee_type}</Text>
          </View>

          <View style={{flexDirection:"row",alignItems:'center', marginTop:20}}>
            <Text style={styles.label}>{language.salaryDate[lan]}:</Text>
            <Text style={styles.value}>{JobDetails.salary_date}</Text>
          </View>
          <View style={{flexDirection:"row",alignItems:'center', marginTop:20}}>
            <Text style={styles.label}>{language.jobHour[lan]}:</Text>
            <Text style={styles.value}>{JobDetails.office_hour}</Text>
          </View>
          <View style={{flexDirection:"row",alignItems:'center', marginTop:20}}>
            <Text style={styles.label}>{language.jobType[lan]}:</Text>
            <Text style={styles.value}>{JobDetails.job_type}</Text>
          </View>
          {(JobDetails.interview == true) &&
          <View style={{flexDirection:"row",alignItems:'center', marginTop:20}}>
            <Text style={styles.label}>{language.intDate[lan]}:</Text>
            <Text style={styles.value}>{JobDetails.interview_date} - {JobDetails.hour}:{JobDetails.min} {JobDetails.ampm}</Text>
          </View>
          }
          <View style={{flexDirection:"row",alignItems:'center', marginTop:20}}>
            <Text style={styles.label}>{language.jobDate[lan]}:</Text>
            <Text style={styles.value}>{JobDetails.job_date}</Text>
          </View>

          <View style={styles.hr}></View>

          <View style={{width:'100%', marginTop:20}}>
            <Text style={[styles.label, {width:'100%', fontSize:16, color:'grey'}]}>{language.eduQua[lan]}:</Text>
            <Text style={[styles.value, {width:"100%", marginTop:20}]}>{JobDetails.education}</Text>
          </View>

          <View style={styles.hr}></View>

          <View style={{width:'100%', marginTop:20}}>
            <Text style={[styles.label, {width:'100%', fontSize:16, color:'grey'}]}>{language.jobRes[lan]}:</Text>
            <Text style={[styles.value, {width:"100%", marginTop:20}]}>{JobDetails.job_responsibility}</Text>
          </View>
          <View style={{width:'100%', marginTop:20}}>
            <Text style={[styles.label, {width:'100%', fontSize:16, color:'grey'}]}>{language.details[lan]}:</Text>
            <Text style={[styles.value, {width:"100%", marginTop:20}]}>{JobDetails.details}</Text>
          </View>
          {(this.props.appStore.usertype === 'employees') &&
          <View style={{width:'100%', marginTop:20}}>
            <Button primary raised onPress={() => this.apply()} text={this.state.applied === true ? language.applied[lan] : language.apply[lan]} />
          </View>
          }
          <View style={{height:100}}></View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text:{
    color:'#000',
    fontWeight:"bold",
    textAlign:'center',
  },
  label:{
    color:'#000',
    fontWeight:"bold",
    fontSize:14,
    width:'40%',
    color:'grey'
  },
  value:{
    color:'#000',
    fontWeight:"bold",
    fontSize:14,
    width:'60%'
  },
  hr:{
    borderBottomColor:'#000',
    width:'60%',
    borderBottomWidth:0.5,
    marginTop:20,
    marginBottom:10,
    alignSelf:'center',
  }
});
