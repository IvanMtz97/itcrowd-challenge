import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useWeather } from '../../contexts/Weather';

export default function SearchInput() {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const {
    selectedCity,
    getCityWeather,
  } = useWeather();

  useEffect(() => {
    if (selectedCity) {
      navigation.navigate('Forecast', { name: selectedCity.name });
    }
  }, [selectedCity]);

  function handleInputChange(text: string) {
    setSearchText(text);
  }

  function handleSubmit() {
    getCityWeather(searchText);
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={handleInputChange}
        onSubmitEditing={handleSubmit}
        placeholder="Search city"
        placeholderTextColor="#1f756d"
        style={styles.textInput}
        value={searchText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 30,
    width: '100%',
  },
  textInput: {
    backgroundColor: '#273446',
    borderRadius: 50,
    color: '#06e6bf',
    flex: 1,
    paddingLeft: 30,
  },
});
