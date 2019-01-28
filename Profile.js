import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput,CheckBox,Picker, View,ScrollView,Modal,FlatList,ToastAndroid,ActivityIndicator, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import language from './lan.json';

import { Button, Toolbar } from 'react-native-material-ui';

import Addededucation from './Addeducation';
import axios from 'axios';

educations = ['PSC','JSC','SSC','HSC','Honors', 'Masters' ]

type Props = {};
export default class Profile extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            refreshing:false,
            underlineColor: '#ddd',
            date:"2016-05-15",
            modalVisible:false,
            updateEducation:[],
            profileData:{
                name:'',
                address:'',
                area:'',
                education:'',
                thana:'',
                post:'',
                district:'',
                age:'',
                gender:'Male',
                watchChange:false,
                perarea:'',
                perthana:'',
                perdistrict:'',
                perpost:'',
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
    if(this.props.appStore.userdata.length  === 0 ){
        appStore = this.props.appStore;
        appStore.activeTab = 'Login';
        this.props.updateAppstore(appStore);
    }else{
        let {userdata} = this.props.appStore;
        var profileData = this.state.profileData;
        profileData.name = userdata.name;
        profileData.address = userdata.address;
        profileData.area = userdata.area;
        profileData.education = userdata.education;
        profileData.post = userdata.post;
        profileData.district = userdata.district;
        profileData.age = userdata.age;
        profileData.gender = userdata.gender;
        profileData.thana = userdata.thana;

        profileData.perthana = userdata.perthana,
        profileData.perpost = userdata.perpost,
        profileData.perdistrict = userdata.perdistrict,
        profileData.perarea = userdata.perarea,

        this.setState({profileData:profileData});
    }
  }

  cngProfileData = (field, value) => {
    var profileData = this.state.profileData;
    profileData[field] = value;
    this.setState({profileData:profileData});
  }

  addEducation = (value) => {
    var profileData = this.state.profileData;
    profileData.education = value;
    this.setState({profileData:profileData});
    this.setState({watchChange:!this.state.watchChange});
  }

  modelCls = () =>{
    this.setState({modalVisible:false});
  }

  save(){
    this.setState({refreshing:true});
      axios.post(this.props.appStore.baseUrl+'employees/update',{
        id:this.props.appStore.userdata.id,
        name:this.state.profileData.name,
        address:this.state.profileData.address,
        area:this.state.profileData.area,
        education:this.state.profileData.education,
        thana:this.state.profileData.thana,
        post:this.state.profileData.post,
        district:this.state.profileData.district,
        age:this.state.profileData.age,
        gender:this.state.profileData.gender,
        perarea:this.state.profileData.perarea,
        perthana:this.state.profileData.perthana,
        perpost:this.state.profileData.perpost,
        perdistrict:this.state.profileData.perdistrict,

      }).then((res)=>{
        console.log(res);
        if(res.data.success === true){
            this.setState({refreshing:false});
            ToastAndroid.show("Profile Updated", 3000);
            appStore = this.props.appStore;
            appStore.userdata.name = this.state.profileData.name;
            appStore.userdata.address = this.state.profileData.address;
            appStore.userdata.age = this.state.profileData.age;
            appStore.userdata.education = this.state.profileData.education;
            appStore.userdata.thana = this.state.profileData.thana;
            appStore.userdata.area = this.state.profileData.area;
            appStore.userdata.post = this.state.profileData.post;
            appStore.userdata.gender = this.state.profileData.gender;
            appStore.userdata.district = this.state.profileData.district;

            appStore.userdata.perarea = this.state.profileData.perarea;
            appStore.userdata.perpost = this.state.profileData.perpost;
            appStore.userdata.pergender = this.state.profileData.pergender;
            appStore.userdata.perdistrict = this.state.profileData.perdistrict;

            this.props.updateAppstore(appStore);
        }else{
            this.setState({refreshing:false});
        }
      })
      .catch((err)=>{
        console.log(err)
        this.setState({refreshing:false});
        ToastAndroid.show("No Network Connection", 3000);
        
      });
  }

  setAddEdu = () => {
    this.setState({updateEducation:null})
    this.setState({modalVisible:true})
  }

  setUpdateEdu(item, index){
      item.itemIndex = index;
      this.setState({updateEducation:item});
      this.setState({modalVisible:true});
  }

  saveUpdateEducation = (data, index) =>{
    var profileData = JSON.parse(JSON.stringify(this.state.profileData));
    profileData.education[index] = data;
    this.setState({profileData:profileData});
    this.setState({watchChange:!this.state.watchChange});
    ToastAndroid.show("Updated! Press Save to Store", 3000);
  }

  dltEdu(index){
    var profileData = JSON.parse(JSON.stringify(this.state.profileData));
    profileData.education.splice(index, 1);
    this.setState({profileData:profileData});
    this.setState({watchChange:!this.state.watchChange});
    ToastAndroid.show("Deleted! Press Save to Store", 3000)
  }

  render() {
    let {userdata, lan} = this.props.appStore;

    const Educations = educations.map((item, index) => {
        return <Picker.Item key={index} label={item} value={item} />
    });

    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Toolbar
          style={{ container: {'backgroundColor':'#4CAF50'}}}
          // leftElement="menu"
          centerElement={'Your Profile'}
        />
        <Text style={{textAlign:'center',fontWeight:'900', fontSize:16, color:'#000', marginVertical:10}}>{language.refCode[lan]}: {userdata.refer_code}</Text>
        <ScrollView style={{width:'90%'}} keyboardShouldPersistTaps={'always'} >
            <TextInput 
                placeholder={language.name[lan]} 
                underlineColorAndroid="#ddd" 
                ref={ input => {
                    this.inputs['name'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('age');
                }}
                value={this.state.profileData.name}
                onChangeText={(name) => this.cngProfileData('name', name)}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={[styles.inputForm]}
            />
            <TextInput 
                placeholder={language.age[lan]}
                underlineColorAndroid="#ddd"
                ref={ input => {
                    this.inputs['age'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('address');
                }}
                value={this.state.profileData.age}
                onChangeText={(age) => this.cngProfileData('age', age)}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <View style={{flexDirection:'row', height:40, alignItems:'center'}}>
                <Text style={{marginRight:15}}>{language.gender[lan]}</Text>
                <CheckBox onValueChange={() => this.cngProfileData('gender', 'Male')} value={this.state.profileData.gender === 'Male' ? true : false} />
                <Text style={{marginRight:15}}>{language.male[lan]}</Text> 
                <CheckBox onValueChange={() => this.cngProfileData('gender', 'Female')} value={this.state.profileData.gender === 'Female' ? true : false} /> 
                <Text style={{marginRight:15}}>{language.female[lan]}</Text> 
                <CheckBox onValueChange={() => this.cngProfileData('gender', 'Other')} value={this.state.profileData.gender === 'Other' ? true : false} /> 
                <Text>{language.other[lan]}</Text>
            </View>

            {/* <View style={{flexDirection:'row', height:40, marginTop:10,marginBottom:10, alignItems:'center', justifyContent:'space-between'}}>
                <Text style={{marginRight:15}}>{language.eduQua[lan]}</Text>
                <Button raised primary text="Add" onPress={() => this.setAddEdu()} />
            </View> */}
            {/* <FlatList
                data={this.state.profileData.education}
                extraData={this.state.watchChange}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={({item, index}) => 
                <View style={{paddingHorizontal:20, paddingVertical:10}}>
                    <Text style={{fontSize:16, color:'#000', fontWeight:'900'}}>{item.institutionName}</Text>
                    <Text style={{fontSize:10, color:'#000'}}>{item.degreeName}</Text>
                    <Text style={{fontSize:10, color:'#000'}}>{item.subject}</Text>
                    <Text style={{fontSize:10, color:'#4CAF50', fontWeight:'900'}}>Result: {item.result}</Text>
                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:10, color:'#000', fontWeight:'900'}}>{item.startDate}</Text>
                        <Text> - </Text>
                        <Text style={{fontSize:10, color:'#000', fontWeight:'900'}}>{item.present === true || item.endDate === '' ? 'present' : item.endDate}</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                        <View style={{width:'30%'}}>
                            <Button text={language.update[lan]} style={{fontSize:10}} icon="edit" onPress={() => this.setUpdateEdu(item, index)} />
                        </View>
                        <View style={{width:'30%'}}>
                            <Button accent text={language.delete[lan]} style={{fontSize:10}} icon="delete" onPress={() => this.dltEdu(index)} />
                        </View>
                    </View>
                </View>
            }
            /> */}

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', height:40,marginBottom:10, alignItems:'center', marginTop:20}}>
                <Text style={[styles.inputForm, {marginRight:15, width:'auto', fontSize:16}]}>{language.eduQua[lan]}:</Text>
                <Picker
                    selectedValue={this.state.profileData.education}
                    style={{ height: 50, width: 200 }}
                    onValueChange={(itemValue, itemIndex) => this.cngProfileData('education', itemValue)}>
                    <Picker.Item label="Select Education" value="" />
                    {Educations}
                </Picker>
            </View>

            <Text style={[styles.inputForm, {marginVertical:10}]}>Present Address</Text>

            <TextInput 
                placeholder={language.area[lan]} 
                underlineColorAndroid="#ddd"
                ref={ input => {
                    this.inputs['area'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('post');
                }}
                value={this.state.profileData.area}
                onChangeText={(area) => this.cngProfileData('area', area)}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput 
                placeholder={language.post[lan]}
                underlineColorAndroid="#ddd"
                ref={ input => {
                    this.inputs['post'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('thana');
                }}
                value={this.state.profileData.post}
                onChangeText={(post) => this.cngProfileData('post', post)}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput 
                placeholder={language.thana[lan]}
                underlineColorAndroid="#ddd"
                ref={ input => {
                    this.inputs['thana'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('district');
                }}
                value={this.state.profileData.thana}
                onChangeText={(thana) => this.cngProfileData('thana', thana)}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput 
                placeholder={language.district[lan]} 
                underlineColorAndroid="#ddd"
                ref={ input => {
                    this.inputs['district'] = input;
                }}
                onSubmitEditing={() => {
                    this.save()
                }}
                value={this.state.profileData.district}
                onChangeText={(district) => this.cngProfileData('district', district)}
                returnKeyType='done'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />

            <Text style={[styles.inputForm, {marginVertical:10}]}>Permanent Address</Text>
            
            <TextInput 
                placeholder={language.area[lan]} 
                underlineColorAndroid="#ddd"
                value={this.state.profileData.perarea}
                onChangeText={(perarea) => this.cngProfileData('perarea', perarea)}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput 
                placeholder={language.post[lan]}
                underlineColorAndroid="#ddd"
                value={this.state.profileData.perpost}
                onChangeText={(perpost) => this.cngProfileData('perpost', perpost)}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput 
                placeholder={language.thana[lan]}
                underlineColorAndroid="#ddd"
                value={this.state.profileData.perthana}
                onChangeText={(perthana) => this.cngProfileData('perthana', perthana)}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput 
                placeholder={language.district[lan]} 
                underlineColorAndroid="#ddd"
                value={this.state.profileData.perdistrict}
                onChangeText={(perdistrict) => this.cngProfileData('perdistrict', perdistrict)}
                returnKeyType='done'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />

            <View style={{flexDirection:'row', marginTop:10}}>
                <Button raised primary text={language.save[lan]} onPress={() => this.save()} />
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
          <Addededucation appStore={this.props.appStore} modelCls={this.modelCls} addEducation={this.addEducation} updateEducation={this.state.updateEducation} saveUpdateEducation={this.saveUpdateEducation} />
        </Modal>
        <Modal
            transparent={true}
            visible={this.state.refreshing}
            onRequestClose={() => {
                console.log('Model Closed')
            }}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator size="large" color="#00ff00" /></View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    inputForm:{
        fontSize:12,
        width:'100%',
        color:'#000',
    }
});
