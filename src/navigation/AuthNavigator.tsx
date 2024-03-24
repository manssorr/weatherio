import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SigninScreen from '@/screens/Auth/Signin';
import SignupScreen from '@/screens/Auth/Signup';
import WelcomeScreen from '@/screens/Onboarding/Welcome';
import type {AuthStackParamList} from './types';

// Create the stack navigator
const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        // options={{headerShown: true}}
      />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
