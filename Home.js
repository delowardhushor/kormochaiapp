import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, Picker} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import language from './lan.json';
import JobDetails from './JobDetails';

import { Button, Toolbar } from 'react-native-material-ui';


type Props = {};
export default class Home extends Component<Props> {

  constructor(props) {
        super(props);
        this.state = {
          watchChange:false,
          modelVisible:false,
          search:false,
          category:'',
          location:'',
          searchedJobs:[],
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

  search(location, category){
    this.setState({location:location});
    this.setState({category:category});
    var searchedJobs = [];
    var jobs = JSON.parse(JSON.stringify(this.props.appStore.jobs));
    if(location === ''){
      searchedJobs = jobs;
    }else{
      for(var i = 0; jobs.length > i; i++){
        var storelocation = jobs[i].location.toLowerCase();
        var storecategory = jobs[i].category.toLowerCase();
        if(storelocation.indexOf(location.toLowerCase()) !== -1 && storecategory.indexOf(category.toLowerCase()) !== -1){
          searchedJobs.push(jobs[i]);
        }
      }
    }
    this.setState({searchedJobs:searchedJobs});
    this.setState({search:true});
    this.setState({watchChange:!this.state.watchChange});
  }

  clsSearch(){
    this.setState({search:false});
    this.setState({watchChange:!this.state.watchChange});
  }

  render() {
    const Cats = this.props.appStore.cats.map((item, index) => {
        return <Picker.Item key={index} label={item.cat} value={item.cat} />
    });

    const Locations = this.props.appStore.locations.map((item, index) => {
        return <Picker.Item key={index} label={item.location} value={item.location} />
    });
    
    let{lan} = this.props.appStore;

    return (
      <View>
        <Toolbar
          style={{ container: {'backgroundColor':'#ca0000'}}}
          // leftElement="menu"
          centerElement={language.kormochai[lan]}
          rightElement={this.props.appStore.usertype == 'employees' ? "account-box" : "" }
          onRightElementPress={ () => { this.toProfile() }}
        />
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', height:40, alignItems:'center', marginTop:10}}>
          <Picker
              selectedValue={this.state.category}
              style={{ height: 40, width: '45%' }}
              onValueChange={(itemValue, itemIndex) => this.search(this.state.location ,itemValue)}>
              <Picker.Item label={language.anyloc[lan]} value='' />
              {Locations}
          </Picker>
          <Picker
              selectedValue={this.state.location}
              style={{ height: 40, width: "45%" }}
              onValueChange={(itemValue, itemIndex) => this.search(itemValue, this.state.category)}>
              <Picker.Item label={language.anycat[lan]} value='' />
              {Cats}              
          </Picker>
        </View>
        <View style={{alignItems:'center'}}>
          <FlatList
            data={this.state.search === true ? this.state.searchedJobs : this.props.appStore.jobs}
            extraData={this.state.watchChange}
            style={{width:'90%'}}
            keyExtractor={(item, index) => 'key'+index}
            renderItem={({item, index}) => 
            <View style={{borderBottomColor:'#ddd', borderBottomWidth:1, paddingVertical:15}}>
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
                <TouchableOpacity style={{backgroundColor:'#ca0000', borderRadius:20, paddingVertical:5, paddingHorizontal:20}} onPress={() => this.openJobDetails(item)} >
                  <Text style={{color:'#fff', fontSize:12}}><Icon name='eye' /> {language.details[lan]}</Text>
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
