import assets from '@/assets';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
  type ViewProps,
} from 'react-native';
import Icon from './Icon';
import Text from './Text';
import DEVICE from '@/constants/device';

interface IProps {
  cityName: string;
  temperatureInCelsius: number;
  date: string;
  coverImage?: any;
  style?: ViewProps['style'];
  onPress?: () => void;
}

const CityCard = (props: IProps): React.ReactElement<IProps> => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={[styles.container, props.style]}>
      {/* Upper */}
      <View
        style={{
          height: DEVICE.SCREEN_HEIGHT / 5,
        }}>
        {/* Cover */}
        <ImageBackground
          source={assets.images['city-cover']}
          imageStyle={styles.coverImage}
        />
        {/* Temperature */}
        <View style={styles.temperature_container}>
          {/* Temperature Icon */}
          <Icon name="clouds" color="yellow" style={{marginRight: 5}} />
          <Text fontVariant="sm" color="secondary">
            {props.temperatureInCelsius}'C
          </Text>
        </View>
      </View>

      {/* Lower */}
      <View
        style={{
          height: 20,
          marginTop: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* City */}
        <View style={styles.cityInfo}>
          {/* Location Icon */}
          <Icon
            name="location"
            color="secondary"
            size={15}
            style={{marginRight: 5}}
          />
          {/* City Name */}
          <Text fontVariant="sm" color="secondaryText">
            {props.cityName}
          </Text>
        </View>

        {/* Date */}
        <View style={styles.cityInfo}>
          {/* Calendar Icon */}
          <Icon name="calendar" noColor size={13} style={{marginRight: 5}} />
          {/* Formatted Date */}
          <Text fontVariant="xs" color="secondaryText">
            {props.date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CityCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    height: DEVICE.SCREEN_HEIGHT / 5,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  temperature_container: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    padding: 5,
  },
  cityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
