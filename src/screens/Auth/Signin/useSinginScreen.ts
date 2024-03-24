import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {isObjectEmpty} from '@/utils/helper';
import {type SomeScreenNavigationProp} from '../../../navigation/types';
import {setSignIn} from '@/redux/slices/authSlice';
import {useDispatch} from 'react-redux';

const useSigninScreen = () => {
  const navigation = useNavigation<SomeScreenNavigationProp<'Signin'>>();
  const dispatch = useDispatch();
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          setErrors({
            ...errors,
            email: 'That email address is already in use!',
          });
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setErrors({
            ...errors,
            email: 'That email address is invalid!',
          });
        }

        console.log('Error signing in:', error.message);

        setAuthError('Wrong email or password');
      })
      .finally(() => setLoading(false));
  };

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log(userInfo);
      // dispatch(
      //   setSignIn({
      //     isLoggedIn: true,
      //     email: userInfo.user.email,
      //     username: userInfo.user.name ? userInfo.user.name : '',
      //     photoURL: userInfo.user.photo,
      //   }),
      // );
    } catch (error: any) {
      if (error) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the login flow
            console.log('User cancelled the login flow');
            setAuthError('User cancelled the login flow');
            break;
          case statusCodes.IN_PROGRESS:
            console.log('Signing in');
            setAuthError('Signing in');
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            setAuthError('Play services not available');
            console.log('Play services not available or outdated');
            // play services not available or outdated
            break;
          default:
            console.log('Some other error happened');
            setAuthError('Some error happened in google sign in');
          // some other error happened
        }
      } else {
        setAuthError('Some error happened!');
        // an error that's not related to google sign in occurred
      }
    }
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
    setIsFormValid(isObjectEmpty(errorsStore));
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

  return {
    navigation,
    errors,
    authError,
    isFormValid,
    isSubmitted,
    credentials,
    setCredentials,
    handleSubmit,
    loading,
    onGoogleButtonPress,
  };
};
export default useSigninScreen;
