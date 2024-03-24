import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {type SomeScreenNavigationProp} from '../../../navigation/types';

const useSignupScreen = () => {
  const navigation = useNavigation<SomeScreenNavigationProp<'Signup'>>();
  const [authError, setAuthError] = useState('');

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState<{
    main: boolean;
    confirm: boolean;
  }>({
    main: false,
    confirm: false,
  });

  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const togglePasswordVisibility = (type: 'main' | 'confirm') => {
    setPasswordVisible({...passwordVisible, [type]: !passwordVisible[type]});
  };

  const handleChangeField = (
    key: keyof typeof userData,
    value: string | boolean,
  ) => {
    // reset auth error
    setAuthError('');
    setUserData({...userData, [key]: value});
  };

  const handleSignup = () => {
    setLoading(true);

    // const user = {
    //   isLoggedIn: true,
    //   email: userData.email,
    //   username: 'User Name',
    // };

    auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(() => {
        console.log('User account created & signed in!');

        // set up displayed name
        auth().currentUser?.updateProfile({
          displayName: userData.username,
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setErrors({
            ...errors,
            email: 'That email address is already in use!',
          });
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setErrors({
            ...errors,
            email: 'That email address is invalid!',
          });
          console.log('That email address is invalid!');
        }

        console.error('Error signing up:', error);
        setAuthError(error.message);
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const validateForm = () => {
    let errorsStore: any = {};

    // Validate email field
    if (!userData.username) {
      errorsStore.username = 'User Name is required.';
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

  return {
    navigation,
    handleChangeField,
    userData,
    errors,
    isSubmitted,
    togglePasswordVisibility,
    handleSubmit,
    passwordVisible,
    authError,
    loading,
  };
};
export default useSignupScreen;
