import React from 'react';
import { Text, View, ListView, Alert, AsyncStorage, ActivityIndicator, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Style from '../styles/Style'

export default class IndexScreen extends React.Component {
  constructor(props){
    super (props)
    this.state = {
      token: 'asdasdasd123',
      all: '',
      data: '',
      isLoading: true,
    }
  }

  static navigationOptions = {
    title: 'Historial nombrada',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 22,
    },
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#005C82',
    },
  };


  async componentDidMount(){
      try {
        const run = await AsyncStorage.getItem('@MySuperStore:run');
        const pass = await AsyncStorage.getItem('@MySuperStore:pass');

        this.setState({ run: run,  pass: pass });

        if( !run && !pass ){
          const { navigate } = this.props.navigation;
          return navigate('Login');

        }
        else{
          fetch('http://sgt_desa.puertodecoronel.cl/nombrada/app/datostrabnombrado', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                      body: JSON.stringify({
                        user_run: this.state.run,
                        user_pass: this.state.pass,
                        user_type: null,
                      })
             })
             .then((response) => response.json())
                .then((responseJson) => {

                  let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });

                  this.setState({
                    isLoading: false,
                    data: responseJson,
                    dataSource: ds.cloneWithRows(responseJson),
                  })

             }) .catch((error) => {
                console.error(error);
             });
        }

    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

      render() {
        const { navigate } = this.props.navigation;

        if(this.state.isLoading){
          return(
            <View style={{flex:1, paddingTop:20 }} >
              <ActivityIndicator />
              </View>
          );
        }

        if(this.state.data.length <= 0){
          Alert.alert("Puerto de Coronel", "No hay datos de nombrada",
            [
              { text: 'Volver a inicio', onPress: () => navigate('Index') },
            ], { cancelable: false }
          );
        }


        return (

          <ScrollView >

            <ListView
              enableEmptySections flag
              dataSource = {this.state.dataSource}
              renderRow = {(rowData) =>
                <View style={Style.StyleBox} >

                    <View style={ Style.StyleBoxTitle }>
                        <Text style={Style.StyleWelcome} > {rowData.ESPECIALIDAD} </Text>
                    </View>

                    <View style={ Style.StyleBoxDetails }>
                        <Text> Fecha de turno: { rowData.FECHA_NOMBRADA } </Text>
                        <Text> Turno: { rowData.TURNO_ID } </Text>
                        <Text> Hora de confirmación: { rowData.HORA_CONF } </Text>
                        <Text style={Style.StyleTextResponse} > { rowData.CONFIRMACION } </Text>

                   </View>

                </View>
                }
            />

          </ScrollView>
        );
      }
}
