import {Alert, TouchableOpacity, SafeAreaView, View} from 'react-native';
import assets from '@/assets';
import Hero from '@/components/Hero';
import Icon from '@/components/Icon';
import Text from '@/components/Text';

import TextInputApp from '@/components/TextInput';
import useSigninScreen from './useSinginScreen';
import styles from './styles';
import ErrorMessage from '@/components/ErrorMessage';
import Button from '@/components/Button';
import {isObjectEmpty} from '@/utils/helper';

const SigninScreen = () => {
  const {
    navigation,
    errors,
    authError,
    isSubmitted,
    credentials,
    setCredentials,
    handleSubmit,
    loading,
  } = useSigninScreen();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {/* Hero and formContainer remain unchanged */}
        <Hero
          title="Sign in to your account"
          icon="chevron-left"
          onPress={() => navigation.goBack()}
          bgImage={assets.images.hero}
        />
        <View style={styles.formContainer}>
          {/* TextInputApp components now use styles from StyleSheet */}
          {/* Email Input */}
          <TextInputApp
            label="Email"
            value={credentials.email}
            onChangeText={text => setCredentials({...credentials, email: text})}
            style={styles.textInput}
            placeholder="Enter your email"
            keyboardType="email-address"
            leftIconOptions={{
              name: 'email',
              color: 'black',
              size: 20,
            }}
            errorMessage={errors.email}
            touched={isSubmitted}
          />

          {/* Password Input */}
          <TextInputApp
            value={credentials.password}
            label="Password"
            isPassword
            onChangeText={text =>
              setCredentials({...credentials, password: text})
            }
            placeholder="Enter your password"
            style={styles.textInput}
            leftIconOptions={{
              name: 'lock',
              color: 'black',
              size: 20,
            }}
            errorMessage={errors.password}
            touched={isSubmitted}
          />

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => Alert.alert('Forgot Password will be comming soon')}
            style={styles.forgotPassword}>
            <Text fontVariant="sm">Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Button
            title="Sign in"
            onPress={handleSubmit}
            loading={loading}
            style={styles.signinButton}
            disabled={isSubmitted && !isObjectEmpty(errors)}
          />
          {authError && isSubmitted && <ErrorMessage message={authError} />}
          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Or</Text>
            <View style={styles.divider} />
          </View>

          {/* 2OAuth Options */}
          <View style={styles.oauthContainer}>
            {/* Icons with extracted styles */}
            {/* Google, Facebook, and X icons remain unchanged in terms of functionality */}
            <Icon
              onPress={() =>
                Alert.alert('Sign in with Google will be added soon')
              }
              name="google"
              noColor
              style={styles.icon}
            />
            <Icon
              onPress={() =>
                Alert.alert('Sign in with Facebook will be added soon')
              }
              name="facebook"
              noColor
              style={styles.icon}
            />
            <Icon
              onPress={() => Alert.alert('Sign in with X will be added soon')}
              name="x"
              noColor
              style={styles.icon}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SigninScreen;
