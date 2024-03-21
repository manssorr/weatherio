import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SigninScreen from '@/screens/SigninScreen';
import SignupScreen from '@/screens/SignupScreen';
import WelcomeScreen from '@/screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
