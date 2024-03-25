import {StyleSheet, ScrollView, View} from 'react-native';
import {Button, Icon, Searchbar, TouchableRipple} from 'react-native-paper';
import Dialog from '@/components/Dialog';
import useAddCityPortal from './useAddCityPortal';
import colors from '@/style/colors';
import {useTheme} from 'react-native-paper';
import Text from '@/components/Text';
import type {ILocation} from '@/utils/commonTypes';
import {useKeyboard} from '@react-native-community/hooks';
import {limitString} from '@/utils/helper';
import useManageCityPortal from '../ManageCityPortal/useManageCityPortal';

interface IProps {
  cities?: string[];
  visible: boolean;
  onDismiss: () => void;
}

const AddCityPortal = ({
  cities = [],
  visible,
  ...props
}: IProps): React.ReactElement<IProps> => {
  const theme = useTheme();
  const keyboard = useKeyboard();
  const {
    searchQuery,
    setSearchQuery,
    cities: addedCities,
    loading,
    error,
    handleChangeText,
    handleAddCity,
    handleSearch,
    searchResults,
    setSearchResults,
  } = useAddCityPortal({cities});
  const {handleDeleteCity} = useManageCityPortal();

  return (
    <Dialog
      visible={visible}
      {...props}
      title="Add City"
      style={[
        styles.dialog,
        {
          height: keyboard.keyboardShown ? '100%' : '60%',
        },
      ]}>
      <Searchbar
        placeholder="Search"
        onChangeText={handleChangeText}
        value={searchQuery}
        theme={{
          colors: {
            elevation: {
              level3: theme.colors.primaryContainer,
            },
            // onSurfaceVariant: 'white', // icons
            // onSurface: 'white', // placeholder
          },
        }}
        style={styles.searchBar}
      />
      {error && <Text>{error}</Text>}
      {loading && <Text>Loading...</Text>}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={[
          styles.resultsContainer,
          {
            height: keyboard.keyboardShown ? '70%' : '65%',
          },
        ]}>
        {searchResults.length > 0 ? (
          searchResults.map((location, index) => {
            const locationStr = `${location.name}, ${location.country}, ${location.region}`;
            return (
              <CityResultsComponent
                key={index}
                added={addedCities.includes(locationStr)}
                location={location}
                onPressAdd={() => handleAddCity(locationStr)}
                onPressDelete={() => handleDeleteCity(locationStr)}
              />
            );
          })
        ) : (
          <Text fontVariant="sm">No results</Text>
        )}
      </ScrollView>
    </Dialog>
  );
};

const CityResultsComponent = ({
  location,
  onPressAdd,
  onPressDelete,
  added,
}: {
  location: ILocation;
  onPressAdd: (location: ILocation) => void;
  onPressDelete: (location: string) => void;
  added: boolean;
}) => {
  const theme = useTheme();
  const pressFunc = added ? onPressDelete : onPressAdd;
  return (
    <View
      style={[
        styles.cityContainer,
        {backgroundColor: theme.colors.primaryContainer},
      ]}>
      <View style={styles.cityInfo}>
        <Text fontVariant="md" color="black" style={{fontWeight: 'bold'}}>
          {limitString(location?.name, 15)}
        </Text>
        <Text fontVariant="sm" color="secondaryText">
          {limitString(location?.country, 20)},{' '}
          {limitString(location?.region, 15)}
        </Text>
      </View>

      <TouchableRipple
        //@ts-ignore
        onPress={pressFunc}
        rippleColor={theme.colors.primary}
        removeClippedSubviews
        style={[
          styles.addBtn,
          {
            backgroundColor: added ? colors.red : theme.colors.primaryContainer,
            borderLeftWidth: 0.2,
            borderColor: colors.secondaryText,
          },
        ]}>
        <Icon source="plus" size={20} color={theme.colors.primary} />
      </TouchableRipple>
    </View>
  );
};
const styles = StyleSheet.create({
  resultsContainer: {
    width: '100%',
    // borderWidth: 1,
  },
  dialog: {
    position: 'absolute',
    minWidth: '80%',
    overflow: 'hidden',
    // height: Keyboard.isVisible() ? '100%' : '60%',
  },
  searchBar: {
    marginBottom: 20,
  },
  cityContainer: {
    width: '100%',
    minHeight: 70,
    maxHeight: '25%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // margin: 10,
    // paddingLeft: 20,
    borderRadius: 50,
    overflow: 'hidden',
    marginVertical: 5,

    height: 170,
    // borderWidth: 2,
  },
  cityInfo: {
    alignContent: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingLeft: 20,
    paddingRight: 5,
  },

  addBtn: {
    height: '150%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
  addContainer: {},
  add: {},
});

export default AddCityPortal;
