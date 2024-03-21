import {
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  type ImageStyle,
} from 'react-native';
import assets, {TIconsNames} from '@/assets';
import type {TColor} from '@/style/types';
import colors from '@/style/colors';

interface IProps {
  style?: TouchableOpacityProps['style'];
  name: TIconsNames;
  size?: number;
  color?: TColor;
  onPress?: () => void;
  noColor?: boolean;
  iconStyle?: ImageStyle;
}

const Icon = (props: IProps): React.ReactElement<IProps> => {
  const size = props.size || 24;
  const color = props.color ? colors[props.color] : colors.white;

  const Wrapper = props.onPress ? TouchableOpacity : View;
  return (
    // @ts-ignore
    <Wrapper onPress={props.onPress} style={props.style} activeOpacity={0.2}>
      <View>
        <Image
          source={assets.icons[props.name]}
          style={[
            {width: size, height: size},
            props.noColor ? {} : {tintColor: color},
            props.iconStyle,
          ]}
        />
      </View>
    </Wrapper>
  );
};

export default Icon;

// const styles = StyleSheet.create({});
