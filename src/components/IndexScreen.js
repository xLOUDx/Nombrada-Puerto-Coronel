import React from 'react';
import { Text, View, TextInput, Alert, AsyncStorage, TouchableOpacity, ImageBackground, BackHandler } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LogoImage from '../componentImage/LogoImage'
import Style from '../styles/Style'

export default class IndexScreen extends React.Component {

  static navigationOptions = {
    headerRight: ( <LogoImage /> ),
    headerLeft: null,
  };

  constructor(props){
    super (props)
    const { params } = this.props.navigation.state;
    this.state = {
      run: '',
      pass: '',
    }
  }


  async componentDidMount(){

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;

    });
    try {
      const run = await AsyncStorage.getItem('@MySuperStore:run');
      const pass = await AsyncStorage.getItem('@MySuperStore:pass');

      this.setState({ run: run, pass: pass });

    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  async removeKey() {
    fetch('http://sgt_desa.puertodecoronel.cl/nombrada/app/eliminatoken',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_run: this.state.run,
        user_pass: this.state.pass,
      })
    }).then((response) => response.json())
        .then((responseJson) => {

          if(responseJson == "TRUE"){
            try{
              const run = AsyncStorage.removeItem('@MySuperStore:run');
              const pass = AsyncStorage.removeItem('@MySuperStore:pass');

              Alert.alert('Puerto de Coronel', 'Sesión terminada');
              const { navigate } = this.props.navigation;
              return navigate('Home');

            } catch(error){
              Alert.alert('Puerto de Coronel', 'No se pudo cerrar sesión' + error )
            }
          }
          else{
            Alert.alert('Puerto de Coronel', 'No se pudo completar la operación');
          }
        }).catch((error) => {
          console.log(error);
        })
  }


  render() {
    const { navigate } = this.props.navigation;

    return (

    <ImageBackground
      source = {require('../image/background.jpg')}
      style={Style.StyleBackground}>
          <View style={Style.StyleContainer} >

            <TouchableOpacity
              activeOpacity = { .4 }
              style={ Style.StyleButton }
              onPress = { () => navigate('Task') }>
              <Text style={ Style.StyleTextButton }> Nombrada </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity = { .4 }
              style={ Style.StyleButton }
              onPress = { () => navigate('Record') }>
              <Text style={ Style.StyleTextButton }> Historial nombrada </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity = { .4 }
              style={ Style.StyleButton }
              onPress = { () => navigate('Config') }>
              <Text style={ Style.StyleTextButton }> Opciones </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity = { .4 }
              style={ Style.StyleButton }
              onPress = {this.removeKey.bind(this)}>
              <Text style={ Style.StyleTextButton }> Salir </Text>
            </TouchableOpacity>

          </View>
    </ImageBackground>
    );
  }
}
