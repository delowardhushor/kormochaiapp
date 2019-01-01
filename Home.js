import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, FlatList, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Lan from './lan.json';
import JobDetails from './JobDetails';

import { Button, Toolbar } from 'react-native-material-ui';


type Props = {};
export default class Home extends Component<Props> {

  constructor(props) {
        super(props);
        this.state = {
          watchChange:false,
          modelVisible:false,
        };
    }

  componentWillMount(){

  }

  componentWillReceiveProps(){

  }

  openJobDetails(details){
    var appStore = this.props.appStore;
    appStore.JobDetails = details;
    this.props.updateAppstore(appStore);
    this.setState({modelVisible:true});
  }

  toProfile = () => {
    var appStore = this.props.appStore;
    appStore.activeTab = 'Profile';
    this.props.updateAppstore(appStore);
  }

  clsJobDetails = () => {
    this.setState({modelVisible:false});
  }

  render() {
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
          rightElement={this.props.appStore.usertype == 'employees' ? "account-box" : "" }
          onRightElementPress={ () => { this.toProfile() }}
        />
        <Text style={{marginTop:10, textAlign:'center', color:'#000'}}>SCROLL FOR JOBS <Icon name="angle-double-down" /></Text>
        <View style={{alignItems:'center'}}>
          <FlatList
            data={this.props.appStore.jobs}
            extraData={this.state.watchChange}
            style={{width:'90%'}}
            keyExtractor={(item, index) => 'key'+index}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
