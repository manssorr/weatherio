import {useEffect, useState} from 'react';
import {
  Alert,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import assets from '@/assets';
import Hero from '@/components/Hero';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import colors from '@/style/colors';
import fontStyles from '@/style/fonts';
import {useDispatch} from 'react-redux';
import {setSignIn} from '@/redux/slices/authSlice';
import {useNavigation} from '@react-navigation/native';

import TextInputApp from '@/components/TextInput';

const SigninScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleSignin = () => {
    const user = {
      isLoggedIn: true,
      email: credentials.email,
      username: 'User Name',
    };

    dispatch(setSignIn(user));
  };

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentials]);

  const validateForm = () => {
    let errorsStore: any = {};

    // Validate email field
    if (!credentials.email) {
      errorsStore.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errorsStore.email = 'Email is invalid.';
    }

    // Validate password field
    if (!credentials.password) {
      errorsStore.password = 'Password is required.';
    } else if (credentials.password.length < 6) {
      errorsStore.password = 'Password must be at least 6 characters.';
    }

    // Set the errors and update form validity
    setErrors(errorsStore);
    setIsFormValid(Object.keys(errorsStore).length === 0);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);

    if (isFormValid) {
      // Form is valid, perform the submission logic
      handleSignin();
      console.log('Form submitted successfully!');
    } else {
      // Form is invalid, display error messages
      console.log('Form has errors. Please correct them.');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <Hero
          title="Sign in to your account"
          icon="chevron-left"
          onPress={() => {
            navigation.goBack();
          }}
          bgImage={assets.images.hero}
        />
        <View style={styles.formContainer}>
          {/* Email Input */}
          <TextInputApp
            label="Email"
            onChangeText={text => setCredentials({...credentials, email: text})}
            style={{marginTop: 30, justifyContent: 'center'}}
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
            label="Password"
            isPassword
            onChangeText={text =>
              setCredentials({...credentials, password: text})
            }
            placeholder="Enter your password"
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
            onPress={() => Alert.alert('Forgot Password will be comming soon')}>
            <Text
              fontVariant="sm"
              style={{alignSelf: 'flex-end', marginTop: 10}}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Button
            // disabled
            // disabled={!isFormValid && !isSubmitted}
            style={{borderRadius: 8, marginTop: 30, marginBottom: 20}}
            contentStyle={{height: 60}}
            mode="contained"
            labelStyle={{
              color: colors.white,
              fontSize: fontStyles.md.fontSize,
              fontWeight: 'bold',
            }}
            onPress={handleSubmit}>
            Sign In
          </Button>

          {/* Divider */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 1,
                backgroundColor: colors.border,
                minWidth: '10%',
                flexGrow: 1,
              }}
            />
            <Text fontVariant="divider" style={{marginHorizontal: 10}}>
              Or
            </Text>
            <View
              style={{
                height: 1,
                backgroundColor: colors.border,
                minWidth: '10%',
                flexGrow: 1,
              }}
            />
            {/* <Divider bold /> */}
          </View>

          {/* 2OAuth Options */}
          <View
            style={{
              marginTop: 30,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              onPress={() =>
                Alert.alert('Sign in with Google will be added soon')
              }
              name="google"
              noColor
              style={{
                marginHorizontal: 10,
                padding: 15,
                borderRadius: 10,
                borderWidth: 0.7,
                borderColor: '#E9E9E9',
              }}
            />
            <Icon
              onPress={() =>
                Alert.alert('Sign in with Facebook will be added soon')
              }
              name="facebook"
              noColor
              style={{
                marginHorizontal: 10,
                padding: 15,
                borderRadius: 10,
                borderWidth: 0.7,
                borderColor: '#E9E9E9',
              }}
            />
            <Icon
              onPress={() => Alert.alert('Sign in with X will be added soon')}
              name="x"
              noColor
              style={{
                marginHorizontal: 10,
                padding: 15,
                borderRadius: 10,
                borderWidth: 0.7,
                borderColor: '#E9E9E9',
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SigninScreen;

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
