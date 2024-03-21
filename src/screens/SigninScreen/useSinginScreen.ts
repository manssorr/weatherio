import {setSignIn} from '@/redux/slices/authSlice';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

const useSigninScreen = () => {
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
      userName: 'User Name',
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
  return {
    navigation,
    errors,
    isFormValid,
    isSubmitted,
    credentials,
    setCredentials,
    handleSubmit,
  };
};
export default useSigninScreen;
