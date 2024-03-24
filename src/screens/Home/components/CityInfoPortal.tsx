import {View} from 'react-native';
import Text from '@/components/Text';
import InfoItem from './InfoItem';
import {useEffect} from 'react';
import Dialog from '@/components/Dialog';
import type {ICity} from '@/utils/commonTypes';
import {DialogProps} from 'react-native-paper';

interface TProps extends Omit<DialogProps, 'children'> {
  city?: ICity;
}

const CityInfoPortal = ({visible, city, ...props}: TProps) => {
  const cityCurrData = city?.cityDate?.current;
  const infoData = [
    {
      label: '🌡️ Temperature:',
      value: `${cityCurrData?.temp_c}°C (${cityCurrData?.temp_f}°F)`,
    },
    {
      label: '🌬️ Wind:',
      value: `${cityCurrData?.wind_kph} kph (${cityCurrData?.wind_mph} mph), ${cityCurrData?.wind_dir}`,
    },
    {label: '💧 Humidity:', value: `${cityCurrData?.humidity}%`},
    {
      label: '🌟 Condition:',
      value: cityCurrData?.condition?.text,
    },
    {
      label: '🕶️ Visibility:',
      value: `${cityCurrData?.vis_km} km (${cityCurrData?.vis_miles} miles)`,
    },
    {
      label: '🌙 Is it day?:',
      value: cityCurrData?.is_day ? 'Yes' : 'No',
    },
    {
      label: '🌀 Pressure:',
      value: `${cityCurrData?.pressure_mb} mb (${cityCurrData?.pressure_in} in)`,
    },
  ];

  useEffect(() => {
    console.log('city name: ', city?.cityName);
  }, [city]);

  return (
    <Dialog visible={visible} title={`Weather in ${city?.cityName}`} {...props}>
      <View
        style={{
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Text fontVariant="sm" align="center">
          ({new Date().toDateString()})
        </Text>
        <Text fontVariant="sm" align="center">
          {city?.cityDate?.location?.region},{' '}
          {city?.cityDate?.location?.country}
        </Text>
      </View>
      {infoData.map(({label, value}, idx) => (
        <InfoItem key={idx} label={label} value={value} />
      ))}
    </Dialog>
  );
};

export default CityInfoPortal;
