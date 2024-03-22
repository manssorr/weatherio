import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  TextInput as RNPTextInput,
  TextInputProps as RNPTextInputProps,
} from 'react-native-paper';
import Icon from './Icon';
import ErrorMessage from './ErrorMessage';
import colors from '@/style/colors';
import {TIconsNames} from '../assets/index';
import {TColor} from '../style/types';
interface TextInputProps extends Omit<RNPTextInputProps, 'style'> {
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
  inputStyle?: RNPTextInputProps['style']; // Specify that inputStyle is specifically for the TextInput
}

/**
 * A customizable TextInput component that integrates with the React Native Paper library
 * and provides additional functionality like displaying an error message and toggling password visibility.
 */
const TextInput: React.FC<TextInputProps> = ({
  leftIconOptions,
  errorMessage,
  touched,
  isPassword = false,
  inputStyle,
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={inputStyle}>
      <RNPTextInput
        mode="outlined"
        outlineStyle={{borderWidth: 1}}
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
        placeholderTextColor={colors.secondaryLightText}
        left={
          leftIconOptions && (
            <RNPTextInput.Icon
              icon={() => (
                <Icon
                  name={leftIconOptions.name}
                  color={leftIconOptions.color}
                  size={leftIconOptions.size}
                />
              )}
            />
          )
        }
        right={
          isPassword && (
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
        secureTextEntry={isPassword && passwordVisible}
        error={touched && !!errorMessage}
        {...props} // Spread the remaining props to allow customizing the underlying RNPTextInput further
      />
      {touched && errorMessage && <ErrorMessage message={errorMessage} />}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({});
