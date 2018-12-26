import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput,CheckBox, View,ScrollView,Modal,FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Lan from './lan.json';

import { Button } from 'react-native-material-ui';

import Addededucation from './Addeducation';

type Props = {};
export default class Profile extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            underlineColor: '#ddd',
            date:"2016-05-15",
            modalVisible:false,
            profileData:{
                name:'',
                address:'',
                area:'',
                education:[],
                thana:'',
                post:'',
                district:'',
                age:'',
                gender:'Male',
                watchChange:false,
            }
        };
        this.focusNextField = this.focusNextField.bind(this);
        this.inputs = {};
    }

    focusNextField(id) {
        setTimeout(() => {
          this.inputs[id].focus();
        }, 100);
    }

  componentWillMount(){
    console.log("home");
  }

  cngProfileData = (field, value) => {
    var profileData = this.state.profileData;
    profileData[field] = value;
    this.setState({profileData:profileData});
    
  }

  addEducation = (value) => {
    console.log(profileData);
    var profileData = this.state.profileData;
    profileData.education.push(value);
    this.setState({profileData:profileData});
    this.setState({watchChange:!this.state.watchChange});
    console.log(profileData);
  }

  modelCls = () =>{
      this.setState({modalVisible:false});
  }

  render() {
    console.log(Lan)
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Text>This is Profile</Text>
        <ScrollView style={{width:'90%'}}>
            <TextInput 
                placeholder='Name' 
                underlineColorAndroid="#ddd" 
                ref={ input => {
                    this.inputs['name'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('mobile');
                }}
                value={this.state.profileData.name}
                onChangeText={(name) => this.cngProfileData('name', name)}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput 
                placeholder='Age' 
                underlineColorAndroid="#ddd"
                ref={ input => {
                    this.inputs['age'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('mobile');
                }}
                value={this.state.profileData.age}
                onChangeText={(name) => this.cngProfileData('name', name)}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <View style={{flexDirection:'row', height:40, alignItems:'center'}}>
                <Text style={{marginRight:15}}>Gender</Text>
                <CheckBox onValueChange={() => this.cngProfileData('gender', 'Male')} value={this.state.profileData.gender === 'Male' ? true : false} />
                <Text style={{marginRight:15}}>Male</Text> 
                <CheckBox onValueChange={() => this.cngProfileData('gender', 'Female')} value={this.state.profileData.gender === 'Female' ? true : false} /> 
                <Text style={{marginRight:15}}>Female</Text> 
                <CheckBox onValueChange={() => this.cngProfileData('gender', 'Other')} value={this.state.profileData.gender === 'Other' ? true : false} /> 
                <Text>Other</Text>
            </View>
            <View style={{flexDirection:'row', height:40, marginTop:10,marginBottom:10, alignItems:'center', justifyContent:'space-between'}}>
                <Text style={{marginRight:15}}>Education</Text>
                <Button raised primary text="Add" onPress={() => {this.setState({modalVisible:true})}} />
            </View>
            <FlatList
                data={this.state.profileData.education}
                extraData={this.state.watchChange}
                renderItem={({item, index}) => 
                <View>
                    <Text>{item.institutionName}</Text>
                    <Text>{item.degreeName}</Text>
                    <Text>{item.subject}</Text>
                    <Text>{item.result}</Text>
                    <Text>{item.startDate}</Text>
                    <Text>{item.endDate}</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                        <View style={{width:'30%'}}>
                            <Button text="edit" style={{fontSize:10}} icon="edit" />
                        </View>
                        <View style={{width:'30%'}}>
                            <Button text="delete" style={{fontSize:10}} icon="cross" />
                        </View>
                    </View>
                    
                </View>
            
            }
            />
            <TextInput 
                placeholder='Address' 
                underlineColorAndroid="#ddd"
                ref={ input => {
                    this.inputs['address'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('area');
                }}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput 
                placeholder='Area' 
                underlineColorAndroid="#ddd"
                ref={ input => {
                    this.inputs['area'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('post');
                }}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput 
                placeholder='Post' 
                underlineColorAndroid="#ddd"
                ref={ input => {
                    this.inputs['post'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('thana');
                }}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput 
                placeholder='Thana' 
                underlineColorAndroid="#ddd"
                ref={ input => {
                    this.inputs['thana'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('district');
                }}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput 
                placeholder='District' 
                underlineColorAndroid="#ddd"
                ref={ input => {
                    this.inputs['dsitrict'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('district');
                }}
                returnKeyType='done'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <View style={{flexDirection:'row', marginTop:10}}>
                <Button raised primary text="Save" />
            </View>
            <View style={{height:50}}>
            </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('Model Closed')
          }}>
          <Addededucation modelCls={this.modelCls} addEducation={this.addEducation} />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    inputForm:{
        fontSize:16,
        width:'100%',
    }
});
