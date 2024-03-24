import {StyleSheet, View} from 'react-native';
import OnCloseChip from '@/components/OnCloseChip';
import {
  Button,
  TextInput,
  useTheme,
  Text,
  HelperText,
} from 'react-native-paper';
import Dialog from '@/components/Dialog';
import useAddCityPortal from './useSettingPortal';

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
  const theme = useTheme();
  const {text, error, handleChangeText, handleAddCity, handleDeleteCity} =
    useAddCityPortal({cities});

  return (
    <Dialog visible={visible} {...props} title="Settings" style={styles.dialog}>
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
      <TextInput
        mode="outlined"
        label="Add City"
        theme={{roundness: 5}}
        style={{
          backgroundColor: theme.colors.surfaceVariant,
        }}
        textColor="black"
        placeholder="What's the name of the city?"
        placeholderTextColor={theme.colors.onSurfaceVariant}
        value={text}
        onChangeText={handleChangeText}
        autoFocus
        dataDetectorTypes="address"
        error={!!error}
      />

      <HelperText padding="normal" type="error" visible={!!error}>
        {error}
      </HelperText>

      <Button
        mode="contained-tonal"
        style={[styles.button]}
        theme={{roundness: 2}}
        onPress={handleAddCity}>
        Pin City
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
  },
  button: {
    marginTop: 10,
  },
});

export default AddCityPortal;
