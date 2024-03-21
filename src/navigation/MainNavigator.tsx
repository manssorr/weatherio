import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from '@/navigation/AppNavigator';
import AuthNavigator from '@/navigation/AuthNavigator';
import {useSelector} from 'react-redux';
import {selectIsLoggedIn} from '@/redux/slices/authSlice';

const AppRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppRoute;
