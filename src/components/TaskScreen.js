import React from 'react';
import { Text, View, ListView, Alert, AsyncStorage, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
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
    title: 'Nombrada',
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
                        user_type: 0,
                      })
             })
             .then((response) => response.json())
                .then((responseJson) => {

                this.intent = setInterval(() => {
                  let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });

                  this.setState({
                    isLoading: false,
                    data: responseJson,
                    dataSource: ds.cloneWithRows(responseJson),
                  })
                  clearInterval(this.intent)
                }, 1000);

                  if( responseJson.length == 1 ) {
                    const { navigate } = this.props.navigation;
                    return navigate('Confirm', { esp: responseJson[0] });
                  }


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
          Alert.alert("Puerto de Coronel", "Usted no ha sido nombrado o expiró su tiempo de respuesta.",
            [
              { text: 'Volver a inicio', onPress: () => navigate('Index') },
            ], { cancelable: false }
          );
        }



        return (
          <ScrollView >

            <ListView
              enableEmptySections flag
              onEndReached = {this.end}
              dataSource = {this.state.dataSource}
              renderRow = {(rowData) =>

                <View style={Style.StyleBox} >
                  <TouchableOpacity onPress = { () => navigate('Confirm', { esp: rowData }) }>

                    <View style={ Style.StyleBoxTitle }>
                        <Text style={Style.StyleWelcome} > {rowData.ESPECIALIDAD} </Text>
                    </View>

                    <View style={ Style.StyleBoxDetails }>
                        <Text> Fecha de turno: { rowData.FECHA_NOMBRADA } </Text>
                        <Text> Turno: { rowData.TURNO_ID } </Text>
                   </View>

                  </TouchableOpacity>
                </View>
                }
            />

          </ScrollView>
        );
      }
}
