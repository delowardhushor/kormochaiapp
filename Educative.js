import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class Educative extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'https://www.youtube.com/watch?v=9ZhkYyPxRjE'}}
        style={{marginTop: 20}}
      />
    );
  }
}