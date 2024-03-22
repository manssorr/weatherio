import CityCard from '@/components/CityCard';
import Header from '@/components/Header';
import {setSignOut} from '@/redux/slices/authSlice';
import {useEffect, useState} from 'react';
import {View, SafeAreaView, Alert, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import {getCelsius} from '@/utils/helper';
import Text from '@/components/Text';
import auth from '@react-native-firebase/auth';

interface IProps {}

interface ICity {
  cityName: string;
  temperatureInCelsius: number;
}

const HomeScreen = (): React.ReactElement<IProps> => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [cities, setCities] = useState<ICity[] | []>([]);

  const getWeather = async (cityName: string) => {
    const api = 'd270e786016642129ab190318242103';
    const options = {
      method: 'GET',
      url: `http://api.weatherapi.com/v1/current.json?key=${api}&q=${cityName}&aqi=no`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(options.url, options);
      const result = await response.json();

      if (response.ok) {
        let city: ICity = {
          cityName: result.location.name,
          temperatureInCelsius: getCelsius(
            result?.current?.temp_f,
            'fahrenheit',
          ),
        };

        return city;
      }

      console.log('Result.message', result.message);
    } catch (error) {
      console.error('Error in getWeather: ', error);
    }
  };

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await Promise.all([
        getWeather('cairo'),
        getWeather('mansoura'),
        getWeather('alexandria'),
      ]);
      console.log('Response', response);
      // filter undefined
      setCities(
        response.filter(city => city !== undefined).map(city => city as ICity),
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

  return (
    <View style={{flex: 1}}>
      <Header title="App Weather" icon="chevron-left" onPress={handleLogout} />
      <SafeAreaView style={{flex: 1}}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={cities}
            renderItem={({item, index}) => (
              <CityCard
                key={index}
                cityName={item?.cityName}
                temperatureInCelsius={item.temperatureInCelsius}
                date={new Date().toDateString()}
                style={{marginBottom: 20}}
              />
            )}
            ListEmptyComponent={() => <Text>Empty</Text>}
            contentContainerStyle={{marginHorizontal: 30, marginTop: 20}}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

// const styles = StyleSheet.create({});
