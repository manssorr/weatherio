import {Menu} from 'react-native-paper';
import {View, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import {IconButton} from 'react-native-paper';

import Header from '@/components/Header';
import Text from '@/components/Text';
import Loader from '@/components/Loader';

import useHomeScreen from './useHomeScreen';
import type {IProps} from './types';
import styles from './styles';

import CityInfoPortal from './components/CityInfoPortal';
import CitiesList from './components/CitiesList';
import AddCityPortal from './components/AddCityPortal';
import InfoWithBtn from './components/InfoWithBtn';
import FabButton from './components/FabButton';
import ManageCityPortal from './components/ManageCityPortal';

const HomeScreen = ({}: IProps): React.ReactElement<IProps> => {
  const {
    loading,
    error,
    dimissLoading,

    user,
    cities,
    curCity,
    onScroll,

    handleLogout,
    fetchWeather,
    selectedCities,

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
  } = useHomeScreen();

  const renderContent = () => {
    if (error) {
      return (
        <InfoWithBtn
          btnText="Try again"
          onBtnPress={fetchWeather}
          text={error}
          textColor="red"
        />
      );
    } else if (loading) {
      return <Loader visible={loading} onDismiss={dimissLoading} dismissable />;
    } else if (cities.length === 0) {
      return (
        <InfoWithBtn
          btnText="Add one!"
          onBtnPress={openAddCityPortal}
          text="Cities list is empty so far!"
          textColor="primaryLight"
        />
      );
    }

    return (
      <CitiesList
        cities={cities}
        onScroll={onScroll}
        onPressCity={openCityInfoPortal}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <Loader visible={loading} />
      <Header title="App Weather" icon="chevron-left" onPress={handleLogout} />

      {/* Content */}
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior="height">
          <View style={styles.header}>
            <View style={styles.userContainer}>
              <Text>Welcome, </Text>
              <Text style={styles.userName}>
                {user?.displayName || 'New user'}
              </Text>
            </View>
            <View style={styles.settingsContainer}>
              <Menu
                elevation={1}
                contentStyle={{borderRadius: 10}}
                visible={showSettingsMenu}
                anchorPosition="bottom"
                onDismiss={closeSettingsMenu}
                anchor={
                  <IconButton icon="cog" size={24} onPress={openSettingsMenu} />
                }>
                <Menu.Item
                  onPress={() => openMenuItem('manageCity')}
                  title="Manage cities"
                />
                <Menu.Item
                  onPress={() => openMenuItem('addCity')}
                  title="Add City"
                />
                {/* <Divider />
              <Menu.Item onPress={() => {}} title="Item 3" /> */}
              </Menu>
            </View>
          </View>
          {renderContent()}

          {/* Portals */}

          <FabButton
            isExtended={isFabExtended}
            style={{}}
            onPress={openAddCityPortal}
          />
          <CityInfoPortal
            city={curCity}
            visible={showCityInfoPortal}
            onDismiss={dismissCityInfoPortal}
          />
          <AddCityPortal
            cities={selectedCities}
            visible={showAddCityPortal}
            onDismiss={dismissAddCityPortal}
          />
          <ManageCityPortal
            cities={selectedCities}
            visible={showManageCityPortal}
            onDismiss={dismissManageCityPortal}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
