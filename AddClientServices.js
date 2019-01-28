import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, TextInput,Switch,ActivityIndicator,Picker,FlatList, ScrollView, CheckBox, ToastAndroid, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import language from './lan.json';
import DatePicker from 'react-native-datepicker'

import { Toolbar, Button } from 'react-native-material-ui';
import axios from 'axios';

type Props = {};
export default class AddClientServices extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            refreshing:false,
            name:'',
            phone:'',
            area:'',
            thana:'',
            district:'',
            house:'',
            cat:'',
            selectedCats:this.props.appStore.clicats[0],
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

}

  addJob(){
      console.log(this.state)
      this.setState({refreshing:true});
      axios.post(this.props.appStore.baseUrl+"clientservices",{
        clients_id:this.props.appStore.userdata.id,
        name:this.state.name,
        phone:this.state.phone,
        area:this.state.area,
        thana:this.state.thana,
        district:this.state.district,
        house:this.state.house,
        service:JSON.stringify(this.state.selectedCats)
      })
      .then((res)=>{
        if(res.data.success === true){
            this.setState({refreshing:false});
            ToastAndroid.show("Service Request Sent", 3000);
            this.props.clsAddJobs();
        }else{
            this.setState({refreshing:false});
        }
      })    
      .catch((err)=>{
          console.log(err)
        this.setState({refreshing:false});
        ToastAndroid.show("No Network Connection", 3000)
      })
  }

//   cngProfileData(field, value){
//     var profileData = this.state;
//     profileData[field] = value;
//     this.setState({profileData:profileData});
//   }

    addEducation(){
        if(this.state.degreeName && this.state.institutionName && this.state.subject && this.state.startDate){
            this.props.addEducation(this.state);
            this.props.modelCls();
        }else{
            ToastAndroid.show('Fill Empty!', 3000);
        }
    }

    setCat(index){
        console.log(index)
        selectedCats = this.props.appStore.clicats[index];
        this.setState({cat:selectedCats.cat});
        this.setState({selectedCats:selectedCats});
    }

    cngCatInput(value, index){
        var selectedCats = JSON.parse(JSON.stringify(this.state.selectedCats));
        var question = JSON.parse(selectedCats.question);
        question[index].ans = value;
        console.log(question)
        selectedCats.question = JSON.stringify(question);
        this.setState({selectedCats:selectedCats});
    }

  render() {

    let {lan} = this.props.appStore;

    const Cats = this.props.appStore.clicats.map((item, index) => {
        return <Picker.Item key={index} label={item.cat} value={item.cat} />
    });


    const Question = JSON.parse(this.state.selectedCats.question).map((item, index) => {
        return (
            <TextInput
                placeholder={item.qus}
                underlineColorAndroid="#ddd"
                onChangeText={(text) => this.cngCatInput(text, index)}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
        );
    });

    console.log(this.state.selectedCats.question)

    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center', height:'100%'}}>
        <Toolbar
            style={{ container: {'backgroundColor':'#4CAF50'}}}
            leftElement="chevron-left"
            centerElement="Request Service"
            onLeftElementPress={ () => { this.props.clsAddJobs() }}
          />
          <ScrollView style={{width:'90%', paddingTop:20}}>
            <TextInput
                placeholder="Name"
                underlineColorAndroid="#ddd" 
                value={this.state.name}
                onChangeText={(name) => this.setState({name})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />

            <TextInput
                placeholder="Phone"
                underlineColorAndroid="#ddd" 
                
                value={this.state.phone}
                onChangeText={(phone) => this.setState({phone})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />

            <Text style={[styles.inputForm,{marginTop:10}]}>Address</Text>

            <TextInput
                placeholder="Area"
                underlineColorAndroid="#ddd" 
                value={this.state.area}
                onChangeText={(area) => this.setState({area})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput
                placeholder="Thana"
                underlineColorAndroid="#ddd" 
                value={this.state.thana}
                onChangeText={(thana) => this.setState({thana})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput
                placeholder="District"
                underlineColorAndroid="#ddd" 
                value={this.state.district}
                onChangeText={(district) => this.setState({district})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />

            <TextInput
                placeholder="House"
                underlineColorAndroid="#ddd" 
                value={this.state.house}
                onChangeText={(house) => this.setState({house})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', height:40, alignItems:'center', marginTop:10}}>
                <Text style={[styles.inputForm, {marginRight:15, width:'auto', fontSize:16}]}>Select Service</Text>
                <Picker
                    selectedValue={this.state.cat}
                    style={{ height: 50, width: 200 }}
                    onValueChange={(itemValue, itemIndex) => this.setCat(itemIndex)}>
                    {Cats}
                </Picker>
            </View>

            {Question}
        
            <View style={{flexDirection:'row', marginTop:10,justifyContent:'flex-end'}}>
                <Button raised primary text={language.add[lan]} onPress={() => {this.addJob()}} />
            </View>
            <View style={{height:100}}></View>
            </ScrollView>
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
        color:'#000'
    },
    input:{
        fontSize:12,
        color:'#000',
    }
});
