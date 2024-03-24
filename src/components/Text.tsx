import {StyleSheet, Text as RNText, View, type TextProps} from 'react-native';
import {
  TFontWeight,
  TFontSize,
  type TFontVariants,
  TColor,
} from '../style/types';
import fontStyles from '@/style/fonts';
import colors from '@/style/colors';

/**
 * Text component with custom styles
 * fontSize, color, fontWeight
 * @note custom styles
 *   - fontSize, color, fontWeight are optional
 *   - if they are not provided, the default values are used
 *   - if they are provided, they will override any other values
 *
 * @note styling priority
 *   - 1. Props: fontSize, color, fontWeight
 *   - 2. Style prop
 *   - 3. Default styles
 *
 */

interface IProps extends TextProps {
  fontVariant?: TFontVariants;
  fontSize?: TFontSize;
  fontWeight?: TFontWeight;
  style?: TextProps['style'];
  color?: TColor;
  children?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

const Text = (props: IProps): React.ReactElement<IProps> => {
  const {fontVariant = 'md'} = props;

  const customStyles = {
    color: colors.black,
    fontSize: fontStyles[fontVariant].fontSize,
    fontFamily: fontStyles[fontVariant].fontFamily,
    textAlign: 'left',
  };
  if (props.color) {
    customStyles.color = colors[props.color];
  }
  if (props.fontSize) {
    customStyles.fontSize = props.fontSize;
  }
  if (props.align) {
    customStyles.textAlign = props.align;
  }
  if (props.fontWeight) {
    if (props.fontWeight === 'bold') {
      customStyles.fontFamily = 'Poppins-Bold';
    }
    if (props.fontWeight === 'semiBold') {
      customStyles.fontFamily = 'Poppins-SemiBold';
    }
  }

  return (
    <View>
      <RNText
        {...props}
        style={[fontStyles[fontVariant], props.style, customStyles]}>
        {props.children}
      </RNText>
    </View>
  );
};

export default Text;
