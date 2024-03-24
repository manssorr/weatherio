import {StyleSheet} from 'react-native';
import {
  Portal,
  Dialog as RNPDialog,
  DialogProps,
  DialogTitleProps,
} from 'react-native-paper';

interface IProps extends DialogProps {
  title?: string | React.ReactElement<DialogTitleProps>;
}

const Dialog = ({
  visible,
  onDismiss,
  title,
  children,
  ...props
}: IProps): React.ReactElement<IProps> => {
  return (
    <Portal>
      <RNPDialog
        {...props}
        visible={visible}
        onDismiss={onDismiss}
        style={[styles.container, props.style]}>
        {title && <RNPDialog.Title>{title}</RNPDialog.Title>}
        <RNPDialog.Content>{children}</RNPDialog.Content>
      </RNPDialog>
    </Portal>
  );
};

export default Dialog;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    maxHeight: '80%',
    maxWidth: '80%',
    alignSelf: 'center',
    borderRadius: 10,
  },
});
