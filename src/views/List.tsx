import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';

import SearchInput from '../components/SearchInput';
import SearchList from '../components/SearchList';
import { useWeather } from '../contexts/Weather';

export default function List() {
  const {
    cities,
    rehydrate,
  } = useWeather();

  function handleRehydrate() {
    rehydrate();
  }

  const rehydrateCallback = useCallback(handleRehydrate, []);

  useEffect(() => {
    rehydrateCallback();
  }, [rehydrateCallback, cities]);

  return (
    <View style={styles.container}>
      <SearchInput />

      <SearchList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d3e52',
    flex: 1,
  },
});
