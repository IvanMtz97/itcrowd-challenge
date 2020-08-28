import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import moment from 'moment';
import MapView from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';

import { getStoredCityWeather } from '../utils/cities';

import humidityIcon from '../../assets/humidity-icon.png';
import pressureIcon from '../../assets/pressure-icon.png';

import mapStyle from '../utils/mapStyle.json';

export default function Forecast(props: any) {
  const cityName = props.route.params.name;
  const [loading, setLoading] = useState(true);
  const [cityWeather, setCityWeather] = useState(null);
  const [date, setDate] = useState('');

  const loadCityCallback = useCallback(async () => {
    const storedCityWeather = await getStoredCityWeather(cityName);
    setCityWeather(storedCityWeather);
  }, []);

  useMemo(() => setInterval(
    () => setDate(
      moment().format('MMMM Do, YYYY HH:mm:ss').toString(),
    ), 1000,
  ), []);

  useEffect(() => {
    loadCityCallback();
    setDate(moment().format('MMMM Do, YYYY HH:mm:ss').toString());
  }, [loadCityCallback]);

  useEffect(() => {
    setLoading(!cityWeather);
  }, [cityWeather]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#06e6bf" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperatureText}>
          {cityWeather.main.temp.toFixed(0)}°
        </Text>
        <Text style={styles.dateText}>
          {date}
        </Text>
      </View>

      <View style={styles.indicatorsContainer}>
        <View style={styles.indicatorContainer}>
          <Image
            resizeMode="center"
            source={humidityIcon}
            style={styles.indicatorIcon}
          />

          <Text style={styles.indicatorValueText}>
            {cityWeather.main.humidity} %
          </Text>
        </View>

        <View style={styles.indicatorContainer}>
          <Image
            resizeMode="center"
            source={pressureIcon}
            style={[styles.indicatorIcon, styles.smallImage]}
          />

          <Text style={styles.indicatorValueText}>
            {cityWeather.main.pressure}
          </Text>
        </View>

        <View style={styles.indicatorContainer}>
          <Text style={styles.indicatorIconText}>MAX</Text>

          <Text style={styles.indicatorValueText}>
            {cityWeather.main.temp_max}°
          </Text>
        </View>

        <View style={styles.indicatorContainer}>
          <Text style={styles.indicatorIconText}>MIN</Text>

          <Text style={styles.indicatorValueText}>
            {cityWeather.main.temp_min}°
          </Text>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <LinearGradient
          colors={[
            '#2d3e52',
            '#2d3e52',
            'transparent',
          ]}
          style={styles.linearGradient}
        />
        <MapView
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: cityWeather.coord.lat,
            latitudeDelta: 0.005,
            longitude: cityWeather.coord.lon,
            longitudeDelta: 0.1,
          }}
          style={styles.map}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d3e52',
    flex: 1,
  },
  dateText: {
    color: '#fff',
  },
  indicatorContainer: {
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
    width: 80,
  },
  indicatorIcon: {
    height: 50,
    width: 50,
  },
  indicatorIconText: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 28,
  },
  indicatorsContainer: {
    flexDirection: 'row',
    height: 100,
    justifyContent: 'center',
    width: '100%',
  },
  indicatorValueText: {
    color: '#fff',
  },
  linearGradient: {
    height: 80,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: '#2d3e52',
    flex: 1,
    justifyContent: 'center',
  },
  map: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  smallImage: {
    height: 40,
    marginBottom: 5,
    width: 40,
  },
  temperatureContainer: {
    alignItems: 'center',
    height: 300,
    justifyContent: 'center',
    width: '100%',
  },
  temperatureText: {
    color: '#fff',
    fontSize: 75,
  },
});
