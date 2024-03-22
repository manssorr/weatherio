import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {isObjectEmpty} from '@/utils/helper';

const useSigninScreen = () => {
  const navigation = useNavigation();
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [credentials, setCredentials] = useState({
    email: 'test@me.com',
    password: '123456',
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
  };
};
export default useSigninScreen;
