import {View} from 'react-native';
import styles from '../styles';
import Text from '@/components/Text';

interface IProps {
  label: string;
  value: string;
}

const InfoItem = ({label, value}: IProps): React.ReactElement<IProps> => {
  return (
    <View style={styles.infoRow}>
      <Text fontVariant="md">{label}</Text>
      <Text fontVariant="sm">{value}</Text>
    </View>
  );
};

export default InfoItem;
