import CityCard from '@/components/CityCard';
import Header from '@/components/Header';
import {View, SafeAreaView, FlatList} from 'react-native';
import Text from '@/components/Text';
import type {IProps} from './types';
import useHomeScreen from './useHomeScreen';
import styles from './styles';
import CityInfoPortal from './components/CityInfoPortal';
import CitiesList from './components/CitiesList';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import {IconButton} from 'react-native-paper';
import AddCityPortal from './components/SettingPortal';

const HomeScreen = ({}: IProps): React.ReactElement<IProps> => {
  const {
    user,
    cities,
    handleLogout,
    loading,
    error,
    fetchWeather,
    curCity,
    showCityDialog,
    showCityDialogHandler,
    dismissCityDialogHandler,

    showAddCityDialog,
    showAddCityDialogHandler,
    dismissAddCityDialogHandler,
  } = useHomeScreen();

  const renderContent = () => {
    if (error) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text color="red">{error}</Text>

          <Button loading={loading} title="Try again" onPress={fetchWeather} />
        </View>
      );
    } else if (loading) {
      return <Loader visible={loading} />;
    } else if (cities.length === 0) {
      return <Text>No cities found!</Text>;
    }

    return <CitiesList cities={cities} onPressCity={showCityDialogHandler} />;
  };

  const handleShowSettings = () => {
    showAddCityDialogHandler;
  };

  return (
    <View style={{flex: 1}}>
      <Loader visible={loading} />
      <Header title="App Weather" icon="chevron-left" onPress={handleLogout} />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.header}>
          <View style={styles.userContainer}>
            <Text>Welcome, </Text>
            <Text style={styles.userName}>
              {user?.displayName || 'New user'}
            </Text>
          </View>

          <IconButton icon="cog" size={24} onPress={handleShowSettings} />
        </View>
        {renderContent()}
        <CityInfoPortal
          city={curCity}
          visible={showCityDialog}
          onDismiss={dismissCityDialogHandler}
        />
        <AddCityPortal
          cities={cities}
          visible={showAddCityDialog}
          onDismiss={dismissAddCityDialogHandler}
        />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
