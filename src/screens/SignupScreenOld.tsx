import assets from '@/assets';
import Hero from '@/components/Hero';
import Icon from '@/components/Icon';
import DEVICE from '@/constants/device';
import {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import Checkbox from '@react-native-community/checkbox';

import {Button, Divider, TextInput} from 'react-native-paper';
import Text from '@/components/Text';
import colors from '@/style/colors';
import fontStyles from '@/style/fonts';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setSignIn} from '@/redux/slices/authSlice';

const SignupScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState<{
    main: boolean;
    confirm: boolean;
  }>({
    main: false,
    confirm: false,
  });

  const [userData, setUserData] = useState<{
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }>({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const togglePasswordVisibility = (type: 'main' | 'confirm') => {
    setPasswordVisible({...passwordVisible, [type]: !passwordVisible[type]});
  };

  const handleSignup = () => {
    const user = {
      isLoggedIn: true,
      email: userData.email,
      userName: 'User Name',
    };

    dispatch(setSignIn(user));
  };

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const validateForm = () => {
    let errorsStore: any = {};

    // Validate email field
    if (!userData.userName) {
      errorsStore.userName = 'User Name is required.';
    }

    // Validate email field
    if (!userData.email) {
      errorsStore.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errorsStore.email = 'Email is invalid.';
    }

    // Validate password field
    if (!userData.password) {
      errorsStore.password = 'Password is required.';
    } else if (userData.password.length < 6) {
      errorsStore.password = 'Password must be at least 6 characters.';
    }

    // Validate confirm password field
    if (!userData.confirmPassword) {
      errorsStore.confirmPassword = 'Confirm Password is required.';
    } else if (userData.confirmPassword !== userData.password) {
      errorsStore.confirmPassword = 'Passwords do not match.';
    }

    // Validate accept terms field
    if (!userData.acceptTerms) {
      errorsStore.acceptTerms = 'Accept Terms is required.';
    }

    // Set the errors and update form validity
    setErrors(errorsStore);
    setIsFormValid(Object.keys(errorsStore).length === 0);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);

    if (isFormValid) {
      // Form is valid, perform the submission logic
      handleSignup();
      console.log('Form submitted successfully!');
    } else {
      // Form is invalid, display error messages
      console.log('Form has errors. Please correct them.');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={DEVICE.Platform === 'android' ? 'position' : 'padding'}>
          <Hero
            title="Sign up to your account"
            icon="chevron-left"
            onPress={() => {
              navigation.goBack();
            }}
            bgImage={assets.images.hero}
          />
          <ScrollView style={styles.formContainer}>
            {/* userName Input */}
            <TextInput
              onChangeText={text => setUserData({...userData, userName: text})}
              error={isSubmitted && !!errors.userName}
              value={userData.userName}
              outlineColor={colors.border}
              placeholder="Enter your name"
              activeOutlineColor={colors.primary}
              placeholderTextColor={colors.secondaryLightText}
              outlineStyle={{borderWidth: 1}}
              mode="outlined"
              label="User name"
              style={{marginTop: 20, justifyContent: 'center'}}
            />
            {isSubmitted && !!errors.userName && (
              <Text
                color="red"
                fontVariant="sm"
                style={{alignSelf: 'flex-start', marginTop: 4}}>
                {errors.userName}
              </Text>
            )}

            {/* Email Input */}
            <TextInput
              onChangeText={text => setUserData({...userData, email: text})}
              error={isSubmitted && !!errors.email}
              value={userData.email}
              outlineColor={colors.border}
              placeholder="Enter your email"
              keyboardType="email-address"
              activeOutlineColor={colors.primary}
              placeholderTextColor={colors.secondaryLightText}
              outlineStyle={{borderWidth: 1}}
              mode="outlined"
              label="Email"
              style={{marginTop: 10, justifyContent: 'center'}}
            />
            {isSubmitted && !!errors.email && (
              <Text
                color="red"
                fontVariant="sm"
                style={{alignSelf: 'flex-start', marginTop: 4}}>
                {errors.email}
              </Text>
            )}

            {/* Password Input */}
            <TextInput
              onChangeText={text => setUserData({...userData, password: text})}
              error={isSubmitted && !!errors.password}
              value={userData.password}
              mode="outlined"
              outlineColor={colors.border}
              placeholderTextColor={colors.secondaryLightText}
              label="Password"
              secureTextEntry={!passwordVisible.main}
              placeholder="Enter your password"
              style={{marginTop: 10}}
              right={
                <TextInput.Icon
                  icon={() => (
                    <Icon
                      onPress={() => togglePasswordVisibility('main')}
                      name={passwordVisible.main ? 'eye' : 'eye-off'}
                      color="black"
                    />
                  )}
                />
              }
            />
            {isSubmitted && !!errors.password && (
              <Text
                color="red"
                fontVariant="sm"
                style={{alignSelf: 'flex-start', marginTop: 4}}>
                {errors.password}
              </Text>
            )}

            {/* Confirm Password Input */}
            <TextInput
              onChangeText={text =>
                setUserData({...userData, confirmPassword: text})
              }
              error={isSubmitted && !!errors.confirmPassword}
              value={userData.confirmPassword}
              mode="outlined"
              outlineColor={colors.border}
              placeholderTextColor={colors.secondaryLightText}
              label="Confirm Password"
              secureTextEntry={!passwordVisible.confirm}
              placeholder="Enter your password"
              style={{marginTop: 10}}
              right={
                <TextInput.Icon
                  icon={() => (
                    <Icon
                      onPress={() => togglePasswordVisibility('confirm')}
                      name={passwordVisible.confirm ? 'eye' : 'eye-off'}
                      color="black"
                    />
                  )}
                />
              }
            />
            {isSubmitted && !!errors.confirmPassword && (
              <Text
                color="red"
                fontVariant="sm"
                style={{alignSelf: 'flex-start', marginTop: 4}}>
                {errors.confirmPassword}
              </Text>
            )}

            {/* Checkbox */}
            <Pressable
              onPress={() =>
                setUserData(prev => ({...prev, acceptTerms: !prev.acceptTerms}))
              }
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <Checkbox
                disabled={false}
                style={{marginTop: 6}}
                tintColors={{
                  true: colors.primary,
                  false:
                    isSubmitted && !!errors.acceptTerms
                      ? colors.red
                      : colors.border,
                }} // Android
                tintColor={
                  isSubmitted && !!errors.acceptTerms
                    ? colors.red
                    : colors.border
                } // iOS off
                onCheckColor={colors.primary} // iOS on
                boxType="square" // iOS
                value={userData.acceptTerms}
                onValueChange={newValue =>
                  setUserData({...userData, acceptTerms: newValue})
                }
              />

              <Text
                fontVariant="sm"
                style={{
                  marginTop: 10,
                  // width: '75%',
                  alignSelf: 'flex-start',
                }}>
                I accept & agree terms conditions {'\n'}& privacy policy
              </Text>
            </Pressable>
            {isSubmitted && !!errors.acceptTerms && (
              <Text
                color="red"
                fontVariant="sm"
                style={{alignSelf: 'flex-start', marginTop: 4}}>
                {errors.acceptTerms}
              </Text>
            )}

            {/* Login Button */}
            <Button
              style={{borderRadius: 8, marginTop: 20, marginBottom: 20}}
              contentStyle={{height: 60}}
              mode="contained"
              labelStyle={{
                color: colors.white,
                fontSize: fontStyles.md.fontSize,
                fontWeight: 'bold',
              }}
              onPress={handleSubmit}>
              Sign Up
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
  },
  formContainer: {
    paddingHorizontal: 15,
  },
  text: {
    fontFamily: '',
  },
});
