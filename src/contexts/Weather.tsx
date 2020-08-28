import React, { createContext, useContext, useReducer } from 'react';
import {
  fetchCity,
  getStoredCityWeathers,
} from '../utils/cities';

const WeatherContext = createContext({});

const initialState = {
  data: [],
  error: false,
  loading: false,
  selectedCity: null,
};

type INITIAL_STATE = {
  data: Array<any>,
  error: boolean,
  loading: boolean,
  selectedCity: null,
};

type ACTION = {
  payload?: any,
  type: string,
}

function reducer(state: INITIAL_STATE, action: ACTION) {
  switch (action.type) {
    case 'CITY_WEATHER_LOADED':
      return {
        ...state,
        data: action.payload.cities,
        error: false,
        loading: false,
        selectedCity: action.payload.selectedCity,
      };
    case 'LOAD_CITY_WEATHER_REQUESTED':
      return {
        ...state,
        error: false,
        loading: true,
      };
    case 'LOAD_CITY_WEATHER_FAILED':
      return {
        ...state,
        error: true,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function useWeatherActionsWithStore(initialWeather = initialState) {
  const [state, dispatch] = useReducer(reducer, initialWeather);

  return {
    ...state,
    cities: state.data,
    getCityWeather: async (cityName: string) => {
      dispatch({ type: 'LOAD_CITY_WEATHER_REQUESTED' });
      const data = await fetchCity(cityName);

      if (data.cod === 404) {
        dispatch({ type: 'LOAD_CITY_WEATHER_FAILED' });
      } else {
        const cities = await getStoredCityWeathers();

        dispatch({
          payload: {
            cities,
            selectedCity: data,
          },
          type: 'CITY_WEATHER_LOADED',
        });
      }
    },
    rehydrate: async () => {
      const cities = await getStoredCityWeathers();
      dispatch({
        payload: {
          cities,
          selectedCity: null,
        },
        type: 'CITY_WEATHER_LOADED',
      });
    },
  };
}

export function WeatherProvider(props: any) {
  return (
    <WeatherContext.Provider value={useWeatherActionsWithStore()}>
      {props.children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext<any>(WeatherContext);
}
