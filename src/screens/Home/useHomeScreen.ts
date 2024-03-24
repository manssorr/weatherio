import {setSignOut} from '@/redux/slices/authSlice';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getCelsius} from '@/utils/helper';
import auth from '@react-native-firebase/auth';
import type {ICity} from '@/utils/commonTypes';
import {selectCities} from '@/redux/slices/citySlice';

const useHomeScreen = () => {
  const dispatch = useDispatch();
  const selectedCities = useSelector(selectCities);

  const user = auth().currentUser;

  const [loading, setLoading] = useState<boolean>(false);
  const [cities, setCities] = useState<ICity[] | []>([]);
  const [error, setError] = useState<string>('');

  const [showCityDialog, setShowCityDialog] = useState<boolean>(false);
  const [openedCityIndex, setOpenedCityIndex] = useState<number>(0);
  const [curCity, setCurCity] = useState<ICity | undefined>(undefined);

  const [showAddCityDialog, setShowAddCityDialog] = useState<boolean>(false);

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
    } catch (err: any) {
      setError(err.message as string);
      console.error('Error in getWeather: ', err.message);
    }
  };
  const fetchWeather = async () => {
    setLoading(true);

    try {
      if (selectedCities.length === 0) {
        return;
      }
      const responses = await Promise.all(
        selectedCities.map((city: string) => getWeather(city)),
      );

      setCities(
        responses.filter(city => city !== (undefined as any)) as ICity[],
      );
    } catch (err) {
      console.error('Error in fetchWeather: ', err);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    console.log('fetched', showAddCityDialog);
    !showAddCityDialog && fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddCityDialog]);

  useEffect(() => {
    setCurCity(cities[openedCityIndex]);
  }, [cities, openedCityIndex]);

  const showCityDialogHandler = (index: number) => {
    setOpenedCityIndex(index);
    setShowCityDialog(true);
  };

  const dismissCityDialogHandler = () => {
    setShowCityDialog(false);
  };

  const showAddCityDialogHandler = () => {
    setShowAddCityDialog(true);
  };

  const dismissAddCityDialogHandler = () => {
    setShowAddCityDialog(false);
  };

  const dimissLoading = () => {
    setLoading(false);
  };

  return {
    user,
    getWeather,
    fetchWeather,
    loading,
    error,
    cities,
    selectedCities,
    handleLogout,
    curCity,

    showCityDialog,
    showCityDialogHandler,
    dismissCityDialogHandler,

    showAddCityDialog,
    showAddCityDialogHandler,
    dismissAddCityDialogHandler,

    dimissLoading,
  };
};

export default useHomeScreen;
