import CityCard from '@/components/CityCard';
import Header from '@/components/Header';
import {View, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import Text from '@/components/Text';
import {Dialog, Portal} from 'react-native-paper';
import type {IProps} from './types';
import useHomeScreen from './useHomeScreen';

const HomeScreen = (): React.ReactElement<IProps> => {
  const {
    user,
    cities,
    handleLogout,
    loading,
    setOpenedCityIndex,
    showDialog,
    setShowDialog,
    curCity,
  } = useHomeScreen();

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
            <Dialog.Title>
              Weather in {curCity?.cityName}
              {/* <Text fontVariant="lg">Weather in {curCity?.cityName}</Text> */}
            </Dialog.Title>
            <Dialog.Content>
              <View
                style={{
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <Text fontVariant="sm" align="center">
                  ({new Date().toDateString()})
                </Text>
                <Text fontVariant="sm" align="center">
                  {curCity?.cityDate?.location?.region},{' '}
                  {curCity?.cityDate?.location?.country}
                </Text>
              </View>
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
