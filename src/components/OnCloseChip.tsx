import colors from '@/style/colors';
import {StyleSheet, View, type ViewStyle} from 'react-native';
import {
  Chip as RNPChip,
  type ChipProps,
  useTheme,
  TouchableRipple,
  Icon,
} from 'react-native-paper';

interface IProps extends Omit<ChipProps, 'children'> {
  label: string;
  onClose: () => void;
  style?: ChipProps['style'];
  onPress?: () => void;
  roundness?: number;
  wrapperStyle?: ViewStyle;
  iconStyle?: ViewStyle;
}

const OnCloseChip = ({
  label,
  onClose,
  roundness = 10,
  style,
  ...props
}: IProps) => {
  const theme = useTheme();

  return (
    <View style={styles.chipContainer}>
      <RNPChip
        theme={{roundness: 5}}
        {...props}
        style={[
          styles.chip,
          {
            borderTopLeftRadius: roundness,
            borderBottomLeftRadius: roundness,
            backgroundColor: theme.colors.primaryContainer,
          },
          style,
        ]}>
        {label}
      </RNPChip>
      <TouchableRipple
        onPress={onClose}
        rippleColor={theme.colors.error}
        android_ripple={{color: theme.colors.errorContainer}}
        style={[
          styles.ripple,
          {
            backgroundColor: theme.colors.primaryContainer,
          },
        ]}>
        <Icon source="close" size={20} color={theme.colors.primary} />
      </TouchableRipple>
    </View>
  );
};

export default OnCloseChip;

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'red',
  },
  chip: {
    // borderWidth: 1,
    width: '90%',
    // borderColor: 'red',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  ripple: {
    // minHeight: '10%',
    // width: 20,
    width: '10%',
    borderLeftWidth: 0.2,
    borderColor: colors.secondaryText,
    paddingLeft: 2,
    // borderColor: 'red',
    alignItems: 'flex-start',
    justifyContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    // minWidth: 40,
  },
});
