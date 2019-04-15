import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {SimpleScreen} from "./src/Components"
import AppNavigator from "./src/index"







export default class App extends Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}

