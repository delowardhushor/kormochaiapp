import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Lan from './lan.json';
import BottomNavigation, { FullTab ,Badge,ShiftingTab} from 'react-native-material-bottom-navigation';

import { Toolbar } from 'react-native-material-ui';

import Home from './Home';
import Profile from './Profile';
import Myjobs from './Myjobs';
import Settings from './Settings';

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      activeTab : 'Home',
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

  componentWillMount(){
    console.log(Lan);
    console.log("sdsdsd");
  }

  _onPressButton(){
    alert("sdsdsd")
  }
  render() {
    console.log(Lan)
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Toolbar
            style={{ container: {'backgroundColor':'#4CAF50'}}}
            // leftElement="menu"
            centerElement="KORMO CHAI"
            // searchable={{
            //   autoFocus: true,
            //   placeholder: 'Search',
            // }}
            rightElement={{
                menu: {
                    icon: "more-vert",
                    labels: ["item 1", "item 2"]
                }
            }}
            onRightElementPress={ (label) => { console.log(label) }}
          />
          {(this.state.activeTab === 'Home') && <Home />}
          {(this.state.activeTab === 'Myjobs') && <Myjobs />}
          {(this.state.activeTab === 'Profile') && <Profile />}
          {(this.state.activeTab === 'Settings') && <Settings />}
        </View>
        <BottomNavigation
          onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          tabs={this.tabs}
        />
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
