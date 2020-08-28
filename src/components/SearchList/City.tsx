import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

import { useWeather } from '../../contexts/Weather';
import { removeStoredCity } from '../../utils/cities';

import cityIcon from '../../../assets/city-icon.png';
import deleteIcon from '../../../assets/delete-icon.png';

export default function City(props: any) {
  const navigation = useNavigation();
  const {
    rehydrate,
  } = useWeather();

  function handleCity() {
    navigation.navigate('Forecast', { name: props.name });
  }

  async function handleDelete() {
    await removeStoredCity(props.name);
    rehydrate();
  }

  return (
    <TouchableOpacity
      onPress={handleCity}
      style={styles.container}
    >
      <View style={styles.infoContainer}>
        <Image source={cityIcon} style={styles.cityImage} />

        <View style={styles.dataContainer}>
          <Text style={styles.cityNameText}>{props.name}</Text>

          <Text style={styles.cityDateText}>
            {moment(props.date).format('MMMM Do, YYYY h:mm a').toString()}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleDelete}
          style={styles.actionContainer}
        >
          <Image
            source={deleteIcon}
            style={styles.deleteImage}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    marginLeft: 20,
    width: 40,
  },
  cityDateText: {
    color: '#bebebe',
    fontSize: 12,
  },
  cityImage: {
    height: 40,
    marginRight: 10,
    width: 40,
  },
  cityNameText: {
    color: '#06e6bf',
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    height: 100,
    width: '100%',
  },
  dataContainer: {
    flex: 1,
  },
  deleteImage: {
    height: 30,
    width: 30,
  },
  infoContainer: {
    alignItems: 'center',
    borderBottomColor: '#07997f',
    borderBottomWidth: 0.3,
    flexDirection: 'row',
    height: 100,
    width: '85%',
  },
  refreshImage: {
    height: 30,
    width: 30,
  },
});
