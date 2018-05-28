import React from 'react';
import { Text, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Style from '../styles/Style'

export default class LogoImage extends React.Component {

  render() {

    return (
      <View style={Style.StyleContainer} >
        <Image
         source = {require('../image/header.png')}
         style = {{ resizeMode: 'contain' }}
        />
      </View>
    );
  }
}
