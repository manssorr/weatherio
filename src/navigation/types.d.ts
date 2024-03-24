import type {RouteProp as RouteProp} from '@react-navigation/native';
import {AuthStackParamList} from './AuthNavigator';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = AuthStackParamList; // & HomeStackParamList;

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
