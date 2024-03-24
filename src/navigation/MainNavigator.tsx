import {NavigationContainer} from '@react-navigation/native';
import HomeNavigator from '@/navigation/HomeNavigator';
import AuthNavigator from '@/navigation/AuthNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsLoggedIn, setSignIn} from '@/redux/slices/authSlice';
import {useState, useEffect, type SetStateAction} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Loader from '@/components/Loader';

const AppRoute = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        '291544356601-s0sbsvlf7pan2tr3pimod2lvh2recl32.apps.googleusercontent.com',
      webClientId:
        '291544356601-asqn4lbd4a4rm2irr121b2nb5cq27ohe.apps.googleusercontent.com', //TODO: secure this with an env variable
    });
  }, []);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  console.log('🔊 User: ', JSON.stringify(user, null, 2));

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

  if (initializing) return <Loader />;

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppRoute;
