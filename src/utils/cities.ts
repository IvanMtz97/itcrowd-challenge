import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

export async function getStoredCityWeathers(): Promise<Array<any>> {
  const storedStringifiedCityWeathers = await AsyncStorage.getItem('cities');

  return JSON.parse(`${storedStringifiedCityWeathers}`) || [];
}

export async function getStoredCityWeather(cityName: string) {
  const cityWeathers = await getStoredCityWeathers();

  return cityWeathers.find((c) => c.name === cityName);
}

export async function storeCityWeather(city: any) {
  const cityWeathers = await getStoredCityWeathers();
  const computedCities = [
    ...cityWeathers,
    {
      ...city,
      storedAt: moment().toString(),
    },
  ];

  await AsyncStorage.setItem('cities', JSON.stringify(computedCities));
}

export async function removeStoredCity(cityName: string) {
  const cityWeathers = await getStoredCityWeathers();
  const computedCities = cityWeathers.filter((c) => c.name !== cityName);

  await AsyncStorage.setItem('cities', JSON.stringify(computedCities));
  return computedCities;
}

export async function fetchCity(cityName: string) {
  const storedCityWeather = await getStoredCityWeather(cityName);

  if (storedCityWeather) {
    return storedCityWeather;
  }

  const APP_ID = 'fc81484cb7abbf1c4de39eba78150215';
  const URL = 'http://api.openweathermap.org/data/2.5/';
  const response = await fetch(
    `${URL}weather?q=${cityName}&appid=${APP_ID}`,
  );
  const payload = await response.json();
  const city = {
    ...payload,
    cod: Number(payload.cod),
  };

  if (city.cod === 200) {
    storeCityWeather(city);
  }

  return city;
}
