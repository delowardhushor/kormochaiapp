import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity,Dimensions, TextInput,Switch,ActivityIndicator,Picker,FlatList, ScrollView, CheckBox, ToastAndroid, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import language from './lan.json';
import DatePicker from 'react-native-datepicker'

import { Toolbar, Button } from 'react-native-material-ui';
import axios from 'axios';

type Props = {};
export default class AddJobs extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            refreshing:false,
            jobTitle:'',
            companyName:'',
            education:'',
            interview:1,
            interviewDate:'',
            jobDate:'',
            location:this.props.appStore.locations[0].location,
            responsibility:'',
            salary:'',
            salaryType:'monthly',
            officeHour:'',
            jobPeriod:'fulltime',
            cat:this.props.appStore.cats[0].cat,

            name:'',
            mobile:'',
            area:'',
            thana:'',
            zila:'',
            house:'',
            salaryDate:'',
            employeeNumber:'',
            employeeType:'any',
            details:'',
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

  }

  selectEndDate(date){
    this.setState({endDate:date});
    this.setState({present:false});
  }

  selectPresent(){
    this.setState({endDate:''});
    this.setState({present:!this.state.present});
  }

  addJob(){
      console.log(this.state);
      this.setState({refreshing:true});
      axios.post(this.props.appStore.baseUrl+"jobs",{
        job_title:this.state.jobTitle,
        employers_id:this.props.appStore.userdata.id,
        company_name:this.state.companyName,
        education:this.state.education,
        interview:this.state.interview,
        interview_date:this.state.interviewDate,
        job_date:this.state.jobDate,
        location:this.state.location,
        job_responsibility:this.state.responsibility,
        salary:this.state.salary,
        salary_type:this.state.salaryType,
        office_hour:this.state.officeHour,
        job_type:this.state.jobPeriod,
        category:this.state.cat,

        name:this.state.name,
        mobile:this.state.mobile,
        area:this.state.area,
        thana:this.state.thana,
        zila:this.state.zila,
        house:this.state.house,
        salary_date:this.state.salaryDate,
        employee_number:this.state.employeeNumber,
        admin_salary:"",
        employee_type: this.state.employeeType,
        hour: this.state.hour,
        min: this.state.min,
        ampm: this.state.ampm,
        details: this.state.details,
      })
      .then((res)=>{
        if(res.data.success === true){
            this.setState({refreshing:false});
            ToastAndroid.show("Job Post Succeessfully", 3000);
            this.props.clsAddJobs();
        }else{
            this.setState({refreshing:false});
        }
      })    
      .catch((err)=>{
        this.setState({refreshing:false});
        ToastAndroid.show("Fill Empty or Network Problem", 3000);
        console.log(err);
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

  render() {

    let {lan} = this.props.appStore;

    const Cats = this.props.appStore.cats.map((item, index) => {
        return <Picker.Item key={index} label={item.cat} value={item.cat} />
    });

    const Locations = this.props.appStore.locations.map((item, index) => {
        return <Picker.Item key={index} label={item.location} value={item.location} />
    });

    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center', height:'100%'}}>
        <Toolbar
            style={{ container: {'backgroundColor':'#ca0000'}}}
            leftElement="chevron-left"
            centerElement={language.addJob[lan]}
            onLeftElementPress={ () => { this.props.clsAddJobs() }}
          />
          <ScrollView style={{width:'90%', paddingTop:20}}>

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

            <TextInput
                placeholder={language.phone[lan]}
                underlineColorAndroid="#ddd" 
                value={this.state.mobile}
                onChangeText={(mobile) => this.setState({mobile})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />

            <TextInput
                placeholder={language.insName[lan]}
                underlineColorAndroid="#ddd" 
                value={this.state.companyName}
                onChangeText={(companyName) => this.setState({companyName})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />

            <Text style={[styles.inputForm, {marginTop:15, marginBottom:10}]}>{language.insAdd[lan]}</Text>

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

            <TextInput
                placeholder={language.district[lan]}
                underlineColorAndroid="#ddd" 
                value={this.state.zila}
                onChangeText={(zila) => this.setState({zila})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />

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

            <TextInput
                placeholder={language.jobTitle[lan]}
                underlineColorAndroid="#ddd" 
                value={this.state.jobTitle}
                onChangeText={(jobTitle) => this.setState({jobTitle})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', height:40, alignItems:'center', marginTop:10}}>
                <Text style={[styles.inputForm, {marginRight:15, width:'auto', fontSize:16}]}>{language.cat[lan]}:</Text>
                <Picker
                    selectedValue={this.state.cat}
                    style={{ height: 50, width: Dimensions.get('window').width/2 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({cat: itemValue})}>
                    {Cats}
                </Picker>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', height:40, alignItems:'center', marginTop:10}}>
                <Text style={[styles.inputForm, {marginRight:15, width:'auto', fontSize:16}]}>{language.location[lan]}:</Text>
                <Picker
                    selectedValue={this.state.location}
                    style={{ height: 50, width: Dimensions.get('window').width/2 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({location: itemValue})}>
                    {Locations}
                </Picker>
            </View>

            <TextInput
                placeholder={language.employeeNumber[lan]} 
                underlineColorAndroid="#ddd" 
                value={this.state.employeeNumber}
                onChangeText={(employeeNumber) => this.setState({employeeNumber:employeeNumber})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={[styles.inputForm, {minHeight:50}]}
                multiline={true}
            />

            <View style={{flexDirection:'row', height:40, alignItems:'center'}}>
                <Text style={{marginRight:15}}>{language.genNed[lan]} : </Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <CheckBox onValueChange={() => this.setState({employeeType:'male'})} value={this.state.employeeType === 'male' ? true : false} />
                <Text style={{marginRight:15}}>{language.male[lan]}</Text> 
                <CheckBox onValueChange={() => this.setState({employeeType:'female'})} value={this.state.employeeType === 'female' ? true : false} /> 
                <Text style={{marginRight:15}}>{language.female[lan]}</Text> 
                <CheckBox onValueChange={() => this.setState({employeeType:'any'})} value={this.state.employeeType === 'any' ? true : false} /> 
                <Text>{language.any[lan]}</Text>
            </View>
            
            <View style={{flexDirection:'row', height:40, alignItems:'center', marginTop:10}}>
                <Text style={[styles.inputForm, {width:'auto', marginRight:15}]}>{language.jobType[lan]}</Text>
                <CheckBox onValueChange={() => this.setState({jobPeriod:'fulltime'})} value={this.state.jobPeriod === 'fulltime' ? true : false} />
                <Text style={[styles.inputForm, {width:'auto', marginRight:15}]}>{language.full[lan]}</Text> 
                <CheckBox onValueChange={() => this.setState({jobPeriod:'parttime'})} value={this.state.jobPeriod === 'parttime' ? true : false} /> 
                <Text style={[styles.inputForm, {width:'auto', marginRight:15}]}>{language.part[lan]}</Text> 
            </View>
            <TextInput
                placeholder={language.jobHour[lan]} 
                underlineColorAndroid="#ddd" 
                ref={ input => {
                    this.inputs['officeHour'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('salary');
                }}
                value={this.state.officeHour}
                onChangeText={(officeHour) => this.setState({officeHour})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <TextInput
                placeholder={language.salary[lan]} 
                underlineColorAndroid="#ddd" 
                ref={ input => {
                    this.inputs['salary'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('education');
                }}
                value={this.state.salary}
                onChangeText={(salary) => this.setState({salary})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            <View style={{height:40, marginTop:10,marginBottom:20}}>
                <Text style={styles.inputForm}>{language.salaryType[lan]}</Text>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
                    <CheckBox onValueChange={() => this.setState({salaryType:'monthly'})} value={this.state.salaryType === 'monthly' ? true : false} />
                    <Text style={[styles.inputForm, {width:'auto', marginRight:15}]}>{language.monthly[lan]}</Text> 
                    <CheckBox onValueChange={() => this.setState({salaryType:'weekly'})} value={this.state.salaryType === 'weekly' ? true : false} /> 
                    <Text style={[styles.inputForm, {width:'auto', marginRight:15}]}>{language.weekly[lan]}</Text> 
                    <CheckBox onValueChange={() => this.setState({salaryType:'daily'})} value={this.state.salaryType === 'daily' ? true : false} /> 
                    <Text style={[styles.inputForm, {width:'auto', marginRight:15}]}>{language.daily[lan]}</Text>
                </View>
            </View>

            {(this.state.salaryType === 'monthly') &&
            <TextInput
                placeholder={language.salaryDate[lan]} 
                underlineColorAndroid="#ddd" 
                value={this.state.salaryDate}
                onChangeText={(salaryDate) => this.setState({salaryDate})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />
            }

            <View style={{flexDirection:'row', height:40, alignItems:'center', marginTop:10}}>
                <Text style={[styles.inputForm, {marginRight:15, width:'auto'}]}>{language.needInt[lan]}</Text>
                <CheckBox onValueChange={() => this.setState({interview:1})} value={this.state.interview == 1 ? true : false} />
                <Text style={[styles.inputForm, {width:'auto', marginRight:15}]}>{language.yes[lan]}</Text>
                <CheckBox onValueChange={() => this.setState({interview:0})} value={this.state.interview == 0 ? true : false} />
                <Text style={[styles.inputForm, {width:'auto', marginRight:15}]}>{language.no[lan]}</Text>
            </View>

            
            {(this.state.interview == 1) &&
            <View style={{flexDirection:'row', height:40,marginTop:10,alignItems:'center', justifyContent:'space-between'}}>
                <View>
                    <Text style={[styles.inputForm, {width:'auto'}]} >{ language.intDate[lan] }</Text>
                </View>
            </View>
            }
            {(this.state.interview == 1) &&
            <View style={{flexDirection:'row', height:40,marginTop:10,alignItems:'center', justifyContent:"flex-start"}}>
                    <DatePicker
                        date={this.state.interviewDate}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => this.setState({interviewDate:date})}
                    />                
            </View>
            }
            {(this.state.interview == 1) &&
            <View style={{flexDirection:'row', height:40,marginTop:10,alignItems:'center', justifyContent:"flex-start"}}>
                <Picker
                    selectedValue={this.state.hour}
                    style={{ height: 50, width: Dimensions.get('window').width*0.9/3 }}
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
                    style={{ height: 50, width: Dimensions.get('window').width*0.9/3 }}
                    onValueChange={(min, itemIndex) => this.setState({min:min})}>
                    <Picker.Item label="00" value="00" />
                    <Picker.Item label="15" value="15" />
                    <Picker.Item label="30" value="30" />
                    <Picker.Item label="45" value="45" />
                </Picker>
                <Picker
                    selectedValue={this.state.ampm}
                    style={{ height: 50, width: Dimensions.get('window').width*0.9/3 }}
                    onValueChange={(ampm) => this.setState({ampm:ampm})}>
                    <Picker.Item label="AM" value="AM" />
                    <Picker.Item label="PM" value="PM" />
                </Picker>
            </View>
            }
            <View style={{flexDirection:'row', height:40,marginTop:10,alignItems:'center', justifyContent:'space-between'}}>
                <View>
                    <Text style={[styles.inputForm, {width:'auto'}]} >{language.jobDate[lan]}</Text>
                </View>
                <View>
                    <DatePicker
                        date={this.state.jobDate}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => this.setState({jobDate:date})}
                    />
                </View>
            </View>
            <TextInput
                placeholder={language.eduQua[lan]} 
                underlineColorAndroid="#ddd" 
                ref={ input => {
                    this.inputs['education'] = input;
                }}
                onSubmitEditing={() => {
                    this.focusNextField('responsibility');
                }}
                value={this.state.education}
                onChangeText={(education) => this.setState({education:education})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.inputForm}
            />

            <TextInput
                placeholder={language.jobRes[lan]} 
                underlineColorAndroid="#ddd" 
                ref={ input => {
                    this.inputs['responsibility'] = input;
                }}
                value={this.state.responsibility}
                onChangeText={(responsibility) => this.setState({responsibility:responsibility})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={[styles.inputForm, {minHeight:50, lineHeight:25}]}
                multiline={true}
            />

            <TextInput
                placeholder={language.details[lan]} 
                underlineColorAndroid="#ddd" 
                ref={ input => {
                    this.inputs['details'] = input;
                }}
                value={this.state.details}
                onChangeText={(details) => this.setState({details:details})}
                returnKeyType='next'
                selectTextOnFocus={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                style={[styles.inputForm, {minHeight:50, lineHeight:25}]}
                multiline={true}
            />
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
