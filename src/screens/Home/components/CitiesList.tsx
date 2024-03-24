import {Text, FlatList} from 'react-native';
import styles from '../styles';
import CityCard from '@/components/CityCard';
import type {ICity} from '@/utils/commonTypes';

interface IProps {
  cities: ICity[];
  onPressCity: (index: number) => void;
  onScroll?: (event: any) => void;
}

const CitiesList = ({
  cities,
  onPressCity,
  onScroll = () => {},
}: IProps): React.ReactElement<IProps> => {
  return (
    <FlatList
      data={cities}
      onScroll={onScroll}
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
      contentContainerStyle={styles.listContentContainer}
    />
  );
};

export default CitiesList;
