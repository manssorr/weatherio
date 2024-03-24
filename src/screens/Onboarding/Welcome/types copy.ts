// import type {RouteProp as RouteProp} from '@react-navigation/native';
// import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

// export type AuthStackParamList = {
//   Welcome: undefined; // No parameters expected for WelcomeScreen
//   Signin: undefined; // No parameters expected for SigninScreen
//   Signup: undefined; // No parameters expected for SignupScreen
// };

// export type HomeStackParamList = {
//   Home: undefined; // No parameters expected for HomeScreen
// };

// export type RootStackList = {
//   Auth: AuthStackParamList;
//   Home: HomeStackParamList;
// };

// export type ExtractStackParamList<TStack extends keyof RootStackList> =
//   RootStackList[TStack];

// export type SomeScreenNavigationProp<TStack extends keyof RootStackList> =
//   NativeStackNavigationProp<RootStackList, TStack>;

// // export type SomeScreenRouteProp<TScreen extends keyof RootStackList> =
// //   RouteProp<RootStackList, TScreen>;

// // export interface withNavigationProps<TScreen extends keyof RootStackList> {
// //   navigation: SomeScreenNavigationProp<TScreen>;
// //   route: SomeScreenRouteProp<TScreen>;
// // }

// // type IProps = withNavigationProps<'Auth'>;

// const test: SomeScreenNavigationProp<'Auth'> = '';
