import {Text, FlatList} from 'react-native';
import styles from '../styles';
import CityCard from '@/components/CityCard';
import type {ICity} from '@/utils/commonTypes';

interface IProps {
  cities: ICity[];
  onPressCity: (index: number) => void;
}

const CitiesList = ({
  cities,
  onPressCity,
}: IProps): React.ReactElement<IProps> => {
  return (
    <FlatList
      data={cities}
      keyExtractor={(item: ICity, index: number) => index.toString()}
      renderItem={({item, index}: {item: ICity; index: number}) => (
        <CityCard
          cityName={item.cityName}
          temperatureInCelsius={item.temperatureInCelsius}
          date={new Date().toDateString()}
          onPress={() => {
            onPressCity(index);
          }}
          style={styles.cityCard}
        />
      )}
      ListEmptyComponent={() => <Text>No cities found!</Text>}
      ListFooterComponent={() =>
        cities.length > 0 && <Text>No more cities</Text>
      }
      contentContainerStyle={styles.listContentContainer}
    />
  );
};

export default CitiesList;
