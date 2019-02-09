import React, { Component } from 'react';
import { WebView, Modal,View, FlatList, Text, Dimensions , Image, TouchableOpacity} from 'react-native';
import { Button, Toolbar } from 'react-native-material-ui';

import language from './lan.json';

export default class Educative extends Component {

  constructor(props) {
      super(props);
      this.state = {
          modelVisible:false,
          activeEducatives:[],
      };
  }

  toProfile = () => {
    var appStore = this.props.appStore;
    appStore.activeTab = 'Profile';
    this.props.updateAppstore(appStore);
  }

  setActiveEducatives(item){
    this.setState({activeEducatives:item});
    this.setState({modelVisible:true});
  }

  clsModel(){
    this.setState({modelVisible:false});
  }

  render() {
    let {lan} = this.props.appStore;
    return (
      <View>
        <View>
          <Toolbar
            style={{ container: {'backgroundColor':'#ca0000'}}}
            centerElement={language.educative[lan]}
            rightElement={this.props.appStore.usertype == 'employees' ? "account-box" : "" }
            onRightElementPress={ () => { this.toProfile() }}
          />
            <FlatList
                style={{height:Dimensions.get('window').height-100}}
                data={this.props.appStore.educatives}
                extraData={this.state.watchChange}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={({item, index}) => 
                <TouchableOpacity style={{marginBottom:this.props.appStore.educatives.length == index+1 ? 300 : 30, alignItems:'center', justifyContent:'center', width:'100%'}} onPress={()=> this.setActiveEducatives(item)}>
                  <Image
                    style={{width: Dimensions.get('window').width-20, height: 150, marginVertical:10, borderRadius:10}}
                    source={{uri: "https://delowarhossaintb.000webhostapp.com/img/"+item.thumble}}
                  />
                  <Text style={{fontSize:12, width:'90%', color:"#000", fontWeight:'900', marginTop:10}}>{item.title}</Text>
                </TouchableOpacity>
            }
            />
        </View>
        {(this.state.modelVisible) &&
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modelVisible}
          onRequestClose={() => {
            console.log('Model Closed');
          }}>
          <Toolbar
            style={{ container: {'backgroundColor':'#ca0000'}}}
            leftElement="chevron-left"
            centerElement={this.state.activeEducatives.title}
            onLeftElementPress={ () => { this.clsModel() }}
          />
          <WebView
              source={{uri: 'https://www.youtube.com/watch?v=9ZhkYyPxRjE'}}
          />
        </Modal>
        }
      </View>
    );
  }
}