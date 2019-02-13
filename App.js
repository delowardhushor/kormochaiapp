import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, AsyncStorage, Image} from 'react-native';
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
import About from './About';
import Contact from './Contact';
import CngPass from './CngPass';

type Props = {};


export default class App extends Component<Props> {

  Slide = [
    "https://kormochai.com/kormochaiapp/img/slide1.jpg",
    "https://kormochai.com/kormochaiapp/img/slide2.jpg",
    "https://kormochai.com/kormochaiapp/img/slide3.jpg",
    "https://kormochai.com/kormochaiapp/img/slide4.jpg",
  ];

  constructor(props) {
    super(props);
    this.state = {
      appStore : {
        activeTab : 'Home',
        baseUrl : 'https://kormochai.com/kormochaiapp/api/',
        usertype :'',
        userdata:[],
        settings:[],
        lan:'ban',
        jobs:[],
        locations:[],
        educatives:[],
        cats:[],
        clicats:[],
        parcats:[],
        myJobs:[],
        JobDetails:[],
        activeSlide:0,
        loginNow:false,
        pendingApply:false,
      },
      modelVisible:true,
    };
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
      }
    }

    this.getJobs();
    setInterval(() =>{
      this.getJobs();
    }, 10000);

    this.slide();
    setInterval(() =>{
      this.slide();
    }, 3000);
  }

  slide(){
    var activeSlide = this.state.activeSlide;
    if(activeSlide < this.Slide.length-1){
      this.setState({activeSlide:activeSlide+1})
    }else{
      this.setState({activeSlide:0});
      console.log("sdsdds")
    }
  }

  getJobs(){
    axios.post(this.state.appStore.baseUrl+"intervalJob",{
      usertype:this.state.appStore.usertype,
      id:this.state.appStore.userdata.length == 0 ? '' : this.state.appStore.userdata.id,
    })
    .then((res) => {
      if(res.data.success === true){
        var appStore = JSON.parse(JSON.stringify(this.state.appStore));
        appStore.jobs = res.data.jobs;
        appStore.myJobs = res.data.myJobs;
        appStore.locations = res.data.locations;
        appStore.cats = res.data.cats;
        appStore.clicats = res.data.clicats;
        appStore.parcats = res.data.parcats;
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

  returnTab = () => {
    let{lan} = this.state.appStore;
    if(this.state.appStore.usertype == 'employees'){
      return [
        {
          key: 'Home',
          icon: 'home',
          label: language.home[lan],
          barColor: '#ca0000',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'Myjobs',
          icon: 'briefcase',
          label: this.state.appStore.usertype == 'employees' || this.state.appStore.usertype == 'employers' ?  language.myJobs[lan] : language.mySer[lan],
          barColor: '#9400D3',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'Educative',
          icon: 'university',
          label: language.educative[lan],
          barColor: '#8B008B',
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
    }else{
      return [
        {
          key: 'Myjobs',
          icon: 'briefcase',
          label: this.state.appStore.usertype == 'employees' || this.state.appStore.usertype == 'employers' ?  language.myJobs[lan] : language.mySer[lan],
          barColor: '#9400D3',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'Educative',
          icon: 'university',
          label: language.educative[lan],
          barColor: '#8B008B',
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
    }
  }

  render() {
    let{lan} = this.state.appStore;
    
    console.log(this.state.activeSlide)

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {(this.state.appStore.activeTab === 'Home') && <Home appStore={this.state.appStore} updateAppstore={this.updateAppstore} />}
          {(this.state.appStore.activeTab === 'Myjobs') && <Myjobs appStore={this.state.appStore} updateAppstore={this.updateAppstore} />}
          {(this.state.appStore.activeTab === 'Profile') && <Profile appStore={this.state.appStore} updateAppstore={this.updateAppstore} />}
          {(this.state.appStore.activeTab === 'Settings') && <Settings appStore={this.state.appStore} updateAppstore={this.updateAppstore} setmodelVisible={this.setmodelVisible} />}
          {(this.state.appStore.activeTab === 'Login') && <Login appStore={this.state.appStore} updateAppstore={this.updateAppstore}  />}
          {(this.state.appStore.activeTab === 'Educative') && <Educative appStore={this.state.appStore} updateAppstore={this.updateAppstore}  />}
          {(this.state.appStore.activeTab === 'About') && <About appStore={this.state.appStore} updateAppstore={this.updateAppstore}  />}
          {(this.state.appStore.activeTab === 'Contact') && <Contact appStore={this.state.appStore} updateAppstore={this.updateAppstore}  />}
          {(this.state.appStore.activeTab === 'CngPass') && <CngPass appStore={this.state.appStore} updateAppstore={this.updateAppstore}  />}

        </View>
        <BottomNavigation
          onTabPress={newTab => this.changeActiveTab(newTab.key)}
          renderTab={this.renderTab}
          tabs={this.returnTab()}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modelVisible}
          onRequestClose={() => {
            console.log('Model Closed');
          }}>
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ScrollView style={{width:'90%'}}>
              <Image 
                style={{width:'100%', height:200, marginVertical:50 }}  
                source={{uri:this.Slide[this.state.activeSlide]}} 
              />
              <Button raised primary text={language.iAmEmployee[lan]} onPress={() => this.setUserType('employees')} />
              <View style={{height:20}}></View>
              <Button raised primary text={language.iAmEmployer[lan]}  onPress={() => this.setUserType('employers')} />
              <View style={{height:20}}></View>
              <Button raised primary text={language.iAmCLi[lan]}  onPress={() => this.setUserType('clients')} />
              <View style={{height:20}}></View>
              <Button raised primary text={language.iAmPar[lan]}  onPress={() => this.setUserType('partners')} />
            </ScrollView>
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
