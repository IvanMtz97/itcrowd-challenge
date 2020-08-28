import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Forecast from './views/Forecast';
import List from './views/List';

const Stack = createStackNavigator();

function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="List"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen component={List} name="List" />
        <Stack.Screen component={Forecast} name="Forecast" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
