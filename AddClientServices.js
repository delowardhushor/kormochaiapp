import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity,Dimensions, TextInput,Switch,ActivityIndicator,Picker,FlatList, ScrollView, CheckBox, ToastAndroid, Modal} from 'react-native';
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
            serviceDate:'',
            hour:'01',
            min:'00',
            ampm:'PM',
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
            this.setState({area:updateData.area});
            this.setState({thana:updateData.thana});
            this.setState({district:updateData.district});
            this.setState({house:updateData.house});
            this.setState({ampm:updateData.ampm});
            this.setState({min:updateData.min});
            this.setState({hour:updateData.hour});
            this.setState({serviceDate:updateData.service_date});
            var service = JSON.parse(updateData.service);
            this.setState({selectedCats:service});
            console.log(service)
        }
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
        service_date:this.state.serviceDate,
        min:this.state.min,
        hour:this.state.hour,
        ampm:this.state.ampm,
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
        ToastAndroid.show("Fill Empty or No Network Connection", 3000)
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
                />
            </View>
        );
    });

    console.log(this.state.selectedCats.question)

    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center', height:'100%'}}>
        <Toolbar
            style={{ container: {'backgroundColor':'#ca0000'}}}
            leftElement="chevron-left"
            centerElement={this.props.update == true ? language.service[lan] : language.reqSer[lan]}
            onLeftElementPress={ () => { this.props.clsAddJobs() }}
          />
          <ScrollView style={{width:'90%', paddingTop:20}}>
            {(this.props.update == true) &&
                <Text style={[styles.inputForm,{marginTop:10, color:'#ca0000'}]}>{language.name[lan]}</Text>
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
                <Text style={[styles.inputForm,{marginTop:10, color:'#ca0000'}]}>{language.phone[lan]}</Text>
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

            <Text style={[styles.inputForm,{marginTop:10, color:'#000', fontSize:16}]}>{language.address[lan]}</Text>
            {(this.props.update == true) &&
                <Text style={[styles.inputForm,{marginTop:10, color:'#ca0000'}]}>{language.area[lan]}</Text>
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
                <Text style={[styles.inputForm,{marginTop:10, color:'#ca0000'}]}>{language.thana[lan]}</Text>
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
                <Text style={[styles.inputForm,{marginTop:10, color:'#ca0000'}]}>{language.district[lan]}</Text>
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
                <Text style={[styles.inputForm,{marginTop:10, color:'#ca0000'}]}>{language.house[lan]}</Text>
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

            <View style={{flexDirection:'row', height:40,marginTop:10,alignItems:'center', justifyContent:'space-between'}}>
                <View>
                    <Text style={[styles.inputForm, {width:'auto'}]} >{this.props.update == true ? language.serDay[lan] :language.serDate[lan]}</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', height:40,marginTop:10,alignItems:'center', justifyContent:"flex-start"}}>
                <View>
                    <DatePicker
                        date={this.state.serviceDate}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => this.setState({serviceDate:date})}
                    />
                </View>
                <Picker
                    selectedValue={this.state.hour}
                    style={{ height: 50, width: 50 }}
                    onValueChange={(hour, itemIndex) => this.setState({hour:hour})}>
                    <Picker.Item label="01" value="01" />
                    <Picker.Item label="02" value="02" />
                    <Picker.Item label="03" value="03" />
                    <Picker.Item label="04" value="04" />
                    <Picker.Item label="05" value="05" />
                    <Picker.Item label="06" value="06" />
                    <Picker.Item label="07" value="07" />
                    <Picker.Item label="08" value="08" />
                    <Picker.Item label="09" value="09" />
                    <Picker.Item label="10" value="10" />
                    <Picker.Item label="11" value="11" />
                    <Picker.Item label="12" value="12" />
                </Picker>
                <Text>:</Text>
                <Picker
                    selectedValue={this.state.min}
                    style={{ height: 50, width: 50 }}
                    onValueChange={(min, itemIndex) => this.setState({min:min})}>
                    <Picker.Item label="00" value="00" />
                    <Picker.Item label="15" value="15" />
                    <Picker.Item label="30" value="30" />
                    <Picker.Item label="45" value="45" />
                </Picker>
                <Picker
                    selectedValue={this.state.ampm}
                    style={{ height: 50, width: 60 }}
                    onValueChange={(ampm) => this.setState({ampm:ampm})}>
                    <Picker.Item label="AM" value="AM" />
                    <Picker.Item label="PM" value="PM" />
                </Picker>
            </View>
            
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', height:40, alignItems:'center', marginTop:10}}>
                <Text style={[styles.inputForm, {marginRight:15, width:'auto', fontSize:16}]}>{this.props.update == true ? language.service[lan] : language.selReqSer[lan]}</Text>
                <Picker
                    selectedValue={this.state.cat}
                    style={{ height: 50, width: Dimensions.get('window').width/2 }}
                    onValueChange={(itemValue, itemIndex) => this.setCat(itemIndex)}>
                    {Cats}
                </Picker>
            </View>

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
