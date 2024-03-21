import {StyleSheet} from 'react-native';
import Text from './Text';

interface IProps extends React.ComponentProps<typeof Text> {
  message: string;
}

const ErrorMessage = (props: IProps): React.ReactElement<IProps> => {
  return (
    <Text color="red" fontVariant="sm" style={styles.text}>
      {props.message}
    </Text>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  text: {alignSelf: 'flex-start', marginTop: 4},
});
