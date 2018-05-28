import React from 'react';
import { Text, View, AsyncStorage, Image, ImageBackground, BackHandler } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginScreen from './src/components/LoginScreen'
import ConfigScreen from './src/components/ConfigScreen'
import IndexScreen from './src/components/IndexScreen'
import TaskScreen from './src/components/TaskScreen'
import RecordScreen from './src/components/RecordScreen'
import ConfirmScreen from './src/components/ConfirmScreen'
import LogoImage from './src/componentImage/LogoImage'
import PushNotificationAndroid from 'react-native-push-notification'
import Style from './src/styles/Style'
var PushNotification = require('react-native-push-notification');



let topo = '';
let arrive = '';

PushNotification.configure({

    onRegister: function(token) {
      topo = token.token;
    },

    onNotification: function(notification) {
        arrive = 1;
        PushNotification.localNotificationSchedule({
          title: 'Puerto de Corofnel',
          largeIcon: 'ic_launcher',
          message: notification['name'],
          bigText: notification['body'],
          date: new Date(Date.now())
        });
    },

    senderID: "253008771277",
});


class HomeScreen extends React.Component {

  static navigationOptions = {
    headerRight: ( <LogoImage /> ),
    headerLeft: null,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }

  async componentDidMount(){
    try {
      const run = await AsyncStorage.getItem('@MySuperStore:run');
      const pass = await AsyncStorage.getItem('@MySuperStore:pass');
      this.setState({ run: run, pass: pass });

        if( !run && !pass ){
          const { navigate } = this.props.navigation;
          return navigate('Login', { Phone: topo });
        }
        else{
          const { navigate } = this.props.navigation;
          return navigate('Index');
        }

    } catch (error) {
        console.log("Error retrieving data" + error);
      }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={Style.StyleContainer}>
      </View>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: LoginScreen },
  Index: { screen: IndexScreen },
  Task: { screen: TaskScreen },
  Confirm: { screen: ConfirmScreen },
  Config: { screen: ConfigScreen },
  Record: { screen: RecordScreen },
});

export default class App extends React.Component{
  render() {
    return <SimpleApp />;
  }
}
