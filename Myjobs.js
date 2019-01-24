import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, FlatList, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import ionicons from 'react-native-vector-icons/dist/Ionicons';
import language from './lan.json';
import JobDetails from './JobDetails';
import AddJobs from './AddJobs';
import AddClientServices from './AddClientServices';
import AddServices from './AddServices';

import { Button, Toolbar } from 'react-native-material-ui';


type Props = {};
export default class Myjobs extends Component<Props> {

  constructor(props) {
      super(props);
      this.state = {
        watchChange:false,
        modelVisible:false,
        addModelVisible:false,
      };
    }

  componentWillMount(){
    if(this.props.appStore.userdata.length  === 0 ){
        appStore = this.props.appStore;
        appStore.activeTab = 'Login';
        this.props.updateAppstore(appStore);
    }
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

  clsAddJobs = () => {
    this.setState({addModelVisible:false});
  }

  render() {
    let {usertype, userdata, lan} = this.props.appStore;
    return (
      <View>
        <Toolbar
          style={{ container: {'backgroundColor':'#4CAF50'}}}
          // leftElement="menu"
          centerElement={usertype === 'employers' ? language.jobYouPost[lan] : language.jobYouApplied[lan]}
          rightElement={usertype !== 'employees' ? 'add-circle' : ''}
          onRightElementPress={() => this.setState({addModelVisible:true})}
        />
        <View style={{alignItems:'center'}}>
          {(this.props.appStore.myJobs.length == 0) &&
          <Text style={styles.noPostText}>{usertype == 'employees' ? language.nojobYouApplied[lan] : language.nojobYouPost[lan]} </Text>
          }
          {(this.props.appStore.usertype == 'employees' || this.props.appStore.usertype == 'employers' ) &&
          <FlatList
            data={this.props.appStore.myJobs}
            extraData={this.state.watchChange}
            style={{width:'90%'}}
            keyExtractor={(item, index) => 'key'+index}
            renderItem={({item, index}) => 
            <View style={{borderBottomColor:'#ddd', borderBottomWidth:1, paddingVertical:20}}>
              <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:'center'}}>
                <Text style={{fontSize:16, color:'#000', fontWeight:'900'}}>{item.job_title}</Text>
                <Text style={{fontSize:16, color:'#000', fontWeight:'900'}}>{item.salary}/{item.salary_type}</Text>
              </View>
              <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:'center'}}>
                <View>
                  <Text style={{fontSize:12, color:'#000'}}>{item.company_name}</Text>
                  <Text style={{fontSize:12, color:'#000'}}>{item.location}</Text>
                  <Text style={{fontSize:12, color:'#000'}}>{item.education}</Text>
                </View>
                <TouchableOpacity style={{backgroundColor:'#4CAF50', borderRadius:20, paddingVertical:5, paddingHorizontal:20}} onPress={() => this.openJobDetails(item)} >
                  <Text style={{color:'#fff', fontSize:12}}><Icon name='eye' /> {language.details[lan]}</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          />
          }
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
          {(this.props.appStore.usertype == 'employers') &&
          <AddJobs clsAddJobs={this.clsAddJobs} appStore={this.props.appStore} updateAppstore={this.props.updateAppstore} />
          }
          {(this.props.appStore.usertype == 'partners') &&
          <AddServices clsAddJobs={this.clsAddJobs} appStore={this.props.appStore} updateAppstore={this.props.updateAppstore} />
          }
          {(this.props.appStore.usertype == 'clients') &&
          <AddClientServices clsAddJobs={this.clsAddJobs} appStore={this.props.appStore} updateAppstore={this.props.updateAppstore} />
          }
          </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noPostText:{
    fontSize:12,
    fontWeight:'bold',
    color:'#000',
    marginTop:20,
  }
});
