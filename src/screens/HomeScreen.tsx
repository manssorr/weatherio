import CityCard from '@/components/CityCard';
import Header from '@/components/Header';
import {setSignOut} from '@/redux/slices/authSlice';
import {useEffect, useState, type ReactNode} from 'react';
import {View, SafeAreaView, Alert, FlatList, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {getCelsius} from '@/utils/helper';
import Text from '@/components/Text';
import auth from '@react-native-firebase/auth';
import {Dialog, Modal, Portal} from 'react-native-paper';

interface IProps {}

interface ICity {
  [x: string]: any;
  cityDate: any;
  cityName: string;
  temperatureInCelsius: number;
}

const HomeScreen = (): React.ReactElement<IProps> => {
  const dispatch = useDispatch();
  const user = auth().currentUser;
  const [loading, setLoading] = useState<boolean>(false);
  const [cities, setCities] = useState<ICity[] | []>([]);

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [openedCityIndex, setOpenedCityIndex] = useState<number>(0);
  const [curCity, setCurCity] = useState<ICity | null>(null);
  console.log(`curCity`, curCity);

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
    // const citiesToFetch = ['Alexandria'];
    const citiesToFetch = ['Cairo', 'Mansoura', 'Alexandria'];

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

  return (
    <View style={{flex: 1}}>
      <Header title="App Weather" icon="chevron-left" onPress={handleLogout} />

      <SafeAreaView style={{flex: 1}}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={cities}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <CityCard
                cityName={item.cityName}
                temperatureInCelsius={item.temperatureInCelsius}
                date={new Date().toDateString()}
                onPress={() => {
                  setOpenedCityIndex(index);
                  setShowDialog(true);
                }}
                style={styles.cityCard}
              />
            )}
            ListHeaderComponent={() => (
              <View style={styles.header}>
                <Text>Welcome, </Text>
                <Text style={styles.userName}>
                  {user?.displayName || 'New user'}
                </Text>
              </View>
            )}
            ListEmptyComponent={() => <Text>No cities found!</Text>}
            ListFooterComponent={() =>
              cities.length > 0 && <Text>No more cities</Text>
            }
            contentContainerStyle={styles.listContentContainer}
          />
        )}
        <Portal>
          <Dialog
            visible={showDialog}
            onDismiss={() => setShowDialog(false)}
            style={{borderRadius: 20}}>
            <Dialog.Title
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                // width: '50%',
                justifyContent: 'center',
              }}>
              <View>
                <Text fontVariant="lg">Weather in {curCity?.cityName}</Text>
                <Text fontVariant="sm"> ({new Date().toDateString()})</Text>
                <Text fontVariant="sm">
                  {curCity?.cityDate?.location?.region},{' '}
                  {curCity?.cityDate?.location?.country}
                </Text>
              </View>
            </Dialog.Title>
            <Dialog.Content>
              {/** Temperature */}
              <View style={styles.infoRow}>
                <Text fontVariant="md">🌡️ Temperature:</Text>
                <Text fontVariant="sm">
                  {curCity?.cityDate?.current?.temp_c}°C (
                  {curCity?.cityDate?.current?.temp_f}°F)
                </Text>
              </View>

              {/** Wind */}
              <View style={styles.infoRow}>
                <Text fontVariant="md">🌬️ Wind:</Text>
                <Text fontVariant="sm">
                  {curCity?.cityDate?.current?.wind_kph} kph (
                  {curCity?.cityDate?.current?.wind_mph} mph),{' '}
                  {curCity?.cityDate?.current?.wind_dir}
                </Text>
              </View>

              {/** Humidity */}
              <View style={styles.infoRow}>
                <Text fontVariant="md">💧 Humidity:</Text>
                <Text fontVariant="sm">
                  {curCity?.cityDate?.current?.humidity}%
                </Text>
              </View>

              {/** Condition */}
              <View style={styles.infoRow}>
                <Text fontVariant="md">🌟 Condition:</Text>
                <Text fontVariant="sm">
                  {curCity?.cityDate?.current?.condition?.text}
                </Text>
              </View>

              {/** Visibility */}
              <View style={styles.infoRow}>
                <Text fontVariant="md">🕶️ Visibility:</Text>
                <Text fontVariant="sm">
                  {curCity?.cityDate?.current?.vis_km} km (
                  {curCity?.cityDate?.current?.vis_miles} miles)
                </Text>
              </View>

              {/** Day/Night */}
              <View style={styles.infoRow}>
                <Text fontVariant="md">🌙 Is it day?:</Text>
                <Text fontVariant="sm">
                  {curCity?.cityDate?.current?.is_day ? 'Yes' : 'No'}
                </Text>
              </View>

              {/** Pressure */}
              <View style={styles.infoRow}>
                <Text fontVariant="md">🌀 Pressure:</Text>
                <Text fontVariant="sm">
                  {curCity?.cityDate?.current?.pressure_mb} mb (
                  {curCity?.cityDate?.current?.pressure_in} in)
                </Text>
              </View>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {flex: 1},
  dialog: {backgroundColor: 'white', borderRadius: 20},
  safeArea: {flex: 1},
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  userName: {
    color: 'red',
  },
  listContentContainer: {
    marginHorizontal: 30,
    paddingBottom: 20,
  },
  cityCard: {
    marginBottom: 20,
  },

  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#6C6C6C', // Lighter color
  },
  infoValue: {
    // fontSize: 20, // Smaller font size
    marginLeft: 4, // Add some spacing between label and value
  },
});
