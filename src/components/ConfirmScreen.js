import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert, AsyncStorage, BackHandler } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Style from '../styles/Style'
import LogoImage from '../componentImage/LogoImage'


export default class LoginScreen extends React.Component {
  constructor(props){
    super (props)
    this.state = {
      pass: '',
      run: '',
    }
  }

  static navigationOptions = {
    title: 'Confirmación de turno',
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


  SendData = (resp) => {
    const { params } = this.props.navigation.state;

    if( this.state.pass.length > 0 ){
        fetch('http://sgt_desa.puertodecoronel.cl/nombrada/app/confirmanotificacion', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_run: params.esp.RUT,
              user_pass: this.state.pass,
              user_folio: params.esp.FOLIO,
              user_rspta: resp,
            })
        })
          .then((response) => response.json())
            .then((responseJson) => {

                if( responseJson == null){
                    Alert.alert("Puerto de Coronel", "Clave incorrecta");
                }
                if(responseJson == "FALSE"){
                  const { navigate } = this.props.navigation;
                  Alert.alert("Puerto de Coronel", "El turno ya no está disponible",
                    [
                      { text: 'Volver a inicio', onPress: () => navigate('Index', { run: this.state.run, pass: this.state.pass }) },
                    ], { cancelable: false }
                  );
                }
                else{
                  if(responseJson == "TRUE"){
                    const { navigate } = this.props.navigation;
                    Alert.alert("Puerto de Coronel", "Respuesta enviada",
                      [
                        { text: 'Volver a inicio', onPress: () => navigate('Index', { run: this.state.run, pass: this.state.pass }) },
                      ], { cancelable: false }
                    );
                  }

                  else{
                    Alert.alert("Puerto de Coronel", "No se pudo completar la solicitud");
                  }
               }
            }) .catch((error) => {
                  console.error(error);
                });
    }
    else {
      Alert.alert("Puerto de Coronel", "Confirme su clave");
    }
  }


  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    return (

      <View style={Style.StyleContainer} >

          <Text style={Style.StyleWelcome} > { params.esp.ESPECIALIDAD } </Text>
          <Text style={Style.StyleTextDetails} > <Text style={Style.StyleTextTitle} > Fecha de nombrada {"\n"} </Text> { params.esp.FECHA_NOMBRADA } </Text>
          <Text style={Style.StyleTextDetails} > <Text style={Style.StyleTextTitle} > Turno {"\n"} </Text> { params.esp.TURNO_ID } </Text>
          <Text style={Style.StyleTextDetails} > <Text style={Style.StyleTextTitle} > Sector {"\n"} </Text> { params.esp.SECTOR } </Text>
          <Text style={Style.StyleTextDetails} > <Text style={Style.StyleTextTitle} > Faena {"\n"} </Text> { params.esp.FAENA } </Text>

          <TextInput
            autoCapitalize = "none"
            underlineColorAndroid = "transparent"
            style={ Style.StyleTextInput }
            placeholder = "Confirme clave"
            secureTextEntry
            onChangeText = {(text) => this.setState({pass: text})}
          />

        <View style={Style.StyleBoxAgree} >

          <TouchableOpacity
            activeOpacity = { .4 }
            style={ Style.StyleButton1 }
            onPress = { () => this.SendData(0) }>
            <Text style={ Style.StyleTextButton }> Si </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity = { .4 }
            style={ Style.StyleButton2 }
            onPress = { () => this.SendData(1) }>
            <Text style={ Style.StyleTextButton }> No </Text>
          </TouchableOpacity>

        </View>

        <Text style={Style.StyleTextDetails} > {params.esp.GENERADO} </Text>

      </View>
    );
  }
}
