import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import OnCloseChip from '@/components/OnCloseChip';
import Dialog from '@/components/Dialog';
import useAddCityPortal from './useManageCityPortal';
import Text from '@/components/Text';
import fontStyles from '@/style/fonts';

interface IProps {
  cities?: string[];
  visible: boolean;
  onDismiss: () => void;
}

const AddCityPortal = ({
  cities = [],
  visible,
  ...props
}: IProps): React.ReactElement<IProps> => {
  const {goAddCity: reset, handleDeleteCity} = useAddCityPortal();
  return (
    <Dialog
      visible={visible}
      {...props}
      title="Manage Cities"
      style={styles.dialog}>
      <View style={styles.chipsContainer}>
        {cities.length > 0 ? (
          cities.map((city, index) => (
            <OnCloseChip
              key={index}
              label={city}
              onClose={() => handleDeleteCity(city)}
            />
          ))
        ) : (
          <Text>No cities Added! Add one 📌</Text>
        )}
      </View>

      <Button
        mode="contained"
        labelStyle={styles.button}
        contentStyle={{padding: 5}}
        theme={{roundness: 2}}
        onPress={reset}>
        Reset cities
      </Button>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  chipsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: 10,
    marginBottom: 20,
  },

  dialog: {
    minWidth: '80%',
    maxHeight: '100%',
  },
  button: {
    fontFamily: fontStyles.md.fontFamily,
    fontSize: fontStyles.md.fontSize,
  },
});

export default AddCityPortal;
