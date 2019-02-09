import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import language from './lan.json';

import BottomNavigation, { FullTab,Badge,ShiftingTab } from 'react-native-material-bottom-navigation';
import { Button, Toolbar } from 'react-native-material-ui';
import { resetKey } from './lib/lib.js';
import { Switch } from 'react-native-paper';


type Props = {};
export default class About extends Component<Props> {

  

  componentWillMount(){
    console.log("home");
  }

  toProfile = () => {
    var appStore = this.props.appStore;
    appStore.activeTab = 'Profile';
    this.props.updateAppstore(appStore);
  }
  
  toLogin(){
    var appStore = this.props.appStore;
    appStore.activeTab = 'Login';
    this.props.updateAppstore(appStore);
  }

  toSettings(){
    var appStore = this.props.appStore;
    appStore.activeTab = 'Settings';
    this.props.updateAppstore(appStore);
  }


  render() {
    let {lan} = this.props.appStore;
    return (
      <View>
        <Toolbar
          style={{ container: {'backgroundColor':'#ca0000'}}}
          centerElement={language.aboUs[lan]}
          rightElement={this.props.appStore.usertype == 'employees' ? "account-box" : "" }
          onRightElementPress={ () => { this.toProfile() }}
          leftElement="chevron-left"
          onLeftElementPress={ () => { this.toSettings() }}
        />
        <View>
        <View style={{alignItems:'center', marginTop:10}}>
          <ScrollView style={{width:'90%'}}>
            <Text style={styles.inputForm} >
              কর্মচাই একটি সার্ভিস ও নিয়োগ অ্যাপ। যে অ্যাপের মাধ্যমে আমরা সরাসরি বিভিন্ন ধরনের সার্ভিস দিয়ে থাকি এবং বিভিন্ন প্রতিষ্ঠানে লোক নিয়োগ দিয়ে থাকি।কর্মচাই অ্যাপের মাধ্যমে আমরা যার চাকরি বা দৈনিক কাজ প্রয়োজন তাকে তার যোগ্যতা অনুযায়ী কাজের ব্যবস্থা করে থাকি।কর্ম চাই এমন একটি অ্যাপ যার দৈনিক কাজ অথবা মাসিক চাকরি প্রয়োজন সেও রেজিস্ট্রেশন করতে পারবে অন্যদিকে যাদের সার্ভিস এবং মাসিক লোক প্রয়োজন তারাও রেজিষ্ট্রেশন করতে পারবে।আমরা বিশ্বাষততার সাথে দায়িত্ব্য নিয়ে সার্ভিস দিয়ে থাকি এবং বিভিন্ন প্রতিষ্ঠানে লোক নিয়োগ দিয়ে থাকি।
            </Text>
            <Text style={styles.inputForm} >
                  আমরা ৩ ধরনের কাজ করে থাকি
            </Text>
            <Text style={styles.inputForm} >
                  ১।সার্ভিস{"\n"}{"\n"}
                  AC Service And Repair, {"\n"}Refrigerator Service, {"\n"}TV(LCD+LED)Service, {"\n"}IPS Service, {"\n"}Gas Stove Service, {"\n"}Generator Service, {"\n"}Desktop Service, {"\n"}Laptop Service, {"\n"}CC Camera Setting And Repair Service, {"\n"}Mobile Service And Repair, {"\n"}Plumbing And Sanitary Service, {"\n"}Electrical Service, {"\n"}Steel Works And Repair, {"\n"}Glass And Thai Work, {"\n"}Interior Design, {"\n"}Furniture Work And Repair Service, {"\n"}Beauty Service, {"\n"}Software Solution, {"\n"}Website Making Service, {"\n"}Apps Making Service, {"\n"}Video Making Service, {"\n"}Graphics Design Service, {"\n"}Watch Service, {"\n"}Hotel Booking Service, {"\n"}Decorator Service, {"\n"}Home And Office Moving Service.
            </Text>
            <Text style={styles.inputForm} >
                  ২।লোক নিয়োগ{"\n"}{"\n"}
                  আমরা ছোট বড় সব প্রতিষ্ঠানে লোক নিয়োগ দিয়ে থাকি। 
            </Text>
            <Text style={styles.inputForm} >
                  ৩।প্রডাক্ট সেল{"\n"}{"\n"}
                  বাংলাদেশের যেকোনো জায়গায় যেকোনো পণ্য আমরা ডেলিভারী দিয়ে থাকি।
            </Text>
            <View style={{height:200}}></View>
          </ScrollView>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cngLanText:{
    fontSize:12,
    fontWeight:'bold',
    color:'#000',
    marginTop:20,
  },
  inputForm:{
    textAlign:'justify',
    color:'#000',
    marginTop:20
  },
});
