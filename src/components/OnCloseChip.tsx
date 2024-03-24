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
        removeClippedSubviews
        android_ripple={{color: theme.colors.errorContainer}}
        style={[
          styles.ripple,
          {
            borderTopRightRadius: roundness,
            borderBottomRightRadius: roundness,

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
    // backgroundColor: 'red',
  },
  chip: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  ripple: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
  },
});
