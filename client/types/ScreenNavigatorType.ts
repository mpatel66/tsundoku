import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface ScreenNavigationProp {
  navigation: StackNavigationProp<ParamListBase>
}

export type RootStackParamList = {
  Tab: undefined;
  MyModal: undefined;
};

export type TabParamList = {
  Home: undefined;
  MyBooks: undefined;
  Search: undefined;
  Settings: undefined;
}
