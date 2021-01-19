import React, { useEffect, useReducer, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import Books from './types/Book';
import AppContext from './components/context/context';
import TabNavigator from './components/navigation/TabNavigator';
import reducer from './components/context/reducer';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types/ScreenNavigatorType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActionType } from './types/ReducerAction';
import BookModal from './tab-screens/BookModal';
import { default as theme } from './theme.json';
import { useFonts, CedarvilleCursive_400Regular } from '@expo-google-fonts/cedarville-cursive';
import AppLoading from 'expo-app-loading';
import { 
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold} from '@expo-google-fonts/raleway';



const queryClient = new QueryClient({
});

const RootStack = createStackNavigator<RootStackParamList>();

const initialState = {
  addedBooks: [] as Books[]
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    CedarvilleCursive_400Regular,
    Raleway_300Light,
    Raleway_500Medium,
    Raleway_400Regular,
    Raleway_600SemiBold,
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect( () => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('appState');
        const parsedState = jsonValue ? JSON.parse(jsonValue) : initialState;
        dispatch({type: ActionType.LOAD_INITIAL_DATA, state: parsedState});
        setIsLoading(false);
        // dispatch({type: ActionType.DELETE_DATA});
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  },[]);

  if (!fontsLoaded || isLoading) {
    console.log('loading.....');
    return <AppLoading />;
  } else {
    console.log('loaded');
    return (
      <QueryClientProvider client={queryClient}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
          <AppContext.Provider value={{state, dispatch}}>
            <NavigationContainer>
              <RootStack.Navigator mode="modal" >
                <RootStack.Screen
                  options={{
                    headerStyle: { backgroundColor:'#223773' },
                    headerTintColor: '#fffbf8', 
                    headerTitleStyle: { fontFamily: 'CedarvilleCursive_400Regular', fontSize:30}
                  }} 
                  name="Tsundoku" 
                  component={TabNavigator}/>
                <RootStack.Screen 
                  name="MyModal" 
                  component={BookModal} 
                  options={
                    ({ route }) => ({
                      title: route.params.book.volumeInfo.title, 
                      headerStyle: { backgroundColor:'#223773' },
                      headerTintColor: '#fffbf8',
                      headerTitleStyle: { fontFamily: 'CedarvilleCursive_400Regular', fontSize:25},
                      headerBackTitleVisible: false,
                    })
                  }
                />
              </RootStack.Navigator>
            </NavigationContainer>
          </AppContext.Provider>
        </ApplicationProvider>
      </QueryClientProvider>
    );

  }
};

export default App;