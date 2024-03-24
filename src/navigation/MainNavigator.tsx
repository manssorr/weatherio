/* eslint-disable curly */
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigator from '@/navigation/HomeNavigator';
import AuthNavigator from '@/navigation/AuthNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsLoggedIn, setSignIn} from '@/redux/slices/authSlice';
import Text from '@/components/Text';
import {useState, useEffect, type SetStateAction} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '291544356601-s0sbsvlf7pan2tr3pimod2lvh2recl32.apps.googleusercontent.com', //TODO: secure this with an env variable
});

const AppRoute = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  console.log('🔊 User: ', user);

  // Handle user state changes
  //@ts-ignore
  function onAuthStateChanged(
    userInfo: SetStateAction<FirebaseAuthTypes.User | null>,
  ) {
    console.log('🦻 User: ', user);
    if (userInfo) {
      setUser(userInfo);
      const userPayload = {
        isLoggedIn: !!userInfo,
        // @ts-ignore
        email: userInfo?.email,
        // @ts-ignore
        username: userInfo?.displayName,
      };
      dispatch(setSignIn(userPayload));
    }

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) return <Text>Loading...</Text>;

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppRoute;
