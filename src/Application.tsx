import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';

import RootStack from './Router';
import { WeatherProvider } from './contexts/Weather';

export default function Application() {
  return (
    <WeatherProvider>
      <View style={styles.container}>
        <StatusBar backgroundColor="#2d3e52" />
        <RootStack />
      </View>
    </WeatherProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
