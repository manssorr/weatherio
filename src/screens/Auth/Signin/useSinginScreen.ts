import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {isObjectEmpty} from '@/utils/helper';
import type {AuthStackScreenProps} from '@/navigation/types';

const useSigninScreen = () => {
  const navigation = useNavigation<AuthStackScreenProps>();
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
    // setLoading(true);

    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(googleCredential)
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
