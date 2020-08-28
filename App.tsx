import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';

import Application from './src/Application';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2d3e52" />

      <Application />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
