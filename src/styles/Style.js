import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default StyleSheet.create({
  StyleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  StyleBackground: {
    flex: 1,
    justifyContent: 'center',
    width: null,
    height: null,
    // opacity: 0.8 //VERRR QUE QUEDA MEJOR
  },
  StyleContainerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  StyleWelcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
  },
  StyleWelcomeLogin: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
  },
  StyleTextInput:{
    textAlign: 'center',
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 7,
    marginBottom: 10,
    width: '95%'
  },
  StyleText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 17,
    margin: 15,
  },
  StyleTextDetails: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
    margin: 10,
  },
  StyleTitle: {
    color: '#009688',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  StyleButton:{
    margin: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#005C82',
    marginBottom: 20,
    width: '90%',
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
  },
  StyleTextButton: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
  },
  StyleTextResponse: {
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    fontSize: 17,
  },
  StyleIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  StyleListView: {
    backgroundColor: 'blue'
  },
  StyleBox: {
    flex: 1,
    backgroundColor: '#F4C664',
    margin: 8,
    borderRadius: 7,
    padding: 5,
  },
  StyleBoxTitle: {
    backgroundColor: '#F7A700',
    alignSelf: 'center',
    borderRadius: 3,
    opacity: 0.8,
  },
  StyleBoxDetails: {
    alignItems: 'center',
    backgroundColor: '#F4C664',
  },
  StyleBoxAgree: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    flexDirection:'row',
  },
  StyleButton1:{
    margin: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'darkgreen',
    marginBottom: 20,
    width: '40%',
    borderRadius: 7,
  },
  StyleButton2:{
    margin: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'darkred',
    marginBottom: 20,
    width: '40%',
    borderRadius: 7,
  },
 StyleTextTitle: {
   color: 'black',
   textAlign: 'center',
   fontSize: 19,
   margin: 10,
   fontWeight: 'bold',
 }

});
