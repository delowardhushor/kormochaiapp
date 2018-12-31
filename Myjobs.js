import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, FlatList, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import ionicons from 'react-native-vector-icons/dist/Ionicons';
import Lan from './lan.json';
import JobDetails from './JobDetails';
import AddJobs from './AddJobs';

import { Button, Toolbar } from 'react-native-material-ui';


type Props = {};
export default class Myjobs extends Component<Props> {

  constructor(props) {
        super(props);
        this.state = {
          watchChange:false,
          modelVisible:false,
          addModelVisible:false,
          jobs:[{
              "id": 1,
              "employers_id": "1",
              "company_name": "Server Oasis",
              "job_title": "WEB DEVELOPER",
              "education": "Graduation in any Discipline",
              "salary": 12000,
              "office_hour": "9:00 AM - 5:00 PM",
              "location": "Dhaka",
              "job_responsibility": "1. asdsaldsdljaldsk,",
              "interview": "true",
              "interview_date": "12/12/12",
              "job_date": "30/12/18",
              "job_type": "Full Time",
              "Employees": []
              },
              {
              "id": 2,
              "employers_id": "1",
              "company_name": "Server Oasis",
              "job_title": "ACCOUNTANT",
              "education": "Graduation in CSE",
              "salary": 13000,
              "office_hour": "fwefwefwefwefewfe",
              "location": "Gazipur",
              "job_responsibility": "wefewf",
              "interview": "false",
              "interview_date": "",
              "job_date": "wefwef",
              "job_type": "wefwef",
              "Employees": []
              }],
        };
    }

  componentWillMount(){
    console.log(this.state.jobs);
  }

  componentWillReceiveProps(){

  }

  openJobDetails(details){
    var appStore = this.props.appStore;
    appStore.JobDetails = details;
    this.props.updateAppstore(appStore);
    this.setState({modelVisible:true});
  }

  clsJobDetails = () => {
    this.setState({modelVisible:false});
  }

  clsAddJobs = () => {
    this.setState({addModelVisible:false});
  }

  render() {
    console.log(this.state.jobs)
    return (
      <View>
        <Toolbar
          style={{ container: {'backgroundColor':'#4CAF50'}}}
          // leftElement="menu"
          centerElement="KORMO CHAI"
          rightElement="add-circle"
          onRightElementPress={() => this.setState({addModelVisible:true})}
        />
        <Text style={{marginTop:10, textAlign:'center', color:'#000'}}>SCROLL FOR JOBS <Icon name="angle-double-down" /></Text>
        <View style={{alignItems:'center'}}>
          <FlatList
            data={this.state.jobs}
            extraData={this.state.watchChange}
            style={{width:'90%'}}
            renderItem={({item, index}) => 
            <View style={{borderBottomColor:'#ddd', borderBottomWidth:1, paddingVertical:20}}>
              <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:'center'}}>
                <Text style={{fontSize:16, color:'#000', fontWeight:'900'}}>{item.job_title}</Text>
                <Text style={{fontSize:16, color:'#000', fontWeight:'900'}}>{item.salary}/Month{item.salary_type}</Text>
              </View>
              <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:'center'}}>
                <View>
                  <Text style={{fontSize:12, color:'#000'}}>{item.company_name}</Text>
                  <Text style={{fontSize:12, color:'#000'}}>{item.location}</Text>
                  <Text style={{fontSize:12, color:'#000'}}>{item.education}</Text>
                </View>
                <TouchableOpacity style={{backgroundColor:'#4CAF50', borderRadius:20, paddingVertical:5, paddingHorizontal:20}} onPress={() => this.openJobDetails(item)} >
                  <Text style={{color:'#fff', fontSize:12}}><Icon name='eye' /> Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          />
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modelVisible}
          onRequestClose={() => {
            console.log('Model Closed');
          }}>
          <JobDetails clsJobDetails={this.clsJobDetails} appStore={this.props.appStore} updateAppstore={this.props.updateAppstore} />
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.addModelVisible}
          onRequestClose={() => {
            console.log('Model Closed');
          }}>
          <AddJobs clsAddJobs={this.clsAddJobs} appStore={this.props.appStore} updateAppstore={this.props.updateAppstore} />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
