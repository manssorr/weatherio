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
import InfoWithBtn from './components/InfoWithBtn';
import FabButton from './components/FabButton';
import {useState} from 'react';
import {Menu, Divider} from 'react-native-paper';

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

    selectedCities,
    showAddCityDialog,
    showAddCityDialogHandler,
    dismissAddCityDialogHandler,

    dimissLoading,
  } = useHomeScreen();
  const [isExtended, setIsExtended] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

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
          onBtnPress={handleShowSettings}
          text="Cities list is empty so far!"
          textColor="primaryLight"
        />
      );
    }

    return (
      <CitiesList
        cities={cities}
        onScroll={onScroll}
        onPressCity={showCityDialogHandler}
      />
    );
  };

  const handleShowSettings = () => {
    showAddCityDialogHandler();
  };

  const onScroll = ({nativeEvent}: {nativeEvent: any}) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  return (
    <View style={{flex: 1}}>
      <Loader visible={loading} />
      <Header title="App Weather" icon="chevron-left" onPress={handleLogout} />

      {/* Content */}
      <SafeAreaView style={{flex: 1}}>
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
              visible={menuVisible}
              anchorPosition="bottom"
              onDismiss={closeMenu}
              anchor={<IconButton icon="cog" size={24} onPress={openMenu} />}>
              <Menu.Item onPress={handleShowSettings} title="Edit cities" />
              {/* <Menu.Item onPress={() => {}} title="Item 2" />
              <Divider />
              <Menu.Item onPress={() => {}} title="Item 3" /> */}
            </Menu>
          </View>
        </View>
        {renderContent()}

        {/* Portals */}

        <FabButton
          isExtended={isExtended}
          style={{}}
          onPress={handleShowSettings}
        />
        <CityInfoPortal
          city={curCity}
          visible={showCityDialog}
          onDismiss={dismissCityDialogHandler}
        />
        <AddCityPortal
          cities={selectedCities}
          visible={showAddCityDialog}
          onDismiss={dismissAddCityDialogHandler}
        />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
