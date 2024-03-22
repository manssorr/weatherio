import {setSignIn} from '@/redux/slices/authSlice';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

const useSignupScreen = () => {
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

  return {
    navigation,
    setUserData,
    userData,
    errors,
    isSubmitted,
    togglePasswordVisibility,
    handleSubmit,
    passwordVisible,
  };
};
export default useSignupScreen;
