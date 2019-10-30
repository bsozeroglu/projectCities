import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Root from './src/Root'

export default class App extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Root></Root>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
