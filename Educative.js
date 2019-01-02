import React, { Component } from 'react';
import { WebView, Modal,View, FlatList, Text, Dimensions , Image, TouchableOpacity} from 'react-native';
import { Button, Toolbar } from 'react-native-material-ui';


export default class Educative extends Component {

  constructor(props) {
      super(props);
      this.state = {
          modelVisible:false,
          activeEducatives:[],
      };
  }


  setActiveEducatives(item){
    this.setState({activeEducatives:item});
    this.setState({modelVisible:true});
  }

  clsModel(){
    this.setState({modelVisible:false});
  }

  render() {
    return (
      <View>
        <View>
          <Toolbar
            style={{ container: {'backgroundColor':'#4CAF50'}}}
            centerElement={this.state.activeEducatives.title}
            onRightElementPress={ () => { this.props.clsModel() }}
          />
            <FlatList
                data={this.props.appStore.educatives}
                extraData={this.state.watchChange}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={({item, index}) => 
                <TouchableOpacity style={{marginBottom:30, alignItems:'center', justifyContent:'center', width:'100%'}} onPress={()=> this.setActiveEducatives(item)}>
                  <Image
                    style={{width: Dimensions.get('window').width, height: 150}}
                    source={{uri: item.thumble}}
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
            style={{ container: {'backgroundColor':'#4CAF50'}}}
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