import {setSignOut} from '@/redux/slices/authSlice';
import {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getCelsius} from '@/utils/helper';
import auth from '@react-native-firebase/auth';
import type {ICity} from '@/utils/commonTypes';
import {addErroredLocation, selectCities} from '@/redux/slices/citySlice';

const useHomeScreen = () => {
  const dispatch = useDispatch();
  const selectedCities = useSelector(selectCities);
  const user = auth().currentUser;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [cities, setCities] = useState<ICity[] | []>([]);
  const [openedCityIndex, setOpenedCityIndex] = useState<number>(0);
  const [curCity, setCurCity] = useState<ICity | undefined>(undefined);
  // city info
  const [showCityInfoPortal, setShowCityInfoPortal] = useState<boolean>(false);

  // Settings menu
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  // Fab Icon
  const [isFabExtended, setIsFabExtended] = useState(true);

  // Add city
  const [showAddCityPortal, setShowAddCityPortal] = useState<boolean>(false);

  // Manage city
  const [showManageCityPortal, setShowManageCityPortal] =
    useState<boolean>(false);

  const onScroll = ({nativeEvent}: {nativeEvent: any}) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsFabExtended(currentScrollPosition <= 0);
  };

  const getWeather = async (cityName: string) => {
    try {
      const api = 'd270e786016642129ab190318242103'; //TODO: move to env variables
      const url = `https://api.weatherapi.com/v1/current.json?key=${api}&q=${cityName}&aqi=no`;

      const response = await fetch(url);
      const result = await response.json();
      if (!response.ok) {
        // console.error('Error in getWeather: ', cityName, result.error.message);
        dispatch(addErroredLocation(cityName));

        return;
      }

      return {
        cityDate: result,
        cityName: result?.location?.name,
        temperatureInCelsius: getCelsius(result?.current?.temp_f, 'fahrenheit'),
      };
    } catch (err: any) {
      // setError(err.message as string);
      console.error('Error in getWeather: ', err.message);
    }
  };
  const fetchWeather = async () => {
    setLoading(true);
    setError('');

    try {
      if (selectedCities.length === 0) {
        setCities([]);
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
      setError(err as string);
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

  const dimissLoading = () => {
    setLoading(false);
  };
  useEffect(() => {
    const isClosing = !showAddCityPortal && !showManageCityPortal;
    isClosing && fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddCityPortal, showManageCityPortal]);

  useEffect(() => {
    setCurCity(cities[openedCityIndex]);
  }, [cities, openedCityIndex]);

  // handler => [action]target[state] e.g. openManageCityOnPress

  // City info
  const openCityInfoPortal = (index: number) => {
    setOpenedCityIndex(index);
    setShowCityInfoPortal(true);
  };
  const dismissCityInfoPortal = () => {
    setShowCityInfoPortal(false);
  };

  // Settings menu
  const openSettingsMenu = () => setShowSettingsMenu(true);
  const closeSettingsMenu = () => setShowSettingsMenu(false);
  const openMenuItem = (action: 'addCity' | 'manageCity') => {
    if (action === 'addCity') {
      openAddCityPortal();
    } else if (action === 'manageCity') {
      openManageCityPortal();
    }
    closeSettingsMenu();
  };

  // Add city/Fab button
  const openAddCityPortal = () => {
    closeSettingsMenu();
    setShowAddCityPortal(true);
  };
  const dismissAddCityPortal = () => {
    setShowAddCityPortal(false);
  };
  // Manage city
  const openManageCityPortal = () => {
    closeSettingsMenu();
    setShowManageCityPortal(true);
  };
  const dismissManageCityPortal = () => {
    setShowManageCityPortal(false);
  };

  return {
    // states
    loading,
    error,
    dimissLoading,

    // states
    user,
    cities,
    selectedCities,
    curCity,

    // internal
    onScroll,
    handleLogout,
    getWeather,
    fetchWeather,

    // Portals
    isFabExtended,
    openSettingsMenu,
    closeSettingsMenu,
    showSettingsMenu,
    openMenuItem,

    showCityInfoPortal,
    openCityInfoPortal,
    dismissCityInfoPortal,

    showAddCityPortal,
    openAddCityPortal,
    dismissAddCityPortal,

    showManageCityPortal,
    openManageCityPortal,
    dismissManageCityPortal,
  };
};

export default useHomeScreen;
