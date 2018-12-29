import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Modal, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Lan from './lan.json';
import BottomNavigation, { FullTab ,Badge,ShiftingTab} from 'react-native-material-bottom-navigation';

import { Toolbar, Button } from 'react-native-material-ui';
import {getKey, setKey, resetKey} from './lib/lib';

import Home from './Home';
import Profile from './Profile';
import Myjobs from './Myjobs';
import Settings from './Settings';
import Login from './Login';

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      activeTab : 'Login',
      appStore : {
        usertype :'',
        userdata:[],
        settings:[],
        lan:'eng',
      },
      modelVisible:false,
    };
    //this.focusNextField = this.focusNextField.bind(this);
    //this.inputs = {};
  }

  tabs = [
    {
      key: 'Home',
      icon: 'home',
      label: 'Home',
      barColor: '#4CAF50',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'Myjobs',
      icon: 'briefcase',
      label: 'My Jobs',
      barColor: '#B71C1C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'Profile',
      icon: 'user',
      label: 'Profile',
      barColor: '#1565C0',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'Settings',
      icon: 'cogs',
      label: 'Settings',
      barColor: '#F06292',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    }
  ];

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
    var appStore = await getKey('appStore');
    if(appStore !== null){
      this.setState({appStore:appStore});
      if(appStore.usertype !== ''){
        this.setState({modelVisible:false});
      }
    }
    console.log(appStore)
  }

  updateAppstore = (field, data) => {
    var appStore = JSON.parse(JSON.stringify(this.state.appStore));
    appStore[field] = data;
    this.setState({appStore:appStore});
  }

  setUserType(data){
    this.setState({usertype:data});
    this.setState({modelVisible:false});
    var appStore = JSON.parse(JSON.stringify(this.state.appStore));
    appStore.usertype = data;
    this.setState({appStore:appStore});
    setKey('appStore', appStore);
    this.setState({ activeTab: 'Login' });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {(this.state.activeTab === 'Home') && <Home appStore={this.state.appStore} updateAppstore={this.updateAppstore} />}
          {(this.state.activeTab === 'Myjobs') && <Myjobs appStore={this.state.appStore} updateAppstore={this.updateAppstore} />}
          {(this.state.activeTab === 'Profile') && <Profile appStore={this.state.appStore} updateAppstore={this.updateAppstore} />}
          {(this.state.activeTab === 'Settings') && <Settings appStore={this.state.appStore} updateAppstore={this.updateAppstore} />}
          {(this.state.activeTab === 'Login') && <Login appStore={this.state.appStore} updateAppstore={this.updateAppstore} />}
        </View>
        <BottomNavigation
          onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          tabs={this.tabs}
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
              <Button raised primary text="I am Employee" onPress={() => this.setUserType('employee')} />
              <View style={{height:80}}></View>
              <Button raised primary text="I am Emplyer" onPress={() => this.setUserType('employer')} />
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
