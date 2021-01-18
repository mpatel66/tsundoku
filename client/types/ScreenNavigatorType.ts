import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Books from './Book';

export interface ScreenNavigationProp {
  navigation: StackNavigationProp<ParamListBase>
}

export type RootStackParamList = {
  Tsundoku: undefined;
  MyModal: {
    book: Books
  };
};

export type TabParamList = {
  Home: undefined;
  MyBooks: undefined;
  Search: undefined;
  Settings: undefined;
}
