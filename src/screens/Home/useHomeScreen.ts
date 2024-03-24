import {setSignOut} from '@/redux/slices/authSlice';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {getCelsius} from '@/utils/helper';
import auth from '@react-native-firebase/auth';
import type {ICity} from './types';

const useHomeScreen = () => {
  const dispatch = useDispatch();
  const user = auth().currentUser;
  const [loading, setLoading] = useState<boolean>(false);
  const [cities, setCities] = useState<ICity[] | []>([]);

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [openedCityIndex, setOpenedCityIndex] = useState<number>(0);
  const [curCity, setCurCity] = useState<ICity | null>(null);

  useEffect(() => {
    setCurCity(cities[openedCityIndex]);
  }, [cities, openedCityIndex]);

  const getWeather = async (cityName: string) => {
    try {
      const api = 'd270e786016642129ab190318242103'; //TODO: move to env variables
      const url = `https://api.weatherapi.com/v1/current.json?key=${api}&q=${cityName}&aqi=no`;

      const response = await fetch(url);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error.message);

      return {
        cityDate: result,
        cityName: result.location.name,
        temperatureInCelsius: getCelsius(result.current.temp_f, 'fahrenheit'),
      };
    } catch (error) {
      console.error('Error in getWeather: ', error);
    }
  };

  const fetchWeather = async () => {
    setLoading(true);
    const citiesToFetch = ['Cairo', 'Al-Mansourah, Egypt', 'Alexandria'];

    try {
      const responses = await Promise.all(
        citiesToFetch.map(city => getWeather(city)),
      );

      setCities(
        responses.filter(city => city !== (undefined as any)) as ICity[],
      );
    } catch (error) {
      console.error('Error in fetchWeather: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            auth()
              .signOut()
              .then(() => {
                dispatch(setSignOut());
                console.log('User signed out!');
              });
          },
        },
      ],
      {cancelable: true},
    );
  };

  return {
    user,
    getWeather,
    fetchWeather,
    loading,
    cities,
    handleLogout,
    showDialog,
    setShowDialog,
    setOpenedCityIndex,
    setCurCity,
    curCity,
  };
};

export default useHomeScreen;
