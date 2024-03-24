import {StyleSheet, TouchableOpacity, View} from 'react-native';

import DEVICE from '@/constants/device';
import Text from '@/components/Text';
import Icon from '@/components/Icon';
import colors from '@/style/colors';
import type {TIconsNames} from '@/assets';

interface IProps {
  title: string;
  icon?: TIconsNames;
  onPress?: () => void;
  bgImage?: any;
}

const Header = (props: IProps): React.ReactElement<IProps> => {
  return (
    <View
      style={[
        styles.header_baground,
        DEVICE.isIOS && styles.header_background_ios,
      ]}>
      <View style={styles.header_container}>
        {props.icon && (
          <TouchableOpacity style={styles.header_icon} onPress={props.onPress}>
            <Icon name={props.icon} color="white" />
          </TouchableOpacity>
        )}
        <Text
          align="center"
          fontVariant="header"
          color="white"
          style={styles.header_text}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header_baground: {
    height: DEVICE.SCREEN_HEIGHT / 8,
    margin: 5,

    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: colors.red,
    justifyContent: 'center',
  },
  header_background_ios: {
    margin: 6,
    height: DEVICE.SCREEN_HEIGHT / 8 + 30,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  header_container: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: DEVICE.isIOS ? 30 : 0,
    marginLeft: 20,
  },
  header_text: {
    width: (DEVICE.SCREEN_WIDTH / 3) * 2,
  },

  header_icon: {
    backgroundColor: colors.primary,
    borderRadius: 22,
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
