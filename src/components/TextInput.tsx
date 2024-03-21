import {StyleSheet, Text, View} from 'react-native';
import ErrorMessage from './ErrorMessage';
import {TIconsNames} from '../assets/index';
import {TColor} from '../style/types';
import colors from '@/style/colors';
import {TextInput as RNPTextInput, TextInputProps} from 'react-native-paper';
import Icon from './Icon';
import {useState} from 'react';

interface IProps extends TextInputProps {
  leftIconOptions?: {
    name: TIconsNames;
    color: TColor;
    size?: number;
  };
  errorMessage: string;
  onChangeText: (text: string) => void;
  touched: boolean;
  label: string;
  placeholder: string;

  isPassword?: boolean;
}

const TextInput = (props: IProps): React.ReactElement<IProps> => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View>
      <RNPTextInput
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
        placeholderTextColor={colors.secondaryLightText}
        outlineStyle={{borderWidth: 1}}
        mode="outlined"
        left={
          props.leftIconOptions?.name && (
            <RNPTextInput.Icon
              icon={() => (
                <Icon
                  name={props.leftIconOptions?.name as TIconsNames}
                  color={props.leftIconOptions?.color}
                />
              )}
            />
          )
        }
        right={
          props.isPassword && (
            <RNPTextInput.Icon
              icon={() => (
                <Icon
                  name={passwordVisible ? 'eye' : 'eye-off'}
                  color="black"
                />
              )}
              onPress={togglePasswordVisibility}
            />
          )
        }
        error={props.touched && !!props.errorMessage}
        secureTextEntry={props.isPassword && passwordVisible}
        {...props}
      />
      {props.touched && <ErrorMessage message={props.errorMessage} />}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({});
