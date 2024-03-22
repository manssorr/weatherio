import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import {Button} from 'react-native-paper';
import Checkbox from '@react-native-community/checkbox';
import Text from '@/components/Text';
import Hero from '@/components/Hero';
import colors from '@/style/colors';
import fontStyles from '@/style/fonts';
import assets from '@/assets';
import useSignupScreen from './useSingupScreen';
import TextInputApp from '@/components/TextInput';
import ErrorMessage from '@/components/ErrorMessage';

const SignupScreen = () => {
  const {navigation, setUserData, userData, errors, isSubmitted, handleSubmit} =
    useSignupScreen();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.keyboardAvoidingView}>
          <Hero
            title="Sign up to your account"
            icon="chevron-left"
            onPress={navigation.goBack}
            bgImage={assets.images.hero}
          />
          <ScrollView style={styles.scrollView}>
            <TextInputApp
              style={styles.textInput}
              onChangeText={text => setUserData({...userData, userName: text})}
              errorMessage={errors.userName}
              value={userData.userName}
              placeholder="Enter your name"
              label="User name"
              touched={isSubmitted}
            />

            <TextInputApp
              style={styles.textInput}
              keyboardType="email-address"
              onChangeText={text => setUserData({...userData, email: text})}
              errorMessage={errors.email}
              value={userData.email}
              placeholder="Enter your email"
              label="Email"
              touched={isSubmitted}
            />
            <TextInputApp
              style={styles.textInput}
              onChangeText={text => setUserData({...userData, password: text})}
              errorMessage={errors.password}
              value={userData.password}
              placeholder="Enter your password"
              label="Password"
              isPassword
              touched={isSubmitted}
            />

            <TextInputApp
              style={styles.textInput}
              onChangeText={text =>
                setUserData({...userData, confirmPassword: text})
              }
              errorMessage={errors.confirmPassword}
              value={userData.confirmPassword}
              placeholder="Confirm your password"
              label="Confirm Password"
              isPassword
              touched={isSubmitted}
            />

            {/* Checkbox */}
            <Pressable
              onPress={() =>
                setUserData(prev => ({...prev, acceptTerms: !prev.acceptTerms}))
              }
              style={styles.pressableCheckbox}>
              <Checkbox
                value={userData.acceptTerms}
                onValueChange={newValue =>
                  setUserData({...userData, acceptTerms: newValue})
                }
                boxType="square"
                style={styles.checkbox}
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
              />
              <Text fontVariant="sm">
                I accept & agree terms conditions {'\n'}& privacy policy
              </Text>
            </Pressable>
            {isSubmitted && !!errors.acceptTerms && (
              <ErrorMessage message={errors.acceptTerms} />
            )}
            {/* Sign Up Button */}
            <Button
              onPress={handleSubmit}
              mode="contained"
              labelStyle={styles.signUpButtonLabel}
              contentStyle={styles.signUpButtonContent}
              style={styles.signUpButton}>
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
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 15,
    paddingTop: 30,
  },

  pressableCheckbox: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },

  signUpButton: {
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  signUpButtonContent: {
    height: 50,
  },
  signUpButtonLabel: {
    color: colors.white,
    fontSize: fontStyles.md.fontSize,
    fontWeight: 'bold',
  },
  textInput: {
    marginBottom: 20,
  },
});
