import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Lan from './lan.json';

import { Button, Toolbar } from 'react-native-material-ui';


type Props = {};
export default class JobDetails extends Component<Props> {

  constructor(props) {
        super(props);
        this.state = {
          watchChange:false,
        };
    }

  componentWillMount(){
    console.log(this.state.jobs);
  }

  componentWillReceiveProps(){

  }

  jobDetails(details){
    var appStore = this.props.appStore;
    appStore.jobDetails = details;
    appStore.activeTab = 'JobDetails';
    this.props.updateAppstore(appStore);
  }

  apply(){
    alert("success");
  }

  render() {
    let {JobDetails} = this.props.appStore;
    return (
      <View>
        <Toolbar
          style={{ container: {'backgroundColor':'#4CAF50'}}}
          leftElement="chevron-left"
          onLeftElementPress={ () => { this.props.clsJobDetails() }}
          centerElement={JobDetails.job_title+" Details"}
        />
        <View style={{alignItems:'center'}}>
          <ScrollView style={{width:'90%'}}>
            <View style={{flexDirection:"column",alignItems:'center', justifyContent:'space-between'}}>
              <Text style={[styles.text, {fontSize:22,marginTop:20, }]} >{JobDetails.job_title}</Text>
              <Text style={[styles.text, {fontSize:18,marginTop:10, }]} >{JobDetails.salary} / month{JobDetails.salary_type}</Text>
            </View>
            <View style={{flexDirection:"row",alignItems:'center', marginTop:20}}>
              <Text style={styles.label}>Company Name:</Text>
              <Text style={styles.value}>{JobDetails.company_name}</Text>
            </View>
            <View style={{flexDirection:"row",alignItems:'center', marginTop:10}}>
              <Text style={styles.label}>Location:</Text>
              <Text style={styles.value}>{JobDetails.location}</Text>
            </View>
            <View style={{flexDirection:"row",alignItems:'center', marginTop:10}}>
              <Text style={styles.label}>Job Hour :</Text>
              <Text style={styles.value}>{JobDetails.office_hour}</Text>
            </View>
            <View style={{flexDirection:"row",alignItems:'center', marginTop:10}}>
              <Text style={styles.label}>Job type:</Text>
              <Text style={styles.value}>{JobDetails.job_type}</Text>
            </View>
            {(JobDetails.interview == 'true') &&
            <View style={{flexDirection:"row",alignItems:'center', marginTop:10}}>
              <Text style={styles.label}>Interview {"Date"}:</Text>
              <Text style={styles.value}>{JobDetails.interview_date}</Text>
            </View>
            }
            <View style={{flexDirection:"row",alignItems:'center', marginTop:10}}>
              <Text style={styles.label}>Starting Date:</Text>
              <Text style={styles.value}>{JobDetails.job_date}</Text>
            </View>

            <View style={styles.hr}></View>

            <View style={{width:'100%', marginTop:10}}>
              <Text style={[styles.label, {width:'100%', fontSize:16, color:'grey'}]}>Educational Requriment:</Text>
              <Text style={[styles.value, {width:"100%", marginTop:10}]}>{JobDetails.education}</Text>
            </View>

            <View style={styles.hr}></View>

            <View style={{width:'100%', marginTop:10}}>
              <Text style={[styles.label, {width:'100%', fontSize:16, color:'grey'}]}>Job Responsibility:</Text>
              <Text style={[styles.value, {width:"100%", marginTop:10}]}>{JobDetails.job_responsibility}</Text>
            </View>
            <View style={{width:'100%', marginTop:20}}>
              <Button primary raised onPress={() => this.apply()} text="APPLY" />
            </View>
          </ScrollView>
        </View>
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
