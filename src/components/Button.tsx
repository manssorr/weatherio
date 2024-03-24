import colors from '@/style/colors';
import fontStyles from '@/style/fonts';
import {StyleSheet} from 'react-native';
import {Button as RNMButton, ButtonProps} from 'react-native-paper';

interface IProps extends Omit<ButtonProps, 'children'> {
  title: string;
  onPress: () => void;
  children?: React.ReactNode;
  style?: ButtonProps['style'];
}
const Button = ({
  title,
  style,
  onPress,
  ...props
}: IProps): React.JSX.Element => {
  return (
    <RNMButton
      style={[
        styles.button,
        (props.disabled || props.loading) && styles.disabledButton,
        style,
      ]}
      contentStyle={styles.buttonContent}
      labelStyle={[
        styles.buttonLabel,
        props.disabled && {color: colors.secondaryText},
      ]}
      mode="contained"
      onPress={onPress}
      disabled={props.disabled || props.loading}
      {...props}>
      {title}
    </RNMButton>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
  },
  buttonContent: {
    height: 60,
  },
  buttonLabel: {
    color: colors.white,
    fontSize: fontStyles.md.fontSize,
    fontFamily: fontStyles.md.fontFamily,
  },
  disabledButton: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.light,
  },
});
