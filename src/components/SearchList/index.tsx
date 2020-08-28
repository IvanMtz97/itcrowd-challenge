import React from 'react';
import { ScrollView } from 'react-native';

import { useWeather } from '../../contexts/Weather';
import City from './City';

export default function SearchList() {
  const { cities } = useWeather();

  function renderCities() {
    return cities.map((c: any) => (
      <City
        key={c.id}
        date={c.storedAt}
        name={c.name}
      />
    ));
  }

  return (
    <ScrollView style={{ flex: 1 }} testID="cities-list">
      {renderCities()}
    </ScrollView>
  );
}
