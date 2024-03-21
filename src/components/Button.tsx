import {StyleSheet, Text, View} from 'react-native';
import {Button as RNMButton} from 'react-native-paper';

interface IProps {
  title: string;
  onPress: () => void;
}
const Button = ({title, onPress}: IProps): React.JSX.Element => {
  return <RNMButton title={title} onPress={onPress} />;
};

export default Button;

const styles = StyleSheet.create({});
