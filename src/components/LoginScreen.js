import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert, AsyncStorage, ImageBackground } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LogoImage from '../componentImage/LogoImage'
import Style from '../styles/Style'

export default class LoginScreen extends React.Component {

  constructor(props){
    super (props)
    const { params } = this.props.navigation.state;
    this.state = {
      run: '',
      pass: '',
      token: params.Phone,
    }
  }

  static navigationOptions = {
    headerTitle: <LogoImage /> ,
    headerLeft: null,
  };

  SendData = () => {

    if( (this.state.run.length > 0 ) && (this.state.pass.length > 0 ) ){

    fetch('http://sgt_desa.puertodecoronel.cl/nombrada/app/actualizatoken',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_run: this.state.run,
        user_pass: this.state.pass,
        user_token: this.state.token,
      })

    }).then((response) => response.json())
        .then((responseJson) => {

            if(responseJson == "TRUE"){

              try {
                 AsyncStorage.setItem('@MySuperStore:run', this.state.run );
                 AsyncStorage.setItem('@MySuperStore:pass', this.state.pass );
              } catch(error) {
                console.log("Error saving data" + error);
              }
              const { navigate } = this.props.navigation;
              return navigate('Index');
            }
            else{
              Alert.alert( 'Puerto de Coronel', 'Rut y/o clave invalidos' );
            }
        }).catch((error) => {
          console.log(error);
        })
    }
      else{
        Alert.alert( 'Puerto de Coronel', 'Complete todos los campos' );
      }
  }


  render() {
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground
        source = {require('../image/Login.jpg')}
        style={Style.StyleBackground}>
          <View style={Style.StyleContainer} >
            <Text style={Style.StyleWelcomeLogin} > Login usuario </Text>

            <TextInput
              autoCapitalize = "none"
              underlineColorAndroid = "transparent"
              style={ Style.StyleTextInput }
              placeholder = "Ingrese RUN"
              onChangeText = { (text) => this.setState({run: text})}
            />

            <TextInput
              autoCapitalize = "none"
              underlineColorAndroid = "transparent"
              style={ Style.StyleTextInput }
              placeholder = "Ingrese clave"
              secureTextEntry
              onChangeText = {(text) => this.setState({pass: text})}
            />

            <TouchableOpacity
              activeOpacity = { .4 }
              style={ Style.StyleButton }
              onPress = { this.SendData }>
              <Text style={ Style.StyleTextButton }> Ingresar </Text>
            </TouchableOpacity>

          </View>
      </ImageBackground>
    );
  }
}
