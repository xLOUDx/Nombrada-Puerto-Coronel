import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Style from '../styles/Style'
import LogoImage from '../componentImage/LogoImage'


export default class ConfigScreen extends React.Component {
  constructor(props){
    super (props)
    this.state = {
      oldPass: '',
      run: '',
      newPass: '',
    }
  }

  static navigationOptions = {
    title: 'Configuración',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#005C82',
    },
  };

  async componentDidMount(){
    try {
      const run = await AsyncStorage.getItem('@MySuperStore:run');
      this.setState({ run: run });

    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }


  UpdatePass = () => {

    if( (this.state.newPass.length > 0 ) && (this.state.oldPass.length > 0 ) ){

      fetch('http://sgt_desa.puertodecoronel.cl/nombrada/app/cambiarclaveapp',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_run: this.state.run,
          user_oldPass: this.state.oldPass,
          user_newPass: this.state.newPass,
        })

      }).then((response) => response.json())
          .then((responseJson) => {

            if(responseJson == "TRUE" ){
              Alert.alert('Puerto de Coronel', 'Clave cambiada');
              const run =  AsyncStorage.removeItem('@MySuperStore:run');
              const pass =  AsyncStorage.removeItem('@MySuperStore:pass');

              const { navigate } = this.props.navigation;
              return navigate('Home');
            }
              else{
                Alert.alert( 'Puerto de Coronel', 'Rut y/o clave invalidos' );
              }
          })
          .catch((error) => {
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

      <View style={Style.StyleContainer} >
        <Text style={Style.StyleWelcome} > Cambiar clave </Text>

        <TextInput
          secureTextEntry
          autoCapitalize = "none"
          underlineColorAndroid = "transparent"
          style={ Style.StyleTextInput }
          placeholder = "Ingrese clave actual"
          onChangeText = { (text) => this.setState({oldPass: text})}
        />

        <TextInput
          secureTextEntry
          autoCapitalize = "none"
          underlineColorAndroid = "transparent"
          style={ Style.StyleTextInput }
          placeholder = "Ingrese nueva clave"
          onChangeText = { (text) => this.setState({newPass: text})}
        />

        <TouchableOpacity
          activeOpacity = { .4 }
          style={ Style.StyleButton }
          onPress = { this.UpdatePass }>
          <Text style={ Style.StyleTextButton }> Confirmar </Text>
        </TouchableOpacity>

      </View>
    );
  }
}
