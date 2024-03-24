import {StyleSheet} from 'react-native';
import {type DialogProps} from 'react-native-paper';
import Dialog from './Dialog';
import Text from './Text';
import colors from '@/style/colors';

interface IProps extends Omit<DialogProps, 'children' | 'visible'> {
  visible?: boolean;
}

const Loader = ({
  visible = true,
  ...props
}: IProps): React.ReactElement<IProps> => {
  return (
    <Dialog
      visible={visible}
      dismissable={!!(props.dismissable && !!props.onDismiss)}
      // title={<Text fontVariant="md" color="white">
      theme={{
        colors: {backdrop: 'transparent'},
        // colors: {elevation: {level4: colors.red}},
      }}
      style={{
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '15%',
        height: '10%',
        minWidth: 170,
        minHeight: 100,
        backgroundColor: colors.secondaryText,
      }}
      {...props}>
      {/* <View> */}
      <Text fontVariant="md" color="white">
        Loading...
      </Text>
      {/* </View> */}
    </Dialog>
  );
};

export default Loader;

const styles = StyleSheet.create({});
