import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Modal, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import language from './lan.json';
import BottomNavigation, { FullTab ,Badge,ShiftingTab} from 'react-native-material-bottom-navigation';

import { Toolbar, Button } from 'react-native-material-ui';
import {getKey, setKey, resetKey} from './lib/lib';
import axios from 'axios';

import Home from './Home';
import Profile from './Profile';
import Myjobs from './Myjobs';
import Settings from './Settings';
import Login from './Login';
import Educative from './Educative';

type Props = {};


export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      appStore : {
        activeTab : 'Home',
        baseUrl : 'https://delowarhossaintb.000webhostapp.com/api/',
        usertype :'',
        userdata:[],
        settings:[],
        lan:'eng',
        jobs:[],
        locations:[],
        educatives:[],
        cats:[],
        myjobs:[],
        JobDetails:[],
      },
      modelVisible:true,
    };
    //this.focusNextField = this.focusNextField.bind(this);
    //this.inputs = {};
  }

  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  )
 
  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )

  async componentWillMount(){
    //resetKey('appStore');
    var appStore = await getKey('appStore');
    if(appStore !== null){
      this.setState({appStore:appStore});
      if(appStore.usertype !== ''){
        this.setState({modelVisible:false});
        console.log(appStore)
      }
    }

    this.getJobs();
    setInterval(() =>{
      this.getJobs();
    }, 10000);
  }

  getJobs(){
    axios.post(this.state.appStore.baseUrl+"intervalJob",{
      usertype:this.state.appStore.usertype,
      id:this.state.appStore.userdata.length == 0 ? '' : this.state.appStore.userdata.id,
    })
    .then((res) => {
      console.log(res);
      if(res.data.success === true){
        var appStore = JSON.parse(JSON.stringify(this.state.appStore));
        appStore.jobs = res.data.jobs;
        appStore.myJobs = res.data.myJobs;
        appStore.locations = res.data.locations;
        appStore.cats = res.data.cats;
        appStore.educatives = res.data.educatives;
        this.updateAppstore(appStore);
      }
      
    })
    .catch((err) => {
        console.log(err);
    })
    console.log(this.state)
  }

  changeActiveTab(tab){
    var appStore = JSON.parse(JSON.stringify(this.state.appStore));
    appStore.activeTab = tab;
    this.updateAppstore(appStore);
    console.log(appStore, tab)
  }

  updateAppstore = (data) => {
    this.setState({appStore:data});
    setKey('appStore', data);
  }

  setUserType(data){
    var appStore = JSON.parse(JSON.stringify(this.state.appStore));
    appStore.usertype = data;
    appStore.activeTab = 'Login';
    this.setState({modelVisible:false});
    this.updateAppstore(appStore);
  }

  setmodelVisible = () => {
    this.setState({modelVisible:true});
  }

  render() {
    let{lan} = this.state.appStore;
    tabs = [
      {
        key: 'Home',
        icon: 'home',
        label: language.home[lan],
        barColor: '#4CAF50',
        pressColor: 'rgba(255, 255, 255, 0.16)'
      },
      {
        key: 'Myjobs',
        icon: 'briefcase',
        label: language.myJobs[lan],
        barColor: '#B71C1C',
        pressColor: 'rgba(255, 255, 255, 0.16)'
      },
      {
        key: 'Educative',
        icon: 'university',
        label: language.educative[lan],
        barColor: '#B71C1C',
        pressColor: 'rgba(255, 255, 255, 0.16)'
      },
      {
        key: 'Settings',
        icon: 'cogs',
        label: language.settings[lan],
        barColor: '#F06292',
        pressColor: 'rgba(255, 255, 255, 0.16)'
      }
    ];

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {(this.state.appStore.activeTab === 'Home') && <Home appStore={this.state.appStore} updateAppstore={this.updateAppstore} />}
          {(this.state.appStore.activeTab === 'Myjobs') && <Myjobs appStore={this.state.appStore} updateAppstore={this.updateAppstore} />}
          {(this.state.appStore.activeTab === 'Profile') && <Profile appStore={this.state.appStore} updateAppstore={this.updateAppstore} />}
          {(this.state.appStore.activeTab === 'Settings') && <Settings appStore={this.state.appStore} updateAppstore={this.updateAppstore} setmodelVisible={this.setmodelVisible} />}
          {(this.state.appStore.activeTab === 'Login') && <Login appStore={this.state.appStore} updateAppstore={this.updateAppstore}  />}
          {(this.state.appStore.activeTab === 'Educative') && <Educative appStore={this.state.appStore} updateAppstore={this.updateAppstore}  />}

        </View>
        <BottomNavigation
          onTabPress={newTab => this.changeActiveTab(newTab.key)}
          renderTab={this.renderTab}
          tabs={tabs}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modelVisible}
          onRequestClose={() => {
            console.log('Model Closed');
          }}>
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <View style={{width:'90%'}}>
              <Button raised primary text="I am Employee" onPress={() => this.setUserType('employees')} />
              <View style={{height:20}}></View>
              <Button raised primary text="I am Emplyer" onPress={() => this.setUserType('employers')} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn:{
    backgroundColor: '#43a047',
    width:150,
    height:40,
    alignItems:'center',
    justifyContent:'center'
  },
  btnText:{
    color:'#fff',
  }
});
