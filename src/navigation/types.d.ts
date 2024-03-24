import type {RouteProp as RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Welcome: undefined; // No parameters expected for WelcomeScreen
  Signin: undefined; // No parameters expected for SigninScreen
  Signup: undefined; // No parameters expected for SignupScreen
};

export type HomeStackParamList = {
  Home: undefined; // No parameters expected for HomeScreen
};

export type RootStackParamList = AuthStackParamList & HomeStackParamList; // & SomeStackParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type SomeScreenNavigationProp<TScreen extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, TScreen>;

export type SomeScreenRouteProp<TScreen extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, TScreen>;

export interface withNavigationProps<TScreen extends keyof RootStackParamList> {
  navigation: SomeScreenNavigationProp<TScreen>;
  route: SomeScreenRouteProp<TScreen>;
}
