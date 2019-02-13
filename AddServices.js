import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity,Dimensions, TextInput,Switch,ActivityIndicator,Picker,FlatList, ScrollView, CheckBox, ToastAndroid, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import language from './lan.json';
import DatePicker from 'react-native-datepicker'

import { Toolbar, Button } from 'react-native-material-ui';
import axios from 'axios';

type Props = {};
export default class AddServices extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            refreshing:false,
            name:'',
            phone:'',
            companyName:'',
            area:'',
            thana:'',
            district:'',
            house:'',
            perarea:'',
            perthana:'',
            perdistrict:'',
            perhouse:'',
            cat:'',
            clicats:[],
            selectedCats:this.props.appStore.parcats[0],
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
        if(this.props.update == true){
            let {updateData} = this.props;
            this.setState({name:updateData.name});
            this.setState({phone:updateData.phone});
            this.setState({companyName:updateData.company_name});
            this.setState({area:updateData.pre_area});
            this.setState({thana:updateData.pre_thana});
            this.setState({district:updateData.pre_district});
            this.setState({house:updateData.pre_house});

            this.setState({perarea:updateData.per_area});
            this.setState({perthana:updateData.per_thana});
            this.setState({perdistrict:updateData.per_district});
            this.setState({perhouse:updateData.per_house});

            var profession = JSON.parse(updateData.profession);
            this.setState({selectedCats:profession});
        }
    }

  addJob(){
      this.setState({refreshing:true});
      axios.post(this.props.appStore.baseUrl+"partnerservices",{
        partners_id:this.props.appStore.userdata.id,
        name:this.state.name,
        phone:this.state.phone,
        company_name:this.state.companyName,
        per_area:this.state.area,
        per_thana:this.state.thana,
        per_district:this.state.district,
        per_house:this.state.house,
        pre_area:this.state.perarea,
        pre_thana:this.state.perthana,
        pre_district:this.state.perdistrict,
        pre_house:this.state.perhouse,
        profession:JSON.stringify(this.state.selectedCats)
      })
      .then((res)=>{
        if(res.data.success === true){
            this.setState({refreshing:false});
            ToastAndroid.show("Service Added Succeessfully", 3000);
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
        selectedCats = this.props.appStore.parcats[index];
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

    const Cats = this.props.appStore.parcats.map((item, index) => {
        return <Picker.Item key={index} label={item.cat} value={item.cat} />
    });


    const Question = JSON.parse(this.state.selectedCats.question).map((item, index) => {
        return (
            <View key={index}>
                {(this.props.update == true) &&
                <Text style={[styles.inputForm,{marginTop:10, color:'#ca0000'}]}>{item.qus}</Text>
                }
                <TextInput
                    
                    placeholder={item.qus}
                    underlineColorAndroid="#ddd"
                    value={item.ans}
                    onChangeText={(text) => this.cngCatInput(text, index)}
                    returnKeyType='next'
                    selectTextOnFocus={true}
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    style={styles.inputForm}
                    multiline={true}
                />
            </View>
        );
    });


    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center', height:'100%'}}>
        <Toolbar
            style={{ container: {'backgroundColor':'#ca0000'}}}
            leftElement="chevron-left"
            centerElement={this.props.update == true ? language.service[lan] :language.addSer[lan]}
            onLeftElementPress={ () => { this.props.clsAddJobs() }}
          />
          <ScrollView style={{width:'90%', paddingTop:20}}>
            {(this.props.update == true) &&
                <Text style={[styles.inputForm, {marginTop:10, color:'#ca0000'}]}>{language.name[lan]} : </Text>
            }
            <TextInput
                placeholder={language.name[lan]}
                underlineColorAndroid="#ddd" 
                value={this.state.name}
                onChangeText={(name) => this.setState({name})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            {(this.props.update == true) &&
                <Text style={[styles.inputForm, {marginTop:10, color:'#ca0000'}]}>{language.phone[lan]} : </Text>
            }
            <TextInput
                placeholder={language.phone[lan]}
                underlineColorAndroid="#ddd" 
                
                value={this.state.phone}
                onChangeText={(phone) => this.setState({phone})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            {(this.props.update == true) &&
                <Text style={[styles.inputForm, {marginTop:10, color:'#ca0000'}]}>{language.comName[lan]} : </Text>
            }
            <TextInput
                placeholder={language.comName[lan]}
                underlineColorAndroid="#ddd" 
                
                value={this.state.companyName}
                onChangeText={(companyName) => this.setState({companyName})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />

            <Text style={[styles.inputForm, {marginTop:10, color:'#000', fontSize:16}]}>{language.perAdd[lan]} : </Text>
            {(this.props.update == true) &&
                <Text style={[styles.inputForm, {marginTop:10, color:'#ca0000'}]}>{language.area[lan]} : </Text>
            }
            <TextInput
                placeholder={language.area[lan]}
                underlineColorAndroid="#ddd" 
                value={this.state.area}
                onChangeText={(area) => this.setState({area})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            {(this.props.update == true) &&
                <Text style={[styles.inputForm, {marginTop:10, color:'#ca0000'}]}>{language.thana[lan]} : </Text>
            }
            <TextInput
                placeholder={language.thana[lan]}
                underlineColorAndroid="#ddd" 
                value={this.state.thana}
                onChangeText={(thana) => this.setState({thana})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            {(this.props.update == true) &&
                <Text style={[styles.inputForm, {marginTop:10, color:'#ca0000'}]}>{language.district[lan]} : </Text>
            }
            <TextInput
                placeholder={language.district[lan]}
                underlineColorAndroid="#ddd" 
                value={this.state.district}
                onChangeText={(district) => this.setState({district})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            {(this.props.update == true) &&
                <Text style={[styles.inputForm, {marginTop:10, color:'#ca0000'}]}>{language.district[lan]} : </Text>
            }
            <TextInput
                placeholder={language.house[lan]}
                underlineColorAndroid="#ddd" 
                value={this.state.house}
                onChangeText={(house) => this.setState({house})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />

            <Text style={[styles.inputForm, {marginTop:10, color:'#000', fontSize:16}]}>{language.serAdd[lan]} : </Text>
            {(this.props.update == true) &&
                <Text style={[styles.inputForm, {marginTop:10, color:'#ca0000'}]}>{language.area[lan]} : </Text>
            }
            <TextInput
                placeholder={language.area[lan]}
                underlineColorAndroid="#ddd" 
                value={this.state.perarea}
                onChangeText={(perarea) => this.setState({perarea})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            {(this.props.update == true) &&
                <Text style={[styles.inputForm, {marginTop:10, color:'#ca0000'}]}>{language.thana[lan]} : </Text>
            }
            <TextInput
                placeholder={language.thana[lan]}
                underlineColorAndroid="#ddd" 
                value={this.state.perthana}
                onChangeText={(perthana) => this.setState({perthana})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            {(this.props.update == true) &&
                <Text style={[styles.inputForm, {marginTop:10, color:'#ca0000'}]}>{language.district[lan]} : </Text>
            }
            <TextInput
                placeholder={language.district[lan]}
                underlineColorAndroid="#ddd" 
                value={this.state.perdistrict}
                onChangeText={(perdistrict) => this.setState({perdistrict})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            {(this.props.update == true) &&
                <Text style={[styles.inputForm, {marginTop:10, color:'#ca0000'}]}>{language.house[lan]} : </Text>
            }
            <TextInput
                placeholder={language.house[lan]}
                underlineColorAndroid="#ddd" 
                value={this.state.perhouse}
                onChangeText={(perhouse) => this.setState({perhouse})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', height:40, alignItems:'center', marginTop:10}}>
                <Text style={[styles.inputForm, {marginRight:15, width:'auto', fontSize:16}]}>{this.props.update == true ? language.service[lan] :language.selSer[lan]}</Text>
            </View>

            <Picker
                selectedValue={this.state.cat}
                style={{ height: 50 }}
                onValueChange={(itemValue, itemIndex) => this.setCat(itemIndex)}>
                {Cats}
            </Picker>

            {Question}
            
            {(this.props.update !== true) &&
            <View style={{flexDirection:'row', marginTop:10,justifyContent:'flex-end'}}>
                <Button raised primary text={language.add[lan]} onPress={() => {this.addJob()}} />
            </View>
            }
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
