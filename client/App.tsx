import React, { useReducer } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StyleSheet, View } from 'react-native';
import Home from './screens/Home';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider,  BottomNavigation,  BottomNavigationTab,  IconRegistry } from '@ui-kitten/components';
import { BottomTabBarOptions, BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyBooks from './screens/MyBooks';
import Book from './Book';
import BookModal from './screens/BookModal';
import Search from './screens/Search';
import UserSettings from './screens/UserSettings';
import IconGenerator from './components/buttons/IconGenerator';
import AppContext, { AppContextInterface } from './components/context/context'

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }: BottomTabBarProps<BottomTabBarOptions>) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}
      style={styles.tab}
      >
      <BottomNavigationTab 
        icon={(props) => 
          <IconGenerator props={props} iconName={'home'}/>}
        />
      <BottomNavigationTab 
        icon={(props) => 
          <IconGenerator props={props} iconName={'book'}/>}/>
      <BottomNavigationTab 
        icon={(props) => 
          <IconGenerator props={props} iconName={'search'}/>}/>
      <BottomNavigationTab 
        icon={(props) => 
          <IconGenerator props={props} iconName={'settings-2'}/>}/>
    </BottomNavigation>
  );
}


const TabNavigator: React.FC = () => (
  <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Tab.Screen name='Home' component={Home}/>
    <Tab.Screen name='MyBooks' component={MyBooks}/>
    <Tab.Screen name='Search' component={Search}/>
    <Tab.Screen name='Settings' component={UserSettings}/>
  </Tab.Navigator>
);

function reducer(state:AppContextInterface, action:any) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        modalVisible: true,
        selectedBook: action.selectedBook
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalVisible: false,
      };
    default:
      return state;
  }
}

const initialState = {
  modalVisible: false,
  selectedBook: {} as Book,
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
  <QueryClientProvider client={queryClient}>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppContext.Provider value={{state, dispatch}}>
        <NavigationContainer>
          <TabNavigator />
          {state.modalVisible && <BookModal modalVisible={state.modalVisible} book={state.selectedBook} />}
        </NavigationContainer>
      </AppContext.Provider>
    </ApplicationProvider>
  </QueryClientProvider>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    height: '10%',
  }
});
