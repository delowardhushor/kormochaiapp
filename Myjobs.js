import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, FlatList, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import ionicons from 'react-native-vector-icons/dist/Ionicons';
import language from './lan.json';
import JobDetails from './JobDetails';
import AddJobs from './AddJobs';
import AddClientServices from './AddClientServices';
import AddServices from './AddServices';
import _ from 'lodash';

import { Button, Toolbar } from 'react-native-material-ui';


type Props = {};
export default class Myjobs extends Component<Props> {

  constructor(props) {
      super(props);
      this.state = {
        watchChange:false,
        modelVisible:false,
        addModelVisible:false,
        update:false,
        updateData:[],
      };
    }

  componentWillMount(){
    if(this.props.appStore.userdata.length  === 0 ){
      appStore = this.props.appStore;
      appStore.activeTab = 'Login';
      this.props.updateAppstore(appStore);
    }else if(this.props.appStore.loginNow == true && this.props.appStore.usertype !== 'employees'){
      this.setState({addModelVisible:true});
      appStore = this.props.appStore;
      appStore.loginNow = false;
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
    this.setState({update:false});
  }

  clsAddJobs = () => {
    this.setState({addModelVisible:false});
    this.setState({update:false});
  }

  addOrProfile = () => {
    if(this.props.appStore.usertype == 'employees'){
      this.toProfile();
    }else{
      this.setState({addModelVisible:true})
    }
  }

  renderUserMsg = () => {
    if(this.props.appStore.usertype == 'employees'){
      return language.jobYouApplied[this.props.appStore.lan];
    }else if(this.props.appStore.usertype == 'employers'){
      return language.jobYouPost[this.props.appStore.lan];
    }else if(this.props.appStore.usertype == 'clients'){
      return language.serYouReq[this.props.appStore.lan];
    }else if(this.props.appStore.usertype == 'partners'){
      return language.serYouPost[this.props.appStore.lan];
    }
  }

  setUpdateData(data){
    this.setState({updateData:data});
    this.setState({update:true});
    this.setState({addModelVisible:true});
  }

  render() {
    let {usertype, userdata, lan} = this.props.appStore;
    return (
      <View>
        <Toolbar
          style={{ container: {'backgroundColor':'#ca0000'}}}
          // leftElement="menu"
          centerElement={this.renderUserMsg()}
          rightElement={usertype !== 'employees' ? 'add-circle' : 'account-box'}
          onRightElementPress={() => this.addOrProfile()}
        />
        <View style={{alignItems:'center'}}>
          <Text style={{textAlign:'center',fontWeight:'900', fontSize:16, color:'#000', marginVertical:10}}>{language.refCode[lan]}: {userdata.refer_code}</Text>
          {(this.props.appStore.myJobs.length == 0) &&
          <Text style={styles.noPostText}>{usertype == 'employees' ? language.nojobYouApplied[lan] : language.nojobYouPost[lan]} </Text>
          }
          {(this.props.appStore.usertype == 'employees' || this.props.appStore.usertype == 'employers' ) &&
          <FlatList
            style={{height:300}}
            data={ _.orderBy(this.props.appStore.myJobs, ['id'],['desc'])}
            extraData={this.state.watchChange}
            style={{width:'90%'}}
            keyExtractor={(item, index) => 'key'+index}
            renderItem={({item, index}) => 
            <View style={{display:item.active > 0 ? 'flex' : 'none', borderBottomColor:'#ddd', borderBottomWidth:1, paddingVertical:20, paddingBottom:this.props.appStore.myJobs.length == index+1 ? 300 : 20}}>
              <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:'center'}}>
                <Text style={{fontSize:16, color:'#000', fontWeight:'900'}}>{item.job_title}</Text>
                <Text style={{fontSize:16, color:'#000', fontWeight:'900'}}>{this.props.usertype == 'employers' ? item.salary : item.admin_salary}/{item.salary_type}</Text>
              </View>
              <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:'center'}}>
                <View style={{width:'60%'}}>
                  <Text style={{fontSize:12, color:'#000'}}>{item.company_name}</Text>
                  <Text style={{fontSize:12, color:'#000'}}>{item.location}</Text>
                  <Text style={{fontSize:12, color:'#000'}}>{item.education}</Text>
                </View>
                <TouchableOpacity style={{maxWidth:'40%', backgroundColor:'#ca0000', borderRadius:20, paddingVertical:5, paddingHorizontal:20}} onPress={() => this.openJobDetails(item)} >
                  <Text style={{color:'#fff', fontSize:12}}><Icon name='eye' /> {language.details[lan]}</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          />
          }

          {(this.props.appStore.usertype == 'clients' ) &&
          <FlatList
            data={ _.orderBy(this.props.appStore.myJobs, ['id'],['desc'])}
            extraData={this.state.watchChange}
            style={{width:'90%'}}
            keyExtractor={(item, index) => 'key'+index}
            renderItem={({item, index}) => 
            (
              <View style={{borderBottomColor:'#ddd', borderBottomWidth:1, paddingVertical:20, paddingBottom:this.props.appStore.myJobs.length == index+1 ? 300 : 20}}>
                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:'center'}}>
                  <Text style={{fontSize:16, color:'#000', fontWeight:'900'}}>{JSON.parse(item.service).cat}</Text>
                  <Text style={{fontSize:16, color:'#000', fontWeight:'900'}}></Text>
                </View>
                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:'center'}}>
                  <View>
                    <Text style={{fontSize:12, color:'#000'}}>{item.area}</Text>
                    <Text style={{fontSize:12, color:'#000'}}>{item.thana}</Text>
                    <Text style={{fontSize:12, color:'#000'}}>{item.district}</Text>
                  </View>
                  <TouchableOpacity style={{backgroundColor:'#ca0000', borderRadius:20, paddingVertical:5, paddingHorizontal:20}} onPress={() => this.setUpdateData(item)} >
                    <Text style={{color:'#fff', fontSize:12}}><Icon name='eye' /> {language.details[lan]}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
          />
          }

          {(this.props.appStore.usertype == 'partners') &&
          <FlatList
            style={{height:100}}
            data={_.orderBy(this.props.appStore.myJobs, ['id'],['desc'])}
            extraData={this.state.watchChange}
            style={{width:'90%'}}
            keyExtractor={(item, index) => 'key'+index}
            renderItem={({item, index}) => 
            (
              <View style={{borderBottomColor:'#ddd', borderBottomWidth:1, paddingVertical:20, paddingBottom:this.props.appStore.myJobs.length == index+1 ? 300 : 20 }}>
                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:'center'}}>
                  <Text style={{fontSize:16, color:'#000', fontWeight:'900'}}>{JSON.parse(item.profession).cat}</Text>
                  <Text style={{fontSize:16, color:'#000', fontWeight:'900'}}></Text>
                </View>
                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:'center'}}>
                  <View>
                    <Text style={{fontSize:12, color:'#000'}}>{item.pre_area}</Text>
                    <Text style={{fontSize:12, color:'#000'}}>{item.pre_thana}</Text>
                    <Text style={{fontSize:12, color:'#000'}}>{item.pre_district}</Text>
                  </View>
                  <TouchableOpacity style={{backgroundColor:'#ca0000', borderRadius:20, paddingVertical:5, paddingHorizontal:20}} onPress={() => this.setUpdateData(item)} >
                    <Text style={{color:'#fff', fontSize:12}}><Icon name='eye' /> {language.details[lan]}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
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
          <AddServices  update={this.state.update} updateData={this.state.updateData} clsAddJobs={this.clsAddJobs} appStore={this.props.appStore} updateAppstore={this.props.updateAppstore} />
          }
          {(this.props.appStore.usertype == 'clients') &&
          <AddClientServices update={this.state.update} updateData={this.state.updateData} clsAddJobs={this.clsAddJobs} appStore={this.props.appStore} updateAppstore={this.props.updateAppstore} />
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
