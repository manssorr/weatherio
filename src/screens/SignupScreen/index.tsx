import {
  ScrollView,
  SafeAreaView,
  View,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import Checkbox from '@react-native-community/checkbox';
import Text from '@/components/Text';
import Hero from '@/components/Hero';
import colors from '@/style/colors';
import assets from '@/assets';
import useSignupScreen from './useSingupScreen';
import TextInputApp from '@/components/TextInput';
import ErrorMessage from '@/components/ErrorMessage';
import Button from '@/components/Button';
import {isObjectEmpty} from '@/utils/helper';
import styles from './styles';

const SignupScreen = () => {
  const {
    navigation,
    authError,
    handleChangeField,
    userData,
    errors,
    isSubmitted,
    handleSubmit,
    loading,
  } = useSignupScreen();

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
              onChangeText={text => handleChangeField('username', text)}
              errorMessage={errors.username}
              value={userData.username}
              placeholder="Enter your name"
              label="User name"
              touched={isSubmitted}
            />

            <TextInputApp
              style={styles.textInput}
              keyboardType="email-address"
              onChangeText={text => handleChangeField('email', text)}
              errorMessage={errors.email}
              value={userData.email}
              placeholder="Enter your email"
              label="Email"
              touched={isSubmitted}
            />
            <TextInputApp
              style={styles.textInput}
              onChangeText={text => handleChangeField('password', text)}
              errorMessage={errors.password}
              value={userData.password}
              placeholder="Enter your password"
              label="Password"
              isPassword
              touched={isSubmitted}
            />

            <TextInputApp
              style={styles.textInput}
              onChangeText={text => handleChangeField('confirmPassword', text)}
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
                handleChangeField('acceptTerms', !userData.acceptTerms)
              }
              style={styles.pressableCheckbox}>
              <Checkbox
                value={userData.acceptTerms}
                onValueChange={newValue =>
                  handleChangeField('acceptTerms', newValue)
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
              loading={loading}
              onPress={handleSubmit}
              title="Sign Up"
              disabled={isSubmitted && !isObjectEmpty(errors)}
              style={styles.loginButton}
            />
            {authError && isSubmitted && <ErrorMessage message={authError} />}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;
