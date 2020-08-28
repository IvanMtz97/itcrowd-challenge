import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import React from 'react';
import {
  ScrollView,
} from 'react-native';
import {
  fetchCity,
  getStoredCityWeather,
  getStoredCityWeathers,
  removeStoredCity,
} from '../src/utils/cities';
import fetch from 'isomorphic-fetch';
import renderer from 'react-test-renderer';

import { WeatherProvider } from '../src/contexts/Weather';
import SearchList from '../src/components/SearchList';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

describe('>>> Cities weather', () => {
  it('Should store London city weather', async () => {
    const cityName = 'London';
    const data = await fetchCity(cityName);
    
    expect(data.name).toBe(cityName);
  });

  it('Should fail to store Asdf city weather', async () => {
    const cityName = 'Asdf';
    const data = await fetchCity(cityName);

    expect(data.name).toBe(undefined);
  });

  it('Should load London cached city weather', async () => {
    const cityName = 'London';
    const data = await getStoredCityWeather(cityName);
    
    expect(data.name).toBe(cityName);
  });

  it('Should have 1 cached city weather', async () => {
    const data = await getStoredCityWeathers();

    expect(data.length).toBe(1);
  });

  it('Should delete London city', async () => {
    const cityName = 'London';
    const data = await removeStoredCity(cityName);

    expect(data.length).toBe(0);
  });

  it('Should render cities weather list with 1 item', async () => {
    const wrapper = renderer.create(
      <WeatherProvider>
        <SearchList />
      </WeatherProvider>
    );
    const citiesList = wrapper.root.findByType(ScrollView).findAll(d => d.type === 'View').length;
    
    expect(citiesList).toBe(1);
  });
});