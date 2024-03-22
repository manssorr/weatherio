import {ImageBackground, StyleSheet, View, type ViewStyle} from 'react-native';

import DEVICE from '@/constants/device';
import Text from '@/components/Text';
import fontStyles from '@/style/fonts';
import Icon from '@/components/Icon';
import colors from '@/style/colors';
import type {TIconsNames} from '@/assets';

interface IProps {
  title: string;
  icon?: TIconsNames;
  onPress?: () => void;
  bgImage?: any;
  wrapperStyle?: ViewStyle;
}

const Hero = ({
  title,
  icon,
  onPress,
  bgImage,
  wrapperStyle,
  ...props
}: IProps): React.ReactElement<IProps> => {
  return (
    <View
      style={[
        {
          height: DEVICE.SCREEN_HEIGHT / 4,
        },
        wrapperStyle,
      ]}>
      <ImageBackground
        source={bgImage}
        imageStyle={styles.hero_baground}
        resizeMode="cover"
      />
      <View style={styles.hero_container}>
        {icon && (
          <View style={styles.hero_icon}>
            <Icon name={icon} color="white" onPress={onPress} />
          </View>
        )}
        <Text fontVariant="xlg" color="white" style={styles.hero_text}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Hero;

const styles = StyleSheet.create({
  hero_baground: {
    height: DEVICE.SCREEN_HEIGHT / 4,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 3,
  },

  hero_container: {
    marginTop: 30,
    marginLeft: 20,
  },
  //@ts-ignore
  hero_text: {
    marginTop: 25,
    width: (DEVICE.SCREEN_WIDTH / 3) * 2,
  },

  hero_icon: {
    backgroundColor: colors.primaryLight,
    borderRadius: 22,
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
