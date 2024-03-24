import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SigninScreen from '@/screens/Auth/Signin';
import SignupScreen from '@/screens/Auth/Signup';
import WelcomeScreen from '@/screens/Onboarding/Welcome';

export type AuthStackParamList = {
  Welcome: undefined; // No parameters expected for WelcomeScreen
  Signin: undefined; // No parameters expected for SigninScreen
  Signup: undefined; // No parameters expected for SignupScreen
};

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
